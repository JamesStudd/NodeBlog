import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Header from "./components/Header";
import Projects from "./components/Projects/Projects";
import About from "./components/About";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<Projects />
			<hr />
			<About />
		</div>
	);
}

export default App;
