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

let colorSets = {
	cjk: "#779ECB",
	hangul: "#EEE0C9",
	katakana: "#341A59",
	hebrew: "#88BBE4",
	hiragana: "#87DCC0",
	cyrillic: "#CDF1AF",
	arabic: "#E494D3",
	devanagari: "#998AD3",
	latin: "#704523",
	thai: "#9A91AC",
	digit: "#FFB9C4",
	null: "#FE6B64",
	asterisk: "#85A8BA",
	nko: "#E36704",
	greek: "#B29DD9",
	armenian: "#FD982A",
	商城: "#B1C5C3",
	公司: "#FFB447",
	在线: "#DC453D",
	网络: "#77DD77",
	网店: "#FC4E29",
	닷컴: "#E36704",
	コム: "#771951",
	中文网: "#560763",
	购物: "#0D7E4A",
	קום: "#C538BD",
};

function nameToColor(name) {
	return colorSets[name];
	//return intToHSL(xmur3(name));
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
			plugins: {
				datalabels: {
					color: "white",
					formatter: function (value, context) {
						return context.chart.data.labels[context.dataIndex];
					},
					display: "auto",
					anchor: "center",
				},
			},
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
