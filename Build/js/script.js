/*globals flipMaster*/

// load content for card flip animation
flipMaster.loadData([
    'Content 1',
    'Content 2',
    'Content 3',
    'Content 4',
    'Content 5'
]);

// initialize flip master with the appropriate DOM elements
flipMaster.init({
    cardFlip: '#card-flip',
    backBtn: '#btnB',
    forwardBtn: '#btnF',
    cardContent: '#card-content'
});