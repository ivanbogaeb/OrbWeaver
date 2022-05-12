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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapper = void 0;
const cheerio = require('cheerio');
const puppeteer_1 = __importDefault(require("puppeteer"));
const request_1 = require("./functions/request");
const process_1 = require("./functions/process");
const timer = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const scrapper = (requestURL, images, extractURLs, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch( /*{headless: false,args: ["--disable-setuid-sandbox"],}*/);
    verbose && console.log("[+] - Firing browser...");
    const page = yield browser.newPage();
    verbose && console.log("[+] - New page...");
    verbose && console.log("[+] - Loading articles...");
    let articles = yield (0, request_1.request)(requestURL, cheerio, extractURLs);
    verbose && console.log(`[+] - News articles gathered...`);
    if (articles) {
        if (images || extractURLs) {
            for (let i = 0; i < articles.length; i++) {
                yield timer(3000).then(() => __awaiter(void 0, void 0, void 0, function* () {
                    let imageData = yield (0, process_1.pageProcess)(articles[i].title + ' - ' + articles[i].origin, page, cheerio, images, extractURLs, verbose);
                    if (imageData.image) {
                        articles[i].image = imageData.image;
                    }
                    ;
                    if (imageData.url) {
                        articles[i].url = imageData.url;
                    }
                    ;
                    if (imageData.error) {
                        console.error(imageData.error);
                    }
                    ;
                }));
            }
            ;
        }
        ;
    }
    ;
    yield browser.close();
    return articles;
});
exports.scrapper = scrapper;
