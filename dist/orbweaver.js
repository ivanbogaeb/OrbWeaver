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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orbWeaver = void 0;
const articles_1 = require("./modules/articles/articles");
/**
* Google News RSS made simple and easy.
* @example
* ```js
    import {orbWeaver} from '@ivanbogaeb/orbWeaver';
    let weaver = new orbWeaver();

    weaver.location = 'AR';
    weaver.language = 'es';
    weaver.images = true | false;
    weaver.extractURLs = true | false;
    weaver.verbose = true | false;

    let geo = await weaver.geo(city);
    let search = await weaver.search(query);
    let topic = await weaver.topic(topic);
    let headlines = await weaver.headlines();
    
    let topicsArray = weaver.getTopics();
    let langCountryMap = weaver.getLangCountryMap();
* ```
*/
class orbWeaver {
    constructor() {
        const langCountryMap = require('./map.json');
        const topics = ['World', 'Nation', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];
        const articles = new articles_1.Articles();
        this.location = 'AR';
        this.language = 'es';
        this.images = false;
        this.extractURLs = false;
        this.verbose = false;
        this.geo = (city = 'Buenos Aires') => __awaiter(this, void 0, void 0, function* () { return yield articles.geo(city, this.location, this.language, this.images, this.extractURLs, this.verbose); });
        this.search = (query = '') => __awaiter(this, void 0, void 0, function* () { return yield articles.search(query, this.location, this.language, this.images, this.extractURLs, this.verbose); });
        this.topic = (topic = 'Technology') => __awaiter(this, void 0, void 0, function* () { return yield articles.topic(topic, this.location, this.language, this.images, this.extractURLs, this.verbose); });
        this.headlines = () => __awaiter(this, void 0, void 0, function* () { return yield articles.headlines(this.location, this.language, this.images, this.extractURLs, this.verbose); });
        this.getTopics = () => topics;
        this.getLangCountryMap = () => langCountryMap;
    }
    ;
}
exports.orbWeaver = orbWeaver;
;
