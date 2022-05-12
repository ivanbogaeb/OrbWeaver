import { IArticles } from '../../../interfaces/articles';
import { CheerioAPI } from 'cheerio';
export declare const request: (URL: string, cheerio: CheerioAPI, amount: number) => Promise<IArticles[] | undefined>;
