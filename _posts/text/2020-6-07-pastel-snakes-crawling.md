---
title: Pastel Snakes Crawling Across The Screen
date: 2020-6-07
---

<canvas id="canvas"></canvas>

<style>
    #canvas {
        background-color: #16ACB9;
        height: 100%;
        width: 100%;
        position:absolute;
        top: 0;
        left:0;
        z-index: -5;
    }
</style>

<script>
    var canvas, ctx;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.lineCap = "round";
	ctx.lineWidth = 8;
});

ctx.lineCap = "round";
ctx.lineWidth = 8;

CanvasRenderingContext2D.prototype.wavy = function (
	_x1,
	_x2,
	_y,
	_freq,
	_amplitude,
	_offset
) {
	ctx.beginPath();

	for (let i = _x1; i < _x2; i++) {
		this.lineTo(i, _y + Math.sin((_x1 - i) / _freq + _offset) * _amplitude);
	}

	ctx.stroke();
};

const colors = [
	"#FFCAB1",
	"#FDFF9B",
	"#7FB873",
	"#AE8CA3",
	"#A2ABB5",
	"#E8929A",
	"#ECB094",
	"#CEDBDA",
	"#F0D4D0"
];

class Snake {
	x;
	length;
	y;
	freq;
	amplitude;
	offset;
	stroke;
	speed;

	constructor() {}

	generate() {
		this.length = getRnd(50, 200);
		this.x = -this.length - getRnd(20, 800);
		this.y = getRnd(0, canvas.height);
		this.freq = getRnd(5, 10);
		this.amplitude = getRnd(5, 10),
		this.speed = getRnd(0.1, 0.5);
		this.offset = getRnd(-Math.PI, Math.PI);
		this.stroke = colors[Math.floor(getRnd(0, colors.length))];
	}

	tick() {
		this.offset -= this.speed / 10;
		this.x += this.speed;

		if (this.x > ctx.canvas.width) {
			this.generate();
		}
	}
	draw(ctx) {
		ctx.strokeStyle = this.stroke;
		ctx.wavy(
			this.x,
			this.x + this.length,
			this.y,
			this.freq,
			this.amplitude,
			this.offset
		);
	}
}

function getRnd(min, max) {
	return Math.random() * (max - min) + min;
}

var snakes = [];

for (let i = 0; i < 15; i++) {
	let tsnake = new Snake();
	tsnake.generate();
	snakes.push(tsnake);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (snake of snakes) {
		snake.tick();
		snake.draw(ctx);
	}
}

setInterval(draw, 1000 / 60);

</script>