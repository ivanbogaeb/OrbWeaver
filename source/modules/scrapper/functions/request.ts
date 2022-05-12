import { IArticles } from '../../../interfaces/articles'

import { CheerioAPI } from 'cheerio';
import Parser from 'rss-parser';
const parser = new Parser();

export const request = async (URL:string, cheerio:CheerioAPI, amount:number) => {
    try {
        let articles = new Array<IArticles>();
        let {items} = await parser.parseURL(URL);
        items.forEach(async ({title, link, pubDate, content}, index) => {
            if (index < amount){
                const article:any = {
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
                if (title){
                    article.title = title.slice(0, title.lastIndexOf('-') - 1);
                    article.origin = (title.slice(title.lastIndexOf('-') + 2)).trim();
                    if (link){
                        article.link = link;
                    };
                    if (pubDate){
                        article.pubDate = pubDate;
                    };
    
                    if (content){
                        let $ = cheerio.load(content);
                        article.related.pop();
                        $('a').get().map(({children}:{children: any}) => {
                            article.related.push({title: $(children).text(), url: children[0].parent.attribs.href});
                        });
                        article.related.shift();
                        article.related.pop();
                        articles.push(article);
                    };
                };
            };
        });
        return articles;
    } catch (error){
        console.log(error);
    }
};