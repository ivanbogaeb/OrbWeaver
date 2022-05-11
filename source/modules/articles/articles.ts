import {scrapper} from '../scrapper/scrapper';

export class Articles {

    geo: (
        city: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean
    ) => Promise<any> | [];

    search: (
        query: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean
    ) => Promise<any> | [];

    topic: (
        topic: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean
    ) => Promise<any> | {error: string};

    headlines: (
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean
    ) => Promise<any> | [];

    constructor(){
        const {parameters} = require('./functions/parameters');

        const topicsRaw = ['WORLD', 'NATION', 'BUSINESS', 'TECHNOLOGY', 'ENTERTAINMENT', 'SPORTS', 'SCIENCE', 'HEALTH'];
        const topics = ['CAAqLAgKIiZDQkFTRmdvSUwyMHZNRGx1YlY4U0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqJQgKIh9DQkFTRVFvSEwyMHZNR3BuWkJJR1pYTXROREU1S0FBUAE', 'CAAqLAgKIiZDQkFTRmdvSUwyMHZNRGx6TVdZU0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqLAgKIiZDQkFTRmdvSUwyMHZNRGRqTVhZU0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqLAgKIiZDQkFTRmdvSUwyMHZNREpxYW5RU0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqLAgKIiZDQkFTRmdvSUwyMHZNRFp1ZEdvU0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqLAgKIiZDQkFTRmdvSUwyMHZNRFp0Y1RjU0JtVnpMVFF4T1JvQ1FWSW9BQVAB', 'CAAqJggKIiBDQkFTRWdvSUwyMHZNR3QwTlRFU0JtVnpMVFF4T1NnQVAB'];

        const type = {
            geo: 'https://news.google.com/news/rss/headlines/section/geo/',
            search: 'https://news.google.com/rss/search?q=',
            topics: 'https://news.google.com/rss/topics/',
            headlines: 'https://news.google.com/rss',
        };
        
        const request = (url:string, component:string, location:string, language:string, images:boolean, extractURLs:boolean, verbose: boolean) => {
            let requestURL = url.concat(encodeURIComponent(component), parameters(location, language));
            return scrapper(requestURL, images, extractURLs, verbose);
        };

        this.geo = (city, location, language, images, extractURLs, verbose) => {
            return request(type.geo, city, location, language, images, extractURLs, verbose);
        };
        this.search = (query, location, language, images, extractURLs, verbose) => {
            return request(type.search, query, location, language, images, extractURLs, verbose);
        };
        this.topic = (topic, location, language, images, extractURLs, verbose) => {
            let index = topicsRaw.findIndex(element => element == topic.toUpperCase());
            if (index){
                return request(type.topics, topics[index], location, language, images, extractURLs, verbose);
            } else {
              return {error: `You can only choose between these topics: ${topicsRaw}`};
            };
        };
        this.headlines = (location, language, images, extractURLs, verbose) => {
            return request(type.headlines, '', location, language, images, extractURLs, verbose);
        };
    };
};