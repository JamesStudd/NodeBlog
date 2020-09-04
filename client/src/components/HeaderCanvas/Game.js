import React from "react";
import Sketch from "react-p5";

class Obstacle {
	constructor(p5, maxHeight) {
		this.p5 = p5;
		let stop = this.GetRandom(0, maxHeight / 2);
		let start = this.GetRandom(stop + 60, stop + 200);
		this.freeYRange = p5.createVector(stop, start);
		this.x = 0;
		this.debug = "";
	}

	GetRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	Render(height) {
		this.p5.line(this.x, 0, this.x, this.freeYRange.x);
		this.p5.line(this.x, this.freeYRange.y, this.x, height);
		this.p5.text(this.debug, 50, 50);
	}

	Update() {
		this.x++;
	}

	CheckCollision(radius) {
		let mousePos = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
		let segA = this.p5.createVector(this.x, 0);
		let segB = this.p5.createVector(this.x, this.freeYRange.x);
		let segV = segB.sub(segA);

		let lineToCircle = mousePos.sub(segA);

		let segVUnit = segV.div(segV.mag());
		let projVScalar = lineToCircle.dot(segVUnit);
		let projV = segVUnit.mult(projVScalar);

		let closest = segA.add(projV);

		let distV = this.p5
			.createVector(this.p5.mouseX, this.p5.mouseY)
			.sub(closest)
			.mag();

		return distV < radius;
	}
}

export default (props) => {
	let height = props.height;
	let smallerHeight = props.smallerHeight;
	let currentHeight;

	let obstacles = [];
	let spawnInterval = 5000;
	let nextSpawn = 5000;
	let time = 0;

	const setup = (p5, canvasParentRef) => {
		let rect = canvasParentRef.getBoundingClientRect();

		currentHeight = height;
		if (rect.width < 550) currentHeight = smallerHeight;

		p5.createCanvas(rect.width, currentHeight).parent(canvasParentRef);

		spawn(p5);
	};

	const draw = (p5) => {
		p5.background(0);
		p5.stroke(0, 255, 0);
		p5.strokeWeight(2);
		p5.ellipse(p5.mouseX, p5.mouseY, 30, 30);
		p5.textSize(32);
		time += p5.deltaTime;

		if (time >= nextSpawn) {
			nextSpawn += spawnInterval;
			spawn(p5);
		}

		p5.stroke(255, 0, 0);
		for (let i = 0; i < obstacles.length; i++) {
			obstacles[i].Update();
			obstacles[i].Render(currentHeight);
			if (obstacles[i].CheckCollision(30)) {
				reset();
			}
		}
	};

	const spawn = (p5) => {
		obstacles.push(new Obstacle(p5, currentHeight));
	};

	const windowResized = (p5) => {
		let width = window.innerWidth;
		currentHeight = height;
		if (width < 550) currentHeight = smallerHeight;
		p5.resizeCanvas(window.innerWidth, currentHeight);
	};

	const reset = () => {};

	const mouseClicked = (p5) => {};

	return (
		<Sketch
			setup={setup}
			draw={draw}
			windowResized={windowResized}
			mouseClicked={mouseClicked}
		/>
	);
};
