"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var url = process.argv[2];
if (!url) {
    throw new Error('> node abooks.js https://abooks.info/...');
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var rp, html, cheerio, $, player, dataTracksURL, jsonSource, json, folder, _i, json_1, desc, source, destination, stat, head;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(url);
                rp = require('request-promise');
                return [4 /*yield*/, rp(url)];
            case 1:
                html = _a.sent();
                cheerio = require('cheerio');
                $ = cheerio.load(html);
                player = $('div[data-tracks-url]');
                dataTracksURL = player.attr('data-tracks-url');
                console.log(dataTracksURL);
                return [4 /*yield*/, rp(dataTracksURL)];
            case 2:
                jsonSource = _a.sent();
                json = JSON.parse(jsonSource);
                folder = json[0].title;
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
                _i = 0, json_1 = json;
                _a.label = 3;
            case 3:
                if (!(_i < json_1.length)) return [3 /*break*/, 11];
                desc = json_1[_i];
                source = new URL(desc.audio);
                destination = folder + '/' + path.basename(source.pathname);
                console.log(destination);
                stat = fs.statSync(destination);
                if (!stat) return [3 /*break*/, 8];
                return [4 /*yield*/, rp.head(source + '')];
            case 4:
                head = _a.sent();
                if (!(head['content-length'] > stat.size)) return [3 /*break*/, 6];
                return [4 /*yield*/, download(source + '', destination)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                console.log(head['content-length'], '=', stat.size);
                _a.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, download(source + '', destination)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 3];
            case 11: return [2 /*return*/];
        }
    });
}); })();
function download(source, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var request, end, e_1, stat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = require('request');
                    end = new Promise(function (resolve, reject) {
                        var output = fs.createWriteStream(destination);
                        var piper = request(source).pipe(output);
                        output.on('end', function () {
                            // console.log('stream end');
                            resolve(destination);
                        });
                        output.on('finish', function () {
                            // console.log('stream finish');
                            resolve(destination);
                        });
                        output.on('error', reject);
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, end];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    stat = fs.statSync(destination);
                    console.log('downloaded', stat.size);
                    return [2 /*return*/];
            }
        });
    });
}
