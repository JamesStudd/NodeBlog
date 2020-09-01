import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.scss";

import React from "react";
import Header from "./components/Header";
import Projects from "./components/Projects/Projects";
import About from "./components/About";
import NavigationBar from "./components/NavigationBar";

function App() {
	return (
		<div>
			<NavigationBar />
			<div className="App" id="appTop">
				<header className="App-header">
					<Header />
				</header>
				<Projects />
				<About />
			</div>
		</div>
	);
}

export default App;
