import React, { useRef, useState } from "react";
import { useFrame, PerspectiveCamera } from "react-three-fiber";
import * as THREE from "three";

export default function Box(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();

	return (
		<mesh>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial attach="material" color={"hotpink"} />
		</mesh>
	);
}
