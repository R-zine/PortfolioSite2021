import React, { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three';

const Ground = () => {
	const [roughness, normal] = useLoader(TextureLoader, [
		process.env.PUBLIC_URL + 'textures/rough.png',
		process.env.PUBLIC_URL + 'textures/normal.png',
	]);

	useEffect(() => {
		[normal, roughness].forEach((t) => {
			t.wrapS = RepeatWrapping;
			t.wrapT = RepeatWrapping;
			t.repeat.set(2, 2);
			t.offset.set(0, 0);
		});

		normal.encoding = LinearEncoding;
	}, [normal, roughness]);

	useFrame((state, delta) => {
		let t = -state.clock.getElapsedTime() * 0.02;
		roughness.offset.set(0, t % 1);
		normal.offset.set(0, t % 1);
	});

	return (
		<mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
			<planeGeometry args={[50, 50]} />
			<MeshReflectorMaterial
				envMapIntensity={0.4}
				normalMap={normal}
				normalScale={[1, 1]}
				roughnessMap={roughness}
				dithering={true}
				color={[0.5, 0.5, 0.5]}
				roughness={0.9}
				blur={[700, 300]} // Blur ground reflections (width, height), 0 skips blur
				mixBlur={30} // How much blur mixes with surface roughness (default = 1)
				mixStrength={80} // Strength of the reflections
				mixContrast={1} // Contrast of the reflections
				resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
				mirror={0.8} // Mirror environment, 0 = texture colors, 1 = pick up env colors
				depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
				minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
				maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
				depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
				debug={0}
				reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
			/>
		</mesh>
	);
};

export default Ground;