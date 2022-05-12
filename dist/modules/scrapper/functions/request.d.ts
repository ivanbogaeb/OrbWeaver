import { IArticles } from '../../../interfaces/articles';
import { CheerioAPI } from 'cheerio';
export declare const request: (URL: string, cheerio: CheerioAPI, extractURLs: boolean) => Promise<IArticles[] | undefined>;
