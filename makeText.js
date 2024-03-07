const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov");

function generateText(text) {
	let mm = new MarkovMachine(text);
	console.log(mm.makeText());
}

function generateFromFile(filename) {
	fs.readFile(filename, "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading ${filename}: ${err}`);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

async function generateFromUrl(url) {
	try {
		let resp = await axios.get(url);
		generateText(resp.data);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
	generateFromFile(path);
} else if (method === "url") {
	generateFromUrl(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
