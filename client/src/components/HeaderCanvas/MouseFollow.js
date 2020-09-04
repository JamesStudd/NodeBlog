import React from "react";
import Sketch from "react-p5";

class Circle {
	constructor(x, y, p5) {
		this.p5 = p5;
		this.position = p5.createVector(x, y);
		this.velocity = p5.createVector(Math.random(), Math.random());
	}

	Update(width, height, speed) {
		this.position.x += this.velocity.x * speed;
		this.position.y += this.velocity.y * speed;
		this.Wraparound(width, height);
	}

	Render() {
		this.p5.ellipse(this.position.x, this.position.y, 2, 2);
	}

	Wraparound(width, height) {
		if (this.position.x > width) this.position.x = 0;
		if (this.position.x < 0) this.position.x = width;
		if (this.position.y > height) this.position.y = 0;
		if (this.position.y < 0) this.position.y = height;
	}

	Join(circles, distanceInfluence, colorString) {
		circles.forEach((circle) => {
			let d = this.position.dist(circle.position);
			if (d < distanceInfluence) {
				this.p5.stroke(colorString);
				this.p5.line(
					this.position.x,
					this.position.y,
					circle.position.x,
					circle.position.y
				);
			}
		});
	}
}

export default (props) => {
	let height = props.height;
	let smallerHeight = props.smallerHeight;
	let currentHeight;

	let circles = [];
	let amountOfCircles = 100;
	let color = [0, 255, 0];
	let colorString;

	const setup = (p5, canvasParentRef) => {
		let rect = canvasParentRef.getBoundingClientRect();
		mouseClicked(p5);

		currentHeight = height;
		if (rect.width < 550) currentHeight = smallerHeight;

		p5.createCanvas(rect.width, currentHeight).parent(canvasParentRef);

		for (let i = 0; i < amountOfCircles; i++) {
			circles.push(
				new Circle(
					Math.random() * rect.width,
					Math.random() * currentHeight,
					p5
				)
			);
		}
	};

	const draw = (p5) => {
		p5.background(0);
		p5.noFill();
		p5.strokeWeight(2);

		let speed = map(p5.mouseX, 0, window.innerWidth, 0, 5);
		let distance = map(p5.mouseY, 0, currentHeight, 1, currentHeight / 3);

		for (let i = 0; i < amountOfCircles; i++) {
			circles[i].Update(window.innerWidth, currentHeight, speed);
			p5.stroke(color[0], color[1], color[2]);
			circles[i].Render();
			circles[i].Join(circles, distance, colorString);
		}
	};

	const windowResized = (p5) => {
		let width = window.innerWidth;
		currentHeight = height;
		if (width < 550) currentHeight = smallerHeight;
		p5.resizeCanvas(window.innerWidth, currentHeight);
	};

	const map = (val, oldMin, oldMax, newMin, newMax) => {
		return (
			((val - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin
		);
	};

	const mouseClicked = (p5) => {
		let r = Math.floor(Math.random() * (255 - 50) + 50);
		let g = Math.floor(Math.random() * (255 - 50) + 50);
		let b = Math.floor(Math.random() * (255 - 50) + 50);
		color = [r, g, b];
		colorString = `rgba(${r}, ${g}, ${b}, 0.1)`;
	};

	return (
		<Sketch
			setup={setup}
			draw={draw}
			windowResized={windowResized}
			mouseClicked={mouseClicked}
		/>
	);
};
