var net = new brain.NeuralNetwork();

var data = [{
    input: [0, 0, 0, 0, 0, 0],
    output: [0]
}, {
    input: [1, 1, 1, 1, 1, 1],
    output: [0]
}];

net.train(data);

var times = 0;

const getRandomColorValue = (maxVal) => {
    return Math.floor(Math.random() * maxVal);
};

function rank(value) {

    times++;

    data.push({
        input: colors,
        output: [value]
    });

    if (times === 1) {
        net.train(data);
    }

    colors = [getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255];

    setStarColor([colors[0], colors[1], colors[2]]);

    setFlagColor([colors[3], colors[4], colors[5]]);

    updateUser(net.run(colors));

}

function setStarColor(color) {
    document.getElementsByClassName("star")[0].style.stroke = `rgb(${color[0]*255},${color[1]*255},${color[2]*255})`;
}

function updateUser(data) {
    document.getElementById("data").innerHTML = "Chance You May Like it " + (data[0] * 100).toFixed(1) + "%";
}

function setFlagColor(color) {
    document.getElementsByClassName("flag")[0].style.fill = `rgb(${color[0]*255},${color[1]*255},${color[2]*255})`
    document.getElementsByClassName("flag")[1].style.fill = `rgb(${color[0]*255},${color[1]*255},${color[2]*255})`
}

var colors = [0.74901960784, 0.03921568627, 0.18823529412, 1, 0.8431372549, 0];

setStarColor([colors[0], colors[1], colors[2]]);

setFlagColor([colors[3], colors[4], colors[5]]);

updateUser(net.run(colors));


function bestFlag(loops) {
    net.train(data);
    var results = [];
    for (let i = 0; i < loops; i++) {
        colors = [getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255,
            getRandomColorValue(255) / 255, getRandomColorValue(255) / 255, getRandomColorValue(255) / 255
        ];
        const [score] = net.run(colors);
        results.push({
            ...colors,
            score
        });
    }

    // Sort results
    const sortedResults = results.sort((a, b) => b.score - a.score);



    colors = sortedResults[0];

    delete colors.score;

    colors = [sortedResults[0][0], sortedResults[0][1], sortedResults[0][2], sortedResults[0][3], sortedResults[0][4], sortedResults[0][5]];

    setStarColor([colors[0], colors[1], colors[2]]);

    setFlagColor([colors[3], colors[4], colors[5]]);

    updateUser(net.run(colors));

}