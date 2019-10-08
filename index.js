/**
 * Created by a.murin on 03.04.15.
 *
 */
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var jsdom = require("jsdom/lib/old-api.js");
var request = require('request-promise');
var co = require('co');
var fs = require('fs');
var ffmetadata = require("ffmetadata");
var args = process.argv.slice(process.argv[0].match(/node/i) ? 1 : 0);
var url = args[args.length - 1];
if (!url.match(/^http/i)) {
    console.log('Usage: %@ url'.fmt(args[0]));
    process.exit(-1);
}
this.setMetadata = false;
var saveUrlToFile = function (path, urlToLoad) {
    return co(function () {
        var fileName, host, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = null;
                    if (path) {
                        fileName = path + '/' + urlToLoad.replace(/^.+\/([^/]+)$/, '$1');
                        console.log("Download \"" + urlToLoad + "\" to \"" + fileName + "\"...");
                    }
                    else {
                        console.log("Download \"" + urlToLoad + "\"...");
                    }
                    host = urlToLoad.match(/\/\/([^/]+)\//);
                    if (host)
                        host = host[1];
                    return [4 /*yield*/, request({
                            url: encodeURI(urlToLoad),
                            encoding: null,
                            headers: {
                                'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36',
                                'Referer': url,
                                //'Accept': '*/*',
                                //'Accept-Encoding': 'identity;q=1, *;q=0 ',
                                //'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
                                'Cache-Control': 'no-cache',
                                //'Connection': 'keep-alive',
                                //'Pragma': 'no-cache',
                                //'Range': 'bytes=0-',
                                'Host': host,
                            },
                        })];
                case 1:
                    res = _a.sent();
                    if (!path) {
                        return [2 /*return*/, res.toString('utf8')];
                    }
                    fs.writeFileSync(fileName, res);
                    console.log("Done: " + res.length + " bytes");
                    return [2 /*return*/, fileName];
            }
        });
    })["catch"](function (err) {
        console.error("saveUrlToFile(" + path + ", " + urlToLoad + ")", err);
    });
};
var processFunction = function (errors, window) {
    co(function () {
        var $, title, parts, artist, book, content, img, scripts, found, l, i, matched, data, imgFileName, tracks, _loop_1, this_1, _i, data_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $ = window.jQuery;
                    title = $('[property="og:title"]').attr('content');
                    parts = title.split(/\s+\-\s+/);
                    artist = parts[0];
                    book = parts[1];
                    content = $('#content');
                    img = content.find('img[alt=image]:first').attr('src');
                    scripts = content.find('script');
                    for (l = scripts.length, i = 0; i < l; i++) {
                        matched = scripts.eq(i).text().match(/audioPlayer\((\d+),/);
                        if (matched)
                            found = matched[1];
                    }
                    if (!found) {
                        throw 'Unable to find ID';
                    }
                    return [4 /*yield*/, saveUrlToFile(null, 'http://audioknigi.club/rest/bid/' + found)];
                case 1:
                    data = _a.sent();
                    data = JSON.parse(data);
                    console.log('Title:', title);
                    console.log('Image:', img);
                    if (!fs.existsSync(title)) {
                        fs.mkdirSync(title);
                    }
                    fs.writeFileSync(title + "/url.txt", url);
                    return [4 /*yield*/, saveUrlToFile(title, img)];
                case 2:
                    imgFileName = _a.sent();
                    tracks = data.length;
                    _loop_1 = function (item) {
                        var fileName, num;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saveUrlToFile(title, item.mp3)];
                                case 1:
                                    fileName = _a.sent();
                                    num = fileName.match(/(\d+)[^/]+$/);
                                    num = num ? parseInt(num[1]) : 0;
                                    if (!this_1.setMetadata) return [3 /*break*/, 3];
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            ffmetadata.write(fileName, {
                                                artist: artist,
                                                album: book,
                                                title: fileName.split(/\//)[1].replace(/^\d+_/, '').replace(/\.mp3$/i, ''),
                                                track: num + "/" + tracks,
                                            }, {
                                                attachments: [imgFileName]
                                            }, function (err) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    resolve();
                                                }
                                            });
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    this_1 = this;
                    _i = 0, data_1 = data;
                    _a.label = 3;
                case 3:
                    if (!(_i < data_1.length)) return [3 /*break*/, 6];
                    item = data_1[_i];
                    return [5 /*yield**/, _loop_1(item)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    })["catch"](function (err) {
        if (err) {
            throw err.stack || err;
        }
    });
};
console.log("Downloading " + url + "...");
jsdom.env({
    url: url,
    scripts: ['http://code.jquery.com/jquery.js'],
    done: processFunction,
    proxy: process.env.http_proxy,
});
/*
 JSDOM.fromURL(url, {
    proxy: process.env.http_proxy,
 }).then(dom => {
 let window = dom.defaultView;
 (window, 'http://code.jquery.com/jquery.js',
 processFunction
 );
 }).catch (e => {
 console.error(e);
 });
 */
//# sourceMappingURL=index.js.map