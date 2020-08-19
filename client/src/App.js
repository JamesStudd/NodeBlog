import React from "react";
import Projects from "./components/projects";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<Projects />
		</div>
	);
}

export default App;
