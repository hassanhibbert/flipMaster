# flipMaster.js

flipMaster.js is a card flip plugin utilizing jQuery and CSS3 animations to create a card flipping animation. Instead of the usual card flip animation that only goes from front to back, this has a continuous flip in either direction. New content is injected into the card between each flip. There is also an option to set the card to have infinite flips or to have the card stop from moving forward if there isn't anymore content.

__Demo:__ http://hassanhibbert.github.io/flipmaster/

### Sample Usage:

__Javascript Setup Part 1:__ Pass an array of DOM elements or string to the `flipMaster.loadData` method to populate the script with content.

```js
flipMaster.loadData([
    'Content 1',
    'Content 2',
    'Content 3',
    'Content 4',
    'Content 5'
]);
```

__Javascript Setup Part 2:__ Initialize script by passing the `selectors` with the corresponding elements for the flip animation.

```js
flipMaster.init({
    cardFlip: '#card-flip',
    backBtn: '#btnB',
    forwardBtn: '#btnF',
    cardContent: '#card-content',
    infiniteFlip: true
});
```

__Sample HTML Setup:__ 

```html
<div class="card-container">
    <div id="card-flip">
        <span id="card-content">Content</span>
    </div>
</div>

<button id="btnB" class="btn-styles"> Flip Backward </button>
<button id="btnF" class="btn-styles"> Flip Forward </button>
```

