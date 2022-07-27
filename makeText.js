/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

// generating text from the Markov Machine and printing it out on the command line
function generateText(text) {
	let mm = new markov.MarkovMachine(text);
	console.log(mm.makeText());
}

// reading a text file that's in place on same directory as this script
function makeText(path) {
	fs.readFile(path, 'utf8', function cb(err, data) {
		if (err) {
			console.error(`Cannot read file: ${path}: ${err}`);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

// reading text from a URL passed into this methods
async function makeURLText(url) {
	let resp;

	try {
		resp = await axios.get(url);
	} catch (err) {
		console.error(`Cannot read URL: ${url}: ${err}`);
		process.exit(1);
	}
	generateText(resp.data);
}

// determining which method to call based on what is passed in
let [method, path] = process.argv.slice(2);
if (method === 'file') {
	makeText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
