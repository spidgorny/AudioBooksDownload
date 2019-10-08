export interface IBookHandler {
	url: string;

	getPlaylist(): Promise<any>;

	mkdir(json): void;

	downloadOneByOne(json): Promise<void>;
}
