import {scrapper} from '../scrapper/scrapper';

export class Articles {

    geo: (
        city: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean,
        amount: number,
    ) => Promise<any> | Error;

    search: (
        query: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean,
        amount: number,
    ) => Promise<any> | Error;

    topic: (
        topic: string, 
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean,
        amount: number,
    ) => Promise<any> | Error;

    headlines: (
        location: string, 
        language: string, 
        images: boolean, 
        extractURLs: boolean,
        verbose: boolean,
        amount: number,
    ) => Promise<any> | Error;

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
        
        const request = (url:string, component:string, location:string, language:string, images:boolean, extractURLs:boolean, verbose: boolean, amount:number) => {
            let requestURL = url.concat(encodeURIComponent(component), parameters(location, language));
            return scrapper(requestURL, images, extractURLs, verbose, amount);
        };

        this.geo = (city, location, language, images, extractURLs, verbose, amount) => {
            if (typeof city === 'string'){
                return request(type.geo, city, location, language, images, extractURLs, verbose, amount);
            } else {
                throw new Error('Your city is not defined.');
            };
        };
        this.search = (query, location, language, images, extractURLs, verbose, amount) => {
            if (typeof query === 'string'){
                return request(type.search, query, location, language, images, extractURLs, verbose, amount);
            } else {
                throw new Error('Your search query is not defined.');
            };
        };
        this.topic = (topic, location, language, images, extractURLs, verbose, amount) => {
            let index = topicsRaw.findIndex(element => element == topic.toUpperCase());
            if (index > -1){
                return request(type.topics, topics[index], location, language, images, extractURLs, verbose, amount);
            } else {
                throw new Error('Your topic is not defined correctly, you should use:\nWorld, Nation, Business, Technology, Entertainment, Sports, Science, Health\n');
            };
        };
        this.headlines = (location, language, images, extractURLs, verbose, amount) => {
            if(typeof amount === 'number'){
                return request(type.headlines, '', location, language, images, extractURLs, verbose, amount);
            } else {
                throw new Error('You can only set a limited amount of articles for headlines.');
            };
        };
    };
};