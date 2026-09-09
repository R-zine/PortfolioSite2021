import React, {
  type ComponentType,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { type SpotLight, type Texture, Vector2 } from "three";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap from "gsap";
import Model from "./Diamond";
import Ground from "./Ground";

const chromaticOffset = new Vector2(0.0005, 0.0012);

interface RenderCubeCameraProps {
  resolution: number;
  frames: number;
  children: (texture: Texture) => ReactNode;
}

// Drei 9.13 intersects its render-prop child with the group's ReactNode child.
// This local facade retains the real runtime component with the intended API.
const RenderCubeCamera = CubeCamera as unknown as ComponentType<RenderCubeCameraProps>;

export const usePrefersReducedMotion = () => {
  const getPreference = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return undefined;

    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.("change", handleChange);

    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

interface DiamondSceneProps {
  prefersReducedMotion?: boolean;
  active?: boolean;
  onToggle: () => void;
}

export const DiamondScene = ({
  prefersReducedMotion = false,
  active = false,
  onToggle,
}: DiamondSceneProps) => {
  const [hovered, setHovered] = useState(false);

  const spotLight = useRef<SpotLight>(null);
  const bottomLight = useRef<SpotLight>(null);

  useEffect(() => {
    if (!spotLight.current || !bottomLight.current) return undefined;

    const duration = prefersReducedMotion ? 0 : 1.5;
    const topTween = gsap.to(spotLight.current, {
      intensity: hovered ? 0.8 : 0,
      duration,
      ease: "power1.inOut",
    });
    const bottomTween = gsap.to(bottomLight.current, {
      intensity: hovered ? 0.5 : 0,
      duration,
      ease: "power1.inOut",
    });

    return () => {
      topTween?.kill();
      bottomTween?.kill();
    };
  }, [hovered, prefersReducedMotion]);

  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.55}
        minPolarAngle={1}
        autoRotate={!prefersReducedMotion}
        enableZoom={false}
        enablePan={false}
      />

      <PerspectiveCamera makeDefault fov={40} position={[5, 5, 10]} />

      <color args={[0, 0, 0]} attach="background" />

      <RenderCubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Model
              castShadow
              receiveShadow
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={onToggle}
              clicked={active}
            />
          </>
        )}
      </RenderCubeCamera>

      <spotLight
        ref={bottomLight}
        color={[1, 1, 0.7]}
        intensity={0}
        angle={1.5}
        penumbra={1.5}
        position={[3, -2, 2]}
        castShadow
        shadow-bias={-0.1}
      />

      <spotLight
        ref={spotLight}
        color={[1, 1, 0.7]}
        intensity={0}
        angle={0.7}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.01}
      />

      <spotLight
        color={[1, 1, 0.7]}
        intensity={1.5}
        angle={0.5}
        penumbra={0.4}
        position={[4, 4, 0]}
        castShadow
        shadow-bias={-0.01}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <fog attach="fog" args={["black", 7, 22]} />

      <Ground />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.0015}
          focalLength={0.03}
          bokehScale={2}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={600} // render width
          height={600} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={chromaticOffset} // color offset
        />
      </EffectComposer>
    </>
  );
};

const Tech = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const toggleDiamond = () => setActive((previous) => !previous);

  return (
    <main className="Tech" aria-label="Interactive technology showcase">
      <Suspense
        fallback={
          <div className="invoke" role="status" aria-live="polite">
            <h2 className="invoke-text">Loading visualization…</h2>
          </div>
        }
      >
        <div className="invoke intro-overlay" aria-hidden="true">
          <h2 className="invoke-text">Invoke.</h2>
        </div>

        <Canvas
          shadows
          dpr={[1, 1.5]}
          frameloop={prefersReducedMotion ? "demand" : "always"}
          fallback={
            <p className="webgl-fallback" role="alert">
              This visualization requires WebGL.
            </p>
          }
        >
          <ambientLight intensity={0.05} color="blue" />
          <DiamondScene
            prefersReducedMotion={prefersReducedMotion}
            active={active}
            onToggle={toggleDiamond}
          />
        </Canvas>
      </Suspense>
    </main>
  );
};

export default Tech;
