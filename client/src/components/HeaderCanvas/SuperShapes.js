import React from "react";
import Sketch from "react-p5";

export default (props) => {
	let height = props.height;
	let smallerHeight = props.smallerHeight;
	let currentHeight;

	let m = 1,
		n1 = 1,
		n2 = 1,
		n3 = 1,
		a = 1,
		b = 1;

	let nIndex = 0;

	let limit = 100;
	let nValues = [
		[1, 1, 1],
		[0.3, 0.3, 0.3],
	];

	let rect;

	let osc = 0;
	let changedRecently = false;

	let cols = [30, 30, 30];
	let incs = [1, 1, 1];
	let dirs = [1, 1, 1];

	const setup = (p5, canvasParentRef) => {
		rect = canvasParentRef.getBoundingClientRect();

		currentHeight = height;
		if (rect.width < 550) currentHeight = smallerHeight;

		p5.createCanvas(rect.width, currentHeight).parent(canvasParentRef);
		changeColorIncs();
	};

	const map = (val, oldMin, oldMax, newMin, newMax) => {
		return (
			((val - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin
		);
	};

	const randomArr = () => {
		if (Math.random() > 0.9) {
			let num = Math.random() * limit;
			return [num, num, num];
		}
		return [
			Math.random() * limit,
			Math.random() * limit,
			Math.random() * limit,
		];
	};

	const changeNValues = () => {
		nIndex = nIndex + 1;
		let arr;
		if (nIndex >= nValues.length) {
			arr = randomArr();
		} else {
			arr = nValues[nIndex];
		}
		n1 = arr[0];
		n2 = arr[1];
		n3 = arr[2];
		changeColorIncs();
	};

	const changeColorIncs = () => {
		incs[0] = Math.random();
		incs[1] = Math.random();
		incs[2] = Math.random();
	};

	const changeColors = () => {
		changeColor(0);
		changeColor(1);
		changeColor(2);
	};

	const changeColor = (index) => {
		cols[index] = cols[index] + incs[index] * dirs[index];
		if (cols[index] >= 255 || cols[index] <= 0) dirs[index] *= -1;
	};

	const getScale = () => {
		return currentHeight === height ? 1 : 0.5;
	};

	const draw = (p5) => {
		p5.textSize(32);
		p5.translate(window.innerWidth / 2, currentHeight / 2);
		p5.rotate(Math.PI / 2);
		p5.scale(getScale());

		m = map(Math.sin(osc), -1, 1, 0, 10);
		osc += 0.01;
		if (m <= 0.0001 && !changedRecently) {
			changeNValues();
			changedRecently = true;
			setTimeout(() => (changedRecently = false), 500);
		}
		p5.background(0);

		p5.strokeWeight(4);
		p5.stroke(cols[0], cols[1], cols[2]);

		changeColors();

		let points = 200;
		let size = 200;
		let inc = (Math.PI * 2) / points;
		p5.beginShape();
		p5.noFill();
		for (let i = 0; i <= Math.PI * 2; i += inc) {
			let r = getRadius(i);
			let x = size * r * Math.cos(i);
			let y = size * r * Math.sin(i);
			p5.vertex(x, y);
		}
		p5.endShape();
	};

	const getRadius = (theta) => {
		let part1 = Math.pow(Math.abs((1 / a) * Math.cos((m / 4) * theta)), n2);
		let part2 = Math.pow(Math.abs((1 / b) * Math.sin((m / 4) * theta)), n3);
		let rightSide = Math.pow(part1 + part2, 1 / n1);
		return 1 / rightSide;
	};

	const windowResized = (p5) => {
		let width = window.innerWidth;
		currentHeight = height;
		if (width < 550) currentHeight = smallerHeight;
		p5.resizeCanvas(window.innerWidth, currentHeight);
	};

	const mouseClicked = (p5) => {
		m += 1;
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
