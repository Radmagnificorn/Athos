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

    static saveChapter(chapter) {

        chapter.name = chapter.title || chapter.name;

        // if no id call create route instead of update
        let saveMethod = chapter.id ? 'PUT' : 'POST';

        return fetch(this.baseUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: saveMethod,
            body: JSON.stringify(chapter)
        });
    }

    static deleteChapter(id) {
        return fetch(this.baseUrl + id, {method: 'DELETE'});
    }

}