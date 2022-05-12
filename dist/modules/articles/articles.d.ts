export declare class Articles {
    geo: (city: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean, amount: number) => Promise<any> | Error;
    search: (query: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean, amount: number) => Promise<any> | Error;
    topic: (topic: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean, amount: number) => Promise<any> | Error;
    headlines: (location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean, amount: number) => Promise<any> | Error;
    constructor();
}
