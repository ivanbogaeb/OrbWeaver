export declare class Articles {
    geo: (city: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean) => Promise<any> | [];
    search: (query: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean) => Promise<any> | [];
    topic: (topic: string, location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean) => Promise<any> | {
        error: string;
    };
    headlines: (location: string, language: string, images: boolean, extractURLs: boolean, verbose: boolean) => Promise<any> | [];
    constructor();
}
