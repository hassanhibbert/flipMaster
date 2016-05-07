/*globals flipMaster, jQuery*/

(function($) {

    // create DOM elements with attributes and content on-the-fly
    function createNode(element, hasElement) {
        if (hasElement === false) {
            return '';
        }
        var elemType = element.type,
            attributes = element.attr,
            innerContent = element.content,
            isString = function(element) {
                return (typeof element === 'string');
            },
            el = document.createElement(elemType);
        if (attributes) {
            Object.keys(attributes).forEach(function(attrName) {
                el.setAttribute(attrName, attributes[attrName]);
            });
        }
        if (innerContent) {
            innerContent.forEach(function(element) {
                if (isString(element)) {
                    el.appendChild(document.createTextNode(element));
                } else {
                    el.appendChild(element);
                }
            });
        }
        return el;
    }

    // request vacation data
    $.ajax({
        method: 'GET',
        url: 'vacationData.json',
        success: loadContentCard
    });

    // array that will contain content for card flip
    var cardInfoArray = [];

    // load card content on success from ajax request
    function loadContentCard(data) {
        data.forEach(function(card) {
            var imgContainer = createNode({
                type: 'div',
                attr: {class: 'img-container'},
                content: [
                    createNode({type: 'img', attr: {src: card.image_url, alt: card.title}})
                ]
            });

            var infoContent = createNode({
                type: 'div',
                attr: {class: 'info-content'},
                content: [
                    createNode({type: 'h3', content: [card.title]}),
                    createNode({type: 'p', content: [card.description]})
                ]
            });

            var infoContainer = createNode({
                type: 'div',
                attr: {class: 'info-container'},
                content: [imgContainer, infoContent]
            });

            cardInfoArray.push(infoContainer);
        });

        // load content for card flip animation
        flipMaster.loadData(cardInfoArray);

        // initialize flip master with the appropriate DOM elements
        flipMaster.init({
            cardFlip: '#card-flip',
            backBtn: '#btnB',
            forwardBtn: '#btnF',
            cardContent: '#card-content',
            infiniteFlip: true
        });
    }

})(jQuery);
