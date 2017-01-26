export default class Utils {
    constructor() {}

    static loadChapterManifest(url) {
        return new Promise(function (resolve) {
            let request = new XMLHttpRequest();
            request.open('GET', url + '/manifest.json', true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    console.log("unable to load chapter manifest");
                }
            };

            request.onerror = function () {
                console.log("error retrieving manifest from server");
            };

            request.send();
        });
    }

    static getPageFromUrl(url) {
        let page = null;
        let locString = url.split('#')[1];
        if (locString) {
            let parsedLoc = locString.split('~');
            page = {
                chapter: parsedLoc[0],
                page: parsedLoc[1]
            }
        }

        return page;
    }

}