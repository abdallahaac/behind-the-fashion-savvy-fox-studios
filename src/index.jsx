import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
	<div className="app">
		<div className="canvas-container">
			<Canvas
				gl={{
					antialias: true,
					toneMapping: THREE.ACESFilmicToneMapping,
				}}
				camera={{
					fov: 45,
					near: 0.1,
					far: 200,
					position: [3, 2, 6],
				}}
			>
				<Experience />
			</Canvas>
		</div>
		<div className="ui-container">
			<h1>React 2D UI</h1>
			<p>Add your controls or content here.</p>
			<button>Click Me</button>
		</div>
	</div>
);
