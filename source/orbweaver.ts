import { Articles } from "./modules/articles/articles";
export class orbWeaver {
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available, check the function **getLangCountryMap()**
    */
    location: string;
    /**
     * Sets up the news articles language you want to read.
     * @example
     * ```js
     * weaver.language = 'es';
     * ```
     * It is recommended to know if your language is available, check the function **getLangCountryMap()**
    */
    language: string;
    /**
     * You can get thumbnails for each of your articles by setting up this property to true.
     * @example
     * ```js
     * weaver.images = true | false;
     * ```
    */
    images: boolean;
    /**
     * You can get the original URL for each of your articles by setting up this property to true.
     * @example
     * ```js
     * weaver.extractURLs = true | false;
     * ```
    */
    extractURLs: boolean;
    /**
     * If you would like to see what's going on in the background, you can activate this property.
     * @example
     * ```js
     * weaver.verbose = true | false;
     * ```
    */
    verbose: boolean;

    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    geo: (city: string) => Promise<any>;
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    search: (query: string) => Promise<any>;
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    topic: (topic: 'Technology' | 'World' | 'Nation' | 'Business' | 'Technology' | 'Entertainment' | 'Sports' | 'Science' | 'Health') => Promise<any>;
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    headlines: () => Promise<any>;
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    getTopics: () => String[] | Array<['Technology' | 'World' | 'Nation' | 'Business' | 'Technology' | 'Entertainment' | 'Sports' | 'Science' | 'Health']>;
    /**
     * Sets up your location and from where you want to request news articles.
     * @example
     * ```js
     * weaver.location = 'AR';
     * ```
     * It is recommended to know if your location is available.
    */
    getLangCountryMap: () => object;

    constructor() {
        const langCountryMap = require('../map.json');
        
        const topics = ['World', 'Nation', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];
        const articles = new Articles();
        
        this.location = 'AR';
        this.language = 'es';
        this.images = false;
        this.extractURLs = false;
        this.verbose = false;
  
        this.geo = async (city = 'Buenos Aires') => await articles.geo(city, this.location, this.language, this.images, this.extractURLs, this.verbose);
        this.search = async (query = '') => await articles.search(query, this.location, this.language, this.images, this.extractURLs, this.verbose);
        this.topic = async (topic = 'Technology') => await articles.topic(topic, this.location, this.language, this.images, this.extractURLs, this.verbose);
        this.headlines = async () => await articles.headlines(this.location, this.language, this.images, this.extractURLs, this.verbose);
        
        this.getTopics = () => topics;
        this.getLangCountryMap = () => langCountryMap;
    };
};