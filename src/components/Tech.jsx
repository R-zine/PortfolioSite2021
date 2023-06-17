import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap from "gsap";
import Model from "./Diamond.js";
import Ground from "./Ground";

const Diamond = () => {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const spotLight = useRef(null);
  const bottomLight = useRef(null);

  if (hovered) {
    gsap.to(spotLight.current, {
      intensity: 0.8,
      duration: 1.5,
      ease: "easeInOut",
    });
    gsap.to(bottomLight.current, {
      intensity: 0.5,
      duration: 1.5,
    });
  }
  if (!hovered) {
    gsap.to(spotLight.current, {
      intensity: 0,
      duration: 1.5,
    });
    gsap.to(bottomLight.current, {
      intensity: 0,
      duration: 1.5,
    });
  }

  useEffect(() => {
    let invoke = document.querySelector(".invoke");

    setTimeout(() => {
      invoke.style.opacity = "0";
    }, 2500);
    setTimeout(() => {
      invoke.style.display = "none";
    }, 4000);
  }, []);
  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.55}
        minPolarAngle={1}
        autoRotate
        enableZoom={false}
        enablePan={false}
      />

      <PerspectiveCamera makeDefault fov={40} position={[5, 5, 10]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment receiveShadow map={texture} />
            <Model
              castShadow
              receiveShadow
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => setActive((prev) => !prev)}
              clicked={active}
            />
          </>
        )}
      </CubeCamera>

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
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
};

const Tech = () => {
  return (
    <div className="Tech">
      <Suspense
        fallback={
          <div className="invoke">
            <h2 className="invoke-text">Envoke.</h2>
          </div>
        }
      >
        <div className="invoke">
          <h2 className="invoke-text">Envoke.</h2>
        </div>

        <Canvas shadows>
          <ambientLight intensity={0.05} color="blue" />
          <Diamond />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Tech;
