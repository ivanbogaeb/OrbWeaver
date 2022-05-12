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
exports.request = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default();
const request = (URL, cheerio, extractURLs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let articles = new Array();
        let { items } = yield parser.parseURL(URL);
        items.forEach(({ title, link, pubDate, content }) => __awaiter(void 0, void 0, void 0, function* () {
            const article = {
                title: '',
                origin: '',
                link: '',
                pubDate: '',
                image: '',
                related: [{
                        title: '',
                        url: ''
                    }]
            };
            if (title) {
                article.title = title.slice(0, title.lastIndexOf('-') - 1);
                article.origin = (title.slice(title.lastIndexOf('-') + 2)).trim();
                if (link) {
                    article.link = link;
                }
                ;
                if (pubDate) {
                    article.pubDate = pubDate;
                }
                ;
                if (content) {
                    let $ = cheerio.load(content);
                    article.related.pop();
                    $('a').get().map(({ children }) => {
                        article.related.push({ title: $(children).text(), url: children[0].parent.attribs.href });
                    });
                    article.related.shift();
                    article.related.pop();
                    articles.push(article);
                }
                ;
            }
            ;
        }));
        return articles;
    }
    catch (error) {
        console.log(error);
    }
});
exports.request = request;
