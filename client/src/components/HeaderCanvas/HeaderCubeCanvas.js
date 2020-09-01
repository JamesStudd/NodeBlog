import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
	const orbitRef = useRef();
	const { camera, gl } = useThree();

	useFrame(() => {
		orbitRef.current.update();
	});

	return (
		<orbitControls
			args={[camera, gl.domElement]}
			ref={orbitRef}
			autoRotate
			maxPolarAngle={Math.PI / 3}
			minPolarAngle={Math.PI / 3}
		/>
	);
};

const Plane = () => (
	<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
		<planeBufferGeometry attach="geometry" args={[100, 100]} />
		<meshPhysicalMaterial attach="material" color={"white"} />
	</mesh>
);

const Sphere = () => {
	const meshRef = useRef();
	const [hovered, setHovered] = useState(false);
	const [active, setActive] = useState(false);
	const props = useSpring({
		scale: active ? [2, 2, 2] : [1, 1, 1],
		color: hovered ? "hotpink" : "gray",
	});

	return (
		<a.mesh
			ref={meshRef}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			onClick={() => setActive(!active)}
			scale={props.scale}
			castShadow
		>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<a.meshPhysicalMaterial attach="material" color={props.color} />
		</a.mesh>
	);
};

export default () => (
	<Canvas
		camera={{ position: [0, 0, 5] }}
		style={{ height: "30em", width: "100%", background: "black" }}
		onCreated={({ gl }) => {
			gl.shadowMap.enabled = true;
			gl.shadowMap.type = THREE.PCFSoftShadowMap;
		}}
	>
		<ambientLight intensity={0.5} />
		<spotLight
			position={[15, 20, 5]}
			penumbra={1}
			castShadow
			intensity={0.5}
		/>
		<Controls />
		<Plane />
		<Sphere />
	</Canvas>
);
