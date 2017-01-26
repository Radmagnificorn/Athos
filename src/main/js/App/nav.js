"use strict";

import PageManager from './PageManager.js';
import DisplayControl from './DisplayControl.js';
import Utils from './Utils.js';

(function (document, PageManager, DisplayControl, window) {

    let comicPanel = document.getElementById("comicPanel");
    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    let dispProps = {
        loopVideo: true,
        autoplayVideo: true,
        height: '100%',
        width: '100%'
    };

    let startPage = Utils.getPageFromUrl(window.location.href) || {chapter: 'chapter1', page: 0};

    let displayControl = new DisplayControl(comicPanel, dispProps);
    let pageManager = new PageManager('./pages', startPage.chapter, startPage.page);

    pageManager.addRenderer(displayControl);

    comicPanel.addEventListener("click", function () {
        pageManager.next();
    }, false);

    prevButton.addEventListener("click", function () {
        pageManager.previous();
    }, false);

    nextButton.addEventListener("click", function () {
        pageManager.next();
    }, false);

    document.addEventListener("keyup", function (e) {
        let keycode = e.keyCode;
        if (keycode === 37) {
            pageManager.previous();
        }
        if (keycode === 39) {
            pageManager.next();
        }
    }, false);
})(document, PageManager, DisplayControl, window);
