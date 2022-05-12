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
exports.pageProcess = void 0;
const https_1 = __importDefault(require("https"));
const timer = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const base64Image = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        https_1.default.get(url, (resp) => {
            resp.setEncoding('base64');
            let body = "data:" + resp.headers["content-type"] + ";base64,";
            resp.on('data', (data) => { body += data; });
            resp.on('end', () => {
                return resolve(body);
            });
        }).on('error', (e) => {
            return reject(e.message);
        });
    });
});
const pageProcess = (query, page, cheerio, readImage, readURL, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let attempts = 0;
        let imageURL = '';
        let articleURL = '';
        verbose && console.log(`\n[+] - Looking for article: ${query}`);
        yield page.goto(`https://www.google.com.ar/search?q=${encodeURIComponent(query)}&tbm=isch`);
        verbose && console.log(`    - Article information found...`);
        do {
            verbose && console.log(`    - Attempting to read data...`);
            yield timer(1000).then(() => __awaiter(void 0, void 0, void 0, function* () {
                attempts++;
                let content = yield page.content();
                let $ = cheerio.load(content);
                let images = $('body').find("img[class='rg_i Q4LuWd']");
                if (images.length > 0) {
                    verbose && console.log(`    - Data found...`);
                    images.filter((index, element) => {
                        if (index === 0) {
                            if (readURL) {
                                verbose && console.log(`    - Article original URL found...`);
                                articleURL = $(element).parent().parent().parent().find('a')[1].attribs.href;
                            }
                            ;
                            if (readImage) {
                                imageURL = $(element).attr('src');
                                verbose && console.log(`    - Article thumbnail captured...`);
                                if (!imageURL) {
                                    imageURL = '';
                                }
                                ;
                            }
                            ;
                            attempts = 30;
                        }
                        ;
                    });
                }
                else {
                    imageURL = '';
                }
            }));
        } while (attempts < 30); // 30 seconds considering your internet is slow af or google doesn't want you to get the image data
        if (imageURL.includes('https')) {
            yield base64Image(imageURL).then(function (base64) {
                imageURL = base64;
            }, function (error) {
                imageURL = '';
            });
        }
        ;
        return { image: imageURL, url: articleURL };
    }
    catch (error) {
        return { error: error };
    }
});
exports.pageProcess = pageProcess;
