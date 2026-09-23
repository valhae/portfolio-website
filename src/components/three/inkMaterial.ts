import { shaderMaterial } from "@react-three/drei"
import { extend, type ThreeElement } from "@react-three/fiber"
import { Color } from "three"

/**
 * Sumi ink material for the torii.
 *
 * Vertex: the beam curve (uCurve lifts the ends of the kasagi) plus a small
 * noise wobble, so no edge is machine-straight.
 * Fragment: ink density from layered noise. Everything below the threshold is
 * discarded, which gives a ragged, bleeding edge instead of a clean silhouette,
 * and lets vertical drips run off the underside of each beam. Alpha testing —
 * not blending — keeps the overlapping parts of the gate sorting correctly.
 */
export const InkMaterial = shaderMaterial(
  {
    uTime: 0,
    uPointer: [0, 0],
    uBleed: 0.32,
    uVelocity: 0,
    uRoughness: 0.18,
    uContrast: 0.9,
    uCurve: 0,
    uDrip: 0,
    uPaper: new Color("#f7f4ef"),
    uInk: new Color("#0d0d0d"),
    uAccent: new Color("#b7362a"),
    uAccentMix: 0.0,
  },
  /* glsl */ `
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uBleed;
    uniform float uVelocity;
    uniform float uCurve;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vLocal;
    varying float vWobble;

    // Ashima / Stefan Gustavson simplex noise (3D), public domain.
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vLocal = position;

      vec3 shaped = position;

      // Kasagi sweep: the ends of the top beam lift, the way a real one does.
      shaped.y += uCurve * pow(abs(position.x), 2.6) * 0.65;

      float slow = uTime * 0.12;
      float wobble = snoise(position * 2.1 + slow) * 0.012
                   + snoise(position * 6.5 - slow * 1.4) * 0.005;
      wobble *= 1.0 + uBleed * 1.6 + abs(uVelocity) * 1.2;
      vWobble = wobble;

      shaped += normal * wobble;
      shaped.x += uPointer.x * 0.02 * shaped.y;

      vec4 world = modelViewMatrix * vec4(shaped, 1.0);
      vPosition = world.xyz;

      gl_Position = projectionMatrix * world;
    }
  `,
  /* glsl */ `
    uniform vec3 uPaper;
    uniform vec3 uInk;
    uniform vec3 uAccent;
    uniform float uAccentMix;
    uniform float uContrast;
    uniform float uRoughness;
    uniform float uBleed;
    uniform float uVelocity;
    uniform float uDrip;
    uniform float uTime;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vLocal;
    varying float vWobble;

    float hash(vec2 p){
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float valueNoise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p){
      float total = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
        total += valueNoise(p) * amplitude;
        p *= 2.02;
        amplitude *= 0.5;
      }
      return total;
    }

    void main() {
      vec3 viewDirection = normalize(-vPosition);
      float fresnel = pow(1.0 - clamp(dot(viewDirection, normalize(vNormal)), 0.0, 1.0), 2.2);

      // Grain of the brush across the form.
      float grain = fbm(vLocal.xy * 9.0 + vLocal.z * 2.0);
      float fibre = fbm(vLocal.xy * vec2(2.0, 34.0));

      // Ink runs off the underside of every element, heavier while scrolling.
      float dripField = fbm(vec2(vLocal.x * 26.0, 0.0));
      float dripLength = 0.06 + dripField * 0.16 * (abs(uDrip) + abs(uVelocity) * 1.5);
      float drip = 1.0 - smoothstep(0.35, 0.95, (0.5 + vLocal.y) / max(dripLength, 0.001));

      // Density: solid in the body, thinning and breaking up at the edges.
      float density = 0.82
        + grain * 0.35 * uRoughness
        + fibre * 0.12
        - fresnel * 0.55 * uBleed
        + drip * 0.2 * uDrip;

      float threshold = 0.52 + uBleed * 0.18 + abs(uVelocity) * 0.12;
      if (density < threshold) discard;

      // Wet centre, dry edge: the ink is darkest where the brush pressed.
      float wetness = clamp((density - threshold) * 2.4, 0.0, 1.0);
      vec3 ink = mix(uInk, uAccent, uAccentMix);
      vec3 color = mix(mix(uPaper, ink, 0.55), ink, wetness * uContrast);

      // Ink pools and darkens where the stroke meets the paper.
      color = mix(color, ink * 0.45, smoothstep(0.55, 1.0, fresnel) * 0.55);
      // ...and dries out lighter where the brush barely touched.
      color = mix(color, uPaper, smoothstep(0.1, 0.0, wetness) * 0.3);

      gl_FragColor = vec4(color, 1.0);
      #include <colorspace_fragment>
    }
  `,
)

extend({ InkMaterial })

declare module "@react-three/fiber" {
  interface ThreeElements {
    inkMaterial: ThreeElement<typeof InkMaterial>
  }
}
