import Utils from './Utils.js';

export default class PageManager {
    constructor(baseDir, chapterId, pageNo) {
        this.baseDir = baseDir;
        this.currentPage = pageNo;
        this.loadChapter(chapterId, this.currentPage);
        this.chapter = {
            pages: []
        }
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
        if (this.currentPage < this.chapter.pages.length-1) {
            this.currentPage++;
            this.render();
        } else {
            if (this.chapter.nextChapter) {
                this.loadChapter(this.chapter.nextChapter, 'first');
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
                chapter: this.chapter.path,
                page: this.currentPage
            },
            null,
            `#${this.chapter.path}~${this.currentPage}`
        );
    }

    loadChapter(chapterId, page) {
        Utils.loadChapter(this.baseDir + "/" + chapterId).then((chapter) => {
            this.chapter = chapter;
            /*
            this.pageDir = chapterUrl;
            this.nextChapter = manifest.nextChapter;
            this.prevChapter = manifest.prevChapter;
            this.pages = manifest.pages;
            */

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
        return this.baseDir;
    }

    getPageUrl() {
        return this.chapter.path + "/" + this.chapter.pages[this.currentPage];
    }

}
