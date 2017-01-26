export default class DisplayControl {
    constructor(target, properties) {
        this.properties = properties;
        target.style.position = 'relative';
        this.panel = target;
    }

    createImageDisplay(path) {
        let props = this.properties;
        let imageDisplay = document.createElement('img');
        imageDisplay.style.display = 'block';
        imageDisplay.style.height = props.height;
        imageDisplay.style.width = props.width;
        imageDisplay.style.position = 'absolute';
        imageDisplay.style.top = '0';
        imageDisplay.style.left = '0';
        imageDisplay.src = path;

        let loadedPromise = new Promise(function (resolve) {
            imageDisplay.addEventListener("loaded", function () {resolve();}, false);
        });

        return {component: imageDisplay, loaded: loadedPromise};
    }

    createVideoDisplay(path) {
        let props = this.properties;
        let videoDisplay = document.createElement('video');
        videoDisplay.style.display = 'block';
        videoDisplay.style.height = props.height;
        videoDisplay.style.width = props.width;
        videoDisplay.style.position = 'absolute';
        videoDisplay.style.top = '0';
        videoDisplay.style.left = '0';
        videoDisplay.loop = props.loopVideo ? props.loopVideo : true;
        videoDisplay.autoplay = props.autoplayVideo ? props.autoplayVideo : true;
        videoDisplay.src = path;

        let loadedPromise = new Promise(function (resolve) {
            videoDisplay.addEventListener("loadeddata", function () {resolve();}, false);
        });

        return {component: videoDisplay, loaded: loadedPromise};
    }

    render(url) {
        let pageExt = this.getExtension(url);
        let display;
        switch (pageExt) {
            case "png":
                display = this.createImageDisplay(url);
                break;
            case "mp4":
                display = this.createVideoDisplay(url);
                break;
            default:
                alert("File type not supported: " + pageExt);
        }

        let oldDisplay = this.currentDisplay;
        this.currentDisplay = display;

        this.panel.appendChild(this.currentDisplay.component);

        this.currentDisplay.loaded.then( function () {
            if (oldDisplay) {
                oldDisplay.component.remove();
            }
        });
    }

    getExtension(url) {
        let extPattern = /\.[0-9a-z]+$/;
        let extMatches = url.match(extPattern);
        let extension = '';
        if (extMatches) {
            extension = extMatches[0].substr(1);
        }
        return extension;
    }

}
