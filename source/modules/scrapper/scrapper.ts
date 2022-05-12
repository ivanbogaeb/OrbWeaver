const cheerio = require('cheerio');
import puppeteer from 'puppeteer';

import { request } from './functions/request';
import { pageProcess } from './functions/process';

const timer = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const scrapper = async (requestURL:string, images:boolean, extractURLs:boolean, verbose: boolean, amount:number) => {
    const browser = await puppeteer.launch(/*{headless: false,args: ["--disable-setuid-sandbox"],}*/);
    verbose && console.log("[+] - Firing browser...");
    const page = await browser.newPage();
    verbose && console.log("[+] - New page...");
    verbose && console.log("[+] - Loading articles...");
    let articles:any = await request(requestURL, cheerio, amount);
    verbose && console.log(`[+] - News articles gathered...`);
    if (articles){
        if (images || extractURLs){
            for (let i = 0; i < articles.length; i++){
                await timer(5000).then(async () => { // 5 seconds is a good time to wait
                    let imageData = await pageProcess(articles[i].title+' - '+articles[i].origin, page, cheerio, images, extractURLs, verbose);
                    if (imageData.image){
                        articles[i].image = imageData.image;
                    };
                    if (imageData.url){
                        articles[i].url = imageData.url;
                    };
                    if (imageData.error){
                        console.error(imageData.error);
                    };
                });
            };
        };
    };
    await browser.close();
    return articles;
};