displaySystem.registerModule({
    name: 'sprite',
    template: `
        <div id="sprite" class="hidden"></div>
    `,
    style: `
        #sprite .sprite {
            position: absolute;
        }
    `,
    factory: function (config, onMessage) {
        var sprites = [];
        var texts = [];


        var hostAddress;

        function getElement() {
            return document.getElementById('sprite');
        }

        function show() {
            getElement().classList.remove('hidden');
            getElement().classList.add('visible');
        }

        function hide() {
            getElement().classList.add('hidden');
            getElement().classList.remove('visible');
        }

        function showSprite(index) {
            sprites[index].classList.remove('hidden');
        }

        function hideSprite(index) {
            sprites[index].classList.add('hidden');
        }

        function removeSprite(el) {
            el.parentNode.removeChild(el);
        }

        function addSprite(config) {
            let sprite = document.createElement('div');
            sprite.className = 'sprite';
            var imgSrc = config.html || `http://${window.location.hostname}:1395/${config.alias}` || '';
            var img = document.createElement('img');
            img.setAttribute("src", imgSrc);
            img.setAttribute("class", config.imgClass);
            sprite.appendChild(img);
            Object.keys(config).forEach((key) => {
                if (key === "id") {
                    sprite.id = config[key];
                }
                else {
                    sprite.style[key] = config[key];
                }
            });
            getElement().appendChild(sprite);
            return sprite;
        }
        function addText(text) {
            let element = document.createElement('span');
            element.setAttribute("class", "eventName");

            element.innerHTML = text;
            texts.push(element);

            getElement().appendChild(element);
        }
        function addTextsToArray(config) {
            texts.push.apply(texts, config);
        }
        function setText(text) {
            texts.forEach(removeSprite);
            addText(text);
        }
        function set(configSprites) {
            sprites.forEach(removeSprite);
            sprites = configSprites.map(addSprite);
        }
        if (config.data) {
            sprites = config.data;
        }
        if (config.texts) {
            config.texts.forEach(addText);
        }
        if (config.sprites) {
            set(config.sprites);
        }
        if (config.visible) {
            show();
        }

        return {
            show,
            hide,
            showSprite,
            hideSprite,
            setText,
        };
    }
});
