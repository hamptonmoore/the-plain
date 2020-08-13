var randomScalingFactor = function () {
	return Math.round(Math.random() * 100);
};

function xmur3(str) {
	if (str === null) str = "null";
	for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
		(h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
			(h = (h << 13) | (h >>> 19));
	return (h ^= h >>> 16) >>> 0;
}
intToHSL = function (num) {
	var shortened = num % 360;
	return `hsl(${shortened},100%,30%)`;
};

function nameToColor(name) {
	return intToHSL(xmur3(name));
}

makeGraphConfig = (dataset) => {
	return {
		type: "doughnut",
		data: {
			datasets: [
				{
					data: dataset.map((d) => d.count),
					backgroundColor: dataset.map((d) => nameToColor(d.item)),
					hoverBackgroundColor: dataset.map((d) =>
						nameToColor(d.item)
					),
					label: "Dataset 1",
				},
			],
			labels: dataset.map((d) => d.item),
		},
		options: {
			responsive: true,
		},
	};
};

fetch("/tools/graphData.json")
	.then((response) => response.json())
	.then((graphData) => {
		document.querySelectorAll("canvas.chart").forEach((elm) => {
			console.log("Making chart for " + elm.getAttribute("id"));
			let queryData = graphData[elm.getAttribute("id")];

			var config = makeGraphConfig(queryData);
			var ctx = elm.getContext("2d");
			new Chart(ctx, config);
		});
	});
