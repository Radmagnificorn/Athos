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
        return this.fetchJson(this.baseUrl + id, {credentials: 'include'});
    }

    static findAll() {
        return this.fetchJson(this.baseUrl, {credentials: 'include'});
    }

    static fetchJson(url) {
        return fetch(url, {credentials: 'include'}).then(response => response.json());
    }

    static savePage(chapterId, file) {
        let formData = new FormData();

        formData.append('uploadfile', file);

        return fetch(this.baseUrl + chapterId + '/new_page', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json, */*'
            },
            credentials: 'include'
        });
    }

    static saveChapter(chapter) {

        chapter.name = chapter.title || chapter.name;

        // if no id call create route instead of update
        let saveMethod = chapter.id ? 'PUT' : 'POST';
        let optionalId = chapter.id || '';

        return fetch(this.baseUrl + optionalId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: saveMethod,
            body: JSON.stringify(chapter),
            credentials: 'include'
        });
    }

    static deleteChapter(id) {
        return fetch(this.baseUrl + id, {method: 'DELETE', credentials: 'include'});
    }

}