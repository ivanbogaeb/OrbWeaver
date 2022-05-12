import { CheerioAPI } from 'cheerio';
import { Page } from 'puppeteer';
export declare const pageProcess: (query: string, page: Page, cheerio: CheerioAPI, readImage: boolean, readURL: boolean, verbose: boolean) => Promise<{
    image: string;
    url: string;
    error?: undefined;
} | {
    error: unknown;
    image?: undefined;
    url?: undefined;
}>;
