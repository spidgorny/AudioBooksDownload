import * as fs from "fs";
import * as path from "path";

const url = process.argv[2];
if (!url) {
	throw new Error('> node abooks.js https://abooks.info/...');
}

(async () => {
	console.log(url);
	const rp = require('request-promise');
	let html = await rp(url);
	// console.log(html);

	const cheerio = require('cheerio');
	const $ = cheerio.load(html);
	const player = $('div[data-tracks-url]');
	const dataTracksURL = player.attr('data-tracks-url');
	console.log(dataTracksURL);

	const jsonSource = await rp(dataTracksURL);
	const json = JSON.parse(jsonSource);
	// console.log(json);

	const folder = json[0].title;
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}

	const request = require('request');
	for (let desc of json) {
		const source = new URL(desc.audio);
		const destination = folder + '/' + path.basename(source.pathname);
		console.log(destination);

		const end = new Promise(function(resolve, reject) {
			let output = fs.createWriteStream(destination);
			const piper = request(desc.audio).pipe(output);
			output.on('end', () => {
				// console.log('stream end');
				resolve(destination);
			});
			output.on('finish', () => {
				// console.log('stream finish');
				resolve(destination);
			});
			output.on('error', reject);
		});
		// console.log(piper);
		try {
			await end;
		} catch (e) {
			console.error(e);
		}

		const size = fs.statSync(destination);
		console.log(size.size);
	}
})();
