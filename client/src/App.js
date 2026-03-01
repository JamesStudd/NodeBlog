import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.scss";

import Header from "./components/Header";
import Projects from "./components/Projects/Projects";
import About from "./components/About";
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

function App() {
	return (
		<>
			{/* Fullscreen ShaderGradient background */}
			<ShaderGradientCanvas
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: -1, // put it behind other content,
					pointerEvents: 'none'
				}}
			>
				<ShaderGradient
					animate="on"
					axesHelper="on"
					bgColor1="#000000"
					bgColor2="#000000"
					brightness={1.1}
					cAzimuthAngle={180}
					cDistance={3}
					cPolarAngle={115}
					cameraZoom={1}
					color1="#5606ff"
					color2="#fe8989"
					color3="#000000"
					destination="onCanvas"
					embedMode="off"
					envPreset="city"
					format="gif"
					fov={45}
					frameRate={10}
					gizmoHelper="hide"
					grain="off"
					lightType="3d"
					pixelDensity={1}
					positionX={-0.5}
					positionY={0.1}
					positionZ={0}
					range="disabled"
					rangeEnd={40}
					rangeStart={0}
					reflection={0.1}
					rotationX={0}
					rotationY={0}
					rotationZ={235}
					shader="defaults"
					type="waterPlane"
					uAmplitude={0}
					uDensity={1.1}
					uFrequency={5.5}
					uSpeed={0.1}
					uStrength={2.4}
					uTime={0.2}
					wireframe={false}
				/>
			</ShaderGradientCanvas>

			{/* Your normal content goes here */}
			<Header />
			<Projects />

		</>
	);
}

export default App;