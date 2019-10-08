import * as fs from "fs";
import * as path from "path";
import {IBookHandler} from "./IBookHandler";

const cheerio = require('cheerio');
const rp = require('request-promise');
const request = require('request');

export class ABooksInfo implements IBookHandler {

	protected static SUPPORTED = 'https://abooks.info/';

	url: string;

	public constructor(url: string) {
		this.url = url;
	}

	public static supports(url: string) {
		return url.startsWith(ABooksInfo.SUPPORTED);
	}

	async getPlaylist() {
		let html = await rp(this.url);
		// console.log(html);

		const $ = cheerio.load(html);
		const player = $('div[data-tracks-url]');
		const dataTracksURL = player.attr('data-tracks-url');
		console.log(dataTracksURL);

		const jsonSource = await rp(dataTracksURL);
		const json = JSON.parse(jsonSource);
		// console.log(json);
		return json;
	}

	mkdir(json) {
		const folder = json[0].title;
		if (!fs.existsSync(folder)) {
			fs.mkdirSync(folder);
		}
	}

	async downloadOneByOne(json) {
		const folder = json[0].title;
		for (let desc of json) {
			const source = new URL(desc.audio);
			const destination = folder + '/' + path.basename(source.pathname);
			console.log(destination);

			if (fs.existsSync(destination)) {
				let stat = fs.statSync(destination);
				if (stat) {
					// console.log('exists');
					const head = await rp.head(source + '');
					// console.log(head);
					if (head['content-length'] > stat.size) {
						await this.download(source + '', destination);
					} else {
						console.log(head['content-length'], '=', stat.size);
					}
					continue;	// downloaded or not
				}
			}
			await this.download(source + '', destination);
		}
	}

	async download(source: string, destination: string) {
		const end = new Promise(function (resolve, reject) {
			let output = fs.createWriteStream(destination);
			const piper = request(source).pipe(output);
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
		const stat = fs.statSync(destination);
		console.log('downloaded', stat.size);
	}

}
