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
exports.__esModule = true;
var AudioKnigiClub_1 = require("./AudioKnigiClub");
require('source-map-support').install();
var ABooksInfo_1 = require("./ABooksInfo");
var url = process.argv[2];
if (!url) {
    throw new Error('> node abooks.js https://abooks.info/...');
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var handlers, _i, handlers_1, handlerClass, handler, playlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(url);
                handlers = [
                    ABooksInfo_1.ABooksInfo,
                    AudioKnigiClub_1.AudioKnigiClub,
                ];
                _i = 0, handlers_1 = handlers;
                _a.label = 1;
            case 1:
                if (!(_i < handlers_1.length)) return [3 /*break*/, 6];
                handlerClass = handlers_1[_i];
                if (!handlerClass.supports(url)) return [3 /*break*/, 5];
                handler = new handlerClass(url);
                return [4 /*yield*/, handler.getPlaylist()];
            case 2:
                playlist = _a.sent();
                if (!playlist) return [3 /*break*/, 4];
                handler.mkdir(playlist);
                return [4 /*yield*/, handler.downloadOneByOne(playlist)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=abooks.js.map