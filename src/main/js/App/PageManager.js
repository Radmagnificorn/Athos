import Utils from './Utils.js';

export default class PageManager {
    constructor(baseDir, chapterUrl, pageNo) {
        this.baseDir = baseDir;
        this.pageDir = chapterUrl ? chapterUrl : '';
        this.currentPage = pageNo ? pageNo : 0;
        this.loadChapter(this.pageDir, pageNo);
    }

    addRenderer(displayRenderer) {
        this.renderer = displayRenderer;
    }

    render() {
        if (this.renderer) {
            this.renderer.render(this.getPageUrl());
        }

        this.pushCurrentState();
    }

    next() {
        if (this.currentPage < this.pages.length-1) {
            this.currentPage++;
            this.render();
        } else {
            if (this.nextChapter) {
                this.loadChapter(this.nextChapter, 'first');
            }
        }
        return this.getPageUrl();
    }

    previous() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.render();
        } else {
            if (this.prevChapter) {
                this.loadChapter(this.prevChapter, 'last');
            }
        }
        return this.getPageUrl();
    }

    pushCurrentState() {
        history.pushState(
            {
                chapter: this.pageDir,
                page: this.currentPage
            },
            null,
            `#${this.pageDir}~${this.currentPage}`
        );
    }

    loadChapter(chapterUrl, page) {
        Utils.loadChapterManifest(this.baseDir + "/" + chapterUrl).then((manifest) => {
            this.pageDir = chapterUrl;
            this.nextChapter = manifest.nextChapter;
            this.prevChapter = manifest.prevChapter;
            this.pages = manifest.pages;

            let pageInt = parseInt(page);
            if (pageInt) {
                this.currentPage = pageInt;
            } else {
                switch (page) {
                    case "first":
                        this.currentPage = 0;
                        break;
                    case "last":
                        this.currentPage = manifest.pages.length-1;
                        break;
                    default:
                        this.currentPage = 0;
                }
            }

            this.render();
        });
    }

    getChapterPath() {
        return this.baseDir + "/" + this.pageDir ;
    }

    getPageUrl() {
        return this.getChapterPath() + "/" + this.pages[this.currentPage];
    }

}
