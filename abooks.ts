import {AudioKnigiClub} from "./AudioKnigiClub";

require('source-map-support').install();
import {ABooksInfo} from "./ABooksInfo";

const url = process.argv[2];
if (!url) {
	throw new Error('> node abooks.js https://abooks.info/...');
}

(async () => {
	console.log(url);

	const handlers = [
		ABooksInfo,
		AudioKnigiClub,
	];

	for (const handlerClass of handlers) {
		if (handlerClass.supports(url)) {
			let handler = new handlerClass(url);
			const playlist = await handler.getPlaylist();
			if (playlist) {
				handler.mkdir(playlist);
				await handler.downloadOneByOne(playlist);
			}
			break;
		}
	}

})();
