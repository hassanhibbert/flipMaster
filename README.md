# flipMaster.js

flipMaster.js was a fun little weekend coding project utilizing jQuery, and CSS3 animations to create a card flipping animation. Instead of the usual card flipping animation that only goes from front to back, this has a continuous flip in either direction depending on how much content is provided within an array.

__Demo:__ http://hassanhibbert.github.io/flipmaster/

### Sample Usage:

__Javascript Setup Part 1:__ Pass in an array to `flipMaster.loadData` method to populate the program with information.

```js
flipMaster.loadData([
    'Content 1',
    'Content 2',
    'Content 3',
    'Content 4',
    'Content 5'
]);
```

__Javascript Setup Part 2:__ Initialize script by passing in the `selectors` with the corresponding element for flip animation

```js
flipMaster.init({
    cardFlip: '#card-flip',
    backBtn: '#btnB',
    forwardBtn: '#btnF',
    cardContent: '#card-content'
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

