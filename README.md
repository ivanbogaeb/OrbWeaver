<h1 align="center">Orb Weaver</h1>
<p align="center">Google News RSS made simple and easy.</p>

<hr>

## What is Orb Weaver?

Orb Weaver is an all-in-one tool to extract Google News RSS, get source links and also images for your own news personal project.

## Features:

- Headlines.
- Geolocation.
- Topics.
- Search.
- Language and country.
- Cover images.
- Sources.

## Installation:

> Package not uploaded yet. You can download the distribution and import it.

## Usage:

```javascript
    const {orbWeaver} = require('./orbWeaver/dist/orbWeaver'); // This will change
    let weaver = new orbWeaver(); // Initialize

    weaver.location = 'AR'; // Sets news location
    weaver.language = 'es'; // Sets news language
    weaver.extractURL = true; // Get articles source URL
    weaver.images = true; // Get base64 image for each article (Ready for img or canvas)
    weaver.verbose = true; // If you like to see how the process is done

    console.log(weaver.getTopics()); // Returns array with all available topics
    console.log(weaver.getLangCountryMap()); // Returns all the available languages and countries.

    (async () => {
        /* Your async function here */
        let technology = await weaver.topic('Technology');
        let headlines = await weaver.headlines();
        let geolocation = await weaver.geo('New York');
        let search = await weaver.search('Elon Musk');
    
        /* Error handling magic */
        if (!technology.length){ // If the array is empty
            console.log("No news were found");
        };

        /* Read the data */
        technology.forEach({title, origin, link, pubDate, image, related} => {
            /* Do something with it */
        })
    })();
```

> You can run multiple Orb Weavers at the same time, but keep in mind it's CPU and RAM usage.

## Expected output:

> `**weaver.topic()**` / `**weaver.headlines()**` / `**weaver.geo()**` / `**weaver.search()**`
```javascript

    /* Successful output */
    [
        ...,
        {
            title: "This is a very interesting article";
            origin: "Myself, of course";
            link: "https://github.com/ivanbogaeb/orbweaver";
            pubDate: "Tue, 11 May 2022 07:00:00 GMT";
            image: "data:image/jpeg;base64,blablablablablabla...";
            related: [ /*Might or might not be empty */
                {
                    title: "Another very interesting article";
                    url: "https://ivanbogaeb.github.io";
                }
            ];
        },
        ...
    ]


    /* Error output */
    // Console output if something happened
    [] // Array or failed property will be empty
```

> `**weaver.getTopics()**`
```javascript
    /* Successful output */
    ['World', 'Nation', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];
```

> `**weaver.getLangCountryMap()**`
```javascript
    /* Successful output */
    {
        "af": { // You can directly access the language as property
        "language": "Afrikaans", // English translation
        "native": "Afrikaans", // Native
        "country": ["NA", "ZA"] // Countries that speak it
        },
        "agq": {
            "language": "Aghem",
            "native": "Aghem",
            "country": ["CM"]
        },
        "ak": {
            "language": "Akan",
            "native": "Akan",
            "country": ["GH"]
        },
        "smn": {
            "language": "Inari Sami",
            "native": "anarâškielâ",
            "country": ["FI"]
        },
        ...
    };
```

## Things to consider:
- Language codenames and countries are based on the [ISO 2 Letter (Alpha-2 code, ISO 639-1)](http://www.loc.gov/standards/iso639-1/) and [ISO 3 Letter (Alpha-3 code, ISO 639-2)](http://www.loc.gov/standards/iso639-2/) Standard Codes for the Representation of Names of Languages.
- The country is tied to the language you select, so look up for it with `getLangCountryMap()` function.
- Google News only returns articles that were written in the language and country you selected. If you are looking for Japanese news in English for example, you will get articles written in English, but not translated native news.

## Changelog:
- 11 May 2022 - First Release - Version 1.0

## Credits:

- Brought to you thanks to **[TypeScript](https://www.typescriptlang.org/)**, **[Cheerio](https://cheerio.js.org/)**, **[Puppeteer](https://pptr.dev/)** and **[RSS-Parser](https://github.com/prof18/RSS-Parser)**.
- Inspired by **[google-news-js](https://github.com/DatanewsOrg/google-news-js)**.

## License:
**[CC0 1.0 Universal](./LICENSE)**
