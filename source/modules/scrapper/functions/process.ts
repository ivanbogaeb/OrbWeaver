import https from 'https';
import { CheerioAPI } from 'cheerio';
import { Page } from 'puppeteer';

const timer = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const base64Image = async (url:string) => {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            resp.setEncoding('base64');
            let body = "data:" + resp.headers["content-type"] + ";base64,";
            resp.on('data', (data) => { body += data});
            resp.on('end', () => {
                return resolve(body);
            });
        }).on('error', (e) => {
            return reject(e.message);
        });
    });
};

export const pageProcess = async (query:string, page:Page, cheerio:CheerioAPI, readImage:boolean, readURL:boolean, verbose:boolean) => {
    try {
        let attempts = 0;
        let imageURL:string|undefined = '';
        let articleURL:string|undefined = '';

        verbose && console.log(`\n[+] - Looking for article: ${query}`);
        
        await page.goto(`https://www.google.com.ar/search?q=${encodeURIComponent(query)}&tbm=isch`);

        verbose && console.log(`    - Article information found...`);
        
        do {
            verbose && console.log(`    - Attempting to read data...`);
            await timer(1000).then(async () => {
                attempts++;
                let content = await page.content();
                let $ = cheerio.load(content);
                let images = $('body').find("img[class='rg_i Q4LuWd']");
                if (images.length > 0){
                    verbose && console.log(`    - Data found...`);
                    images.filter((index:number, element:any):any => {
                        if (index === 0){
                            if (readURL){
                                verbose && console.log(`    - Article original URL found...`);
                                articleURL = $(element).parent().parent().parent().find('a')[1].attribs.href;
                            };
                            if (readImage){
                                imageURL = $(element).attr('src');
                                verbose && console.log(`    - Article thumbnail captured...`);
                                if (!imageURL){
                                    imageURL = '';
                                };
                            };
                            attempts = 30;
                        };
                    });
                } else {
                    imageURL = '';
                }
            });
        } while(attempts < 30); // 30 seconds considering your internet is slow af or google doesn't want you to get the image data

        if (imageURL.includes('https')){
            await base64Image(imageURL).then(
                function(base64:any){
                    imageURL = base64;
                },
                function(error){
                    imageURL = '';
                }
            );
        };
        return {image: imageURL, url: articleURL};
    } catch (error){
        return {error: error};
    }
};