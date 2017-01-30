import 'whatwg-fetch';

export default class ChapterRepository {
    static baseUrl;

    static setBaseUrl(url) {
        if (!this.baseUrl) {
            this.baseUrl = url;
        } else {
            throw "base Url can only be set once";
        }
    }

    static find(id) {
        return this.fetchJson(this.baseUrl + id);
    }

    static findAll() {
        return this.fetchJson(this.baseUrl);
    }

    static fetchJson(url) {
        return fetch(url).then(response => response.json());
    }

    static savePage(chapterId, file) {
        let formData = new FormData();

        formData.append('uploadfile', file);

        return fetch(this.baseUrl + chapterId + '/new_page', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json, */*'
            }
        });
    }
}