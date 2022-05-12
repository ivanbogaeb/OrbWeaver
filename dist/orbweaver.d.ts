/**
* Google News RSS made simple and easy.
* @example
* ```js
    import {orbWeaver} from '@ivanbogaeb/orbWeaver';
    let weaver = new orbWeaver();

    weaver.location = 'AR';
    weaver.language = 'es';
    weaver.images = true | false;
    weaver.extractURLs = true | false;
    weaver.verbose = true | false;

    let geo = await weaver.geo(city);
    let search = await weaver.search(query);
    let topic = await weaver.topic(topic);
    let headlines = await weaver.headlines();
    
    let topicsArray = weaver.getTopics();
    let langCountryMap = weaver.getLangCountryMap();
* ```
*/
export declare class orbWeaver {
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
     * Get news related to a certain location.
     * @example
     * ```js
     * let geo = await weaver.geo('Buenos Aires');
     * ```
    */
    geo: (city: string) => Promise<any>;
    /**
     * Search for articles related to the topic you are looking for.
     * @example
     * ```js
     * let search = await weaver.search('Elon Musk');
     * ```
    */
    search: (query: string) => Promise<any>;
    /**
     * You can also read articles related to certain topics.
     * @example
     * ```js
     * let search = await weaver.topic('Technology');
     * ```
    */
    topic: (topic: 'World' | 'Nation' | 'Business' | 'Technology' | 'Entertainment' | 'Sports' | 'Science' | 'Health') => Promise<any>;
    /**
     * If you just want to get the most popular articles, you can just request for all headlines.
     * @example
     * ```js
     * let search = await weaver.headlines();
     * ```
     * It is recommended to know if your location is available.
    */
    headlines: () => Promise<any>;
    /**
     * If you need to know all the available topics, you can read them in an array.
     * @example
     * ```js
     * let availableArticles = weaver.getTopics();
     * ```
     * It is recommended to know if your location is available.
    */
    getTopics: () => String[] | Array<['Technology' | 'World' | 'Nation' | 'Business' | 'Technology' | 'Entertainment' | 'Sports' | 'Science' | 'Health']>;
    /**
     * If you aren't sure about the country but yes the language, you can search for countries that speak it.
     * @example
     * ```js
     * let langCountryMap = weaver.getLangCountryMap();
     * if (langCountryMap['AR]){
     *      // Do something
     * };
     * ```
     * It is recommended to first know the ISO 3 Letter code.
    */
    getLangCountryMap: () => object;
    constructor();
}
