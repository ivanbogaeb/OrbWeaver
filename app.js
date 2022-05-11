const {orbWeaver} = require('./dist/orbWeaver');

let data = new orbWeaver();

(async () => {
    data.location = 'AR';
    data.language = 'es';
    console.log(await data.geo('Japon'));
})();