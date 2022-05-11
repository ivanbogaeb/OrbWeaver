export interface IArticles {
    [index: string]: string;
};

export interface IArticle {
    title: string;
    origin: string;
    link: string;
    pubDate: string;
    image: string;
    related: [
        {
            title: string;
            url: string;
        }
    ];
}