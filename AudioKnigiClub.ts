import {IBookHandler} from "./IBookHandler";

const cheerio = require('cheerio');
const rp = require('request-promise-native');

export class AudioKnigiClub implements IBookHandler {

	protected static SUPPORTED = 'https://audioknigi.club/';

	url: string;

	public static supports(url: string) {
		return url.startsWith(AudioKnigiClub.SUPPORTED);
	}

	public constructor(url: string) {
		this.url = url;
	}

	async getPlaylist(): Promise<any> {
		let html = await rp({
			url: this.url,
			method: 'POST',
			headers: {
				'accept': 'application/json, text/javascript, */*; q=0.01',
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				'cache-control': 'no-cache',
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'cookie': 'PHPSESSID=s7egpvj9due9b4sd1org3flag0; a_ismobile=0',
				'origin': 'https://audioknigi.club',
				'pragma': 'no-cache',
				'referer': 'https://audioknigi.club/laundes-leyl-kak-govorit-s-kem-ugodno-i-o-chem-ugodno',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
				'x-requested-with': 'XMLHttpRequest',
			}
		});
		// console.log(html);

		const $ = cheerio.load(html);
		const player = $('div.player-side');
		const dataGlobalID = player.attr('data-global-id');
		console.log(dataGlobalID);

		const playlistURL = 'https://audioknigi.club/ajax/bid/' + dataGlobalID;
		let jsonData = await rp(playlistURL);
		console.log(jsonData);
		jsonData = JSON.parse(jsonData);
		console.log(jsonData.aItems);
		jsonData = JSON.parse(jsonData.aItems);
		console.log(jsonData);
		return jsonData;
	}

	mkdir(json): void {
	}

	downloadOneByOne(json): Promise<void> {
		return undefined;
	}

}
