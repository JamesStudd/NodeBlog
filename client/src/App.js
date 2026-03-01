import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.scss";

import Header from "./components/Header";
import Projects from "./components/Projects/Projects";
import About from "./components/About";
import NavigationBar from "./components/NavigationBar";
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
					axesHelper="off"
					bgColor1="#000000"
					bgColor2="#000000"
					brightness={1}
					cAzimuthAngle={180}
					cDistance={2}
					cPolarAngle={80}
					cameraZoom={9.1}
					color1="#606080"
					color2="#8d7dca"
					color3="#212121"
					destination="onCanvas"
					embedMode="off"
					envPreset="city"
					format="gif"
					fov={45}
					frameRate={10}
					gizmoHelper="hide"
					grain="on"
					lightType="3d"
					pixelDensity={1}
					positionX={0}
					positionY={0}
					positionZ={0}
					range="disabled"
					rangeEnd={40}
					rangeStart={0}
					reflection={0.1}
					rotationX={50}
					rotationY={0}
					rotationZ={-60}
					shader="defaults"
					type="waterPlane"
					uAmplitude={0}
					uDensity={1.5}
					uFrequency={0}
					uSpeed={0.1}
					uStrength={1.5}
					uTime={8}
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