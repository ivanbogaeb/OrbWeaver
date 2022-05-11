const langMap = require('../../../../map.json');

exports.parameters = (location:string, language:string) => {
    if (langMap[language]){
        let data = langMap[language].country;
        if (data.includes(location)){
            return `?hl=${language}&gl=${location}&ceid=${location}:${language}`
        } else {
            throw new Error("The location you are looking for doesn't exist for this language.");
        }
    } else {
        throw new Error("The language you are looking for doesn't exist.");
    };
};