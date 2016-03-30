/*globals jQuery, document*/

var flipMaster = (function ($) {
    "use strict";
    /** 
     * Test if transition feature is available in browser
     * returns event name
     * From: https://davidwalsh.name/css-animation-callback
     */
    function whichTransitionEvent() {
        var t,
            el = document.createElement('fakeelement'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    /** 
     * If myClass = true, then return the className else add classname to flip element 
     */
    function flipForward(myClass) {
        return (myClass) ? 'f90' : $cardFlip.addClass('f90');
    }

    function flipBackward(myClass) {
        return (myClass) ? 'b90' : $cardFlip.addClass('b90');
    }

    function buttonHandler(evt) {
        var currentBtn = evt.target,
            maxLen = contentArray.length;

        // Assigns forward or backward function to flipDirection depending on which button was clicked
        flipDirection = (currentBtn.id === 'btnF') ? flipForward : flipBackward;

        // prevents back flip animation if current content is 0, or front flip if it reaches the end length of content array
        if ((pos <= 0 && flipDirection(true) === 'b90') || (pos + 1 === maxLen && flipDirection(true) === 'f90')) {
            return;
        }

        flipDirection();

        // unbind event listeners so that animation can complete if button is rapidly clicked
        $backBtn.unbind('click', buttonHandler);
        $forwardBtn.unbind('click', buttonHandler);
    }

    function disableAnimation(className) {
        classToggle = (className === 'f90') ? 'b90' : 'f90';
        $cardFlip.addClass('no-transition ' + classToggle).removeClass(className);
    }

    // Removes animation classes for the final flip transition
    function finishFlipAnimation(className) {
        classToggle = (className === 'f90') ? 'b90' : 'f90';
        $cardFlip.removeClass('no-transition ' + classToggle);
    }

    // Force reflow/repaint of an element so the animations after this function call will work properly
    function triggerReflow() {
        $cardFlip.outerHeight();
    }

    function insertContent(content) {
        $cardContent.html(content);
    }

    // gets the content from the content array
    function getContent() {
        // check which button was clicked then update content position back or forward (in contentArray)
        var updatePos = (flipDirection(true) === 'f90') ? pos++ : pos--;

        var content = contentArray.filter(function (e, i) {
            return (i === pos);
        });
        return content[0];
    }

    function animationEndHandler(evt) {
        if (count >= 1) {
            // This will run on the second "TransitionEnd" event 
            // when the "finishFlipAnimation()" is done
            count = 0; // reset counter

            // bind button listeners when animation is fully completed
            $backBtn.bind('click', buttonHandler);
            $forwardBtn.bind('click', buttonHandler);
            return;
        } else {
            // This will run on the first "TransitionEnd" event (at 90 degrees)
            disableAnimation(flipDirection(true));
            insertContent(getContent());
            triggerReflow();
            finishFlipAnimation(flipDirection(true));
        }
        count++;
    }

    // load data from array
    function loadData(data) {
        for (var i = 0; i < data.length; i++) {
            contentArray.push(data[i]);
        }
    }

    // initialize script
    function init(opts) {
        // cache references to the DOM elements 
        $cardFlip = $(opts.cardFlip);
        $backBtn = $(opts.backBtn);
        $forwardBtn = $(opts.forwardBtn);
        $cardContent = $(opts.cardContent);

        // load initial content
        insertContent(contentArray[0]);

        // listen for transition-end events
        if (transitionEvent) {
            $cardFlip.bind(transitionEvent, animationEndHandler);
        }

        // listen for clicks on back button
        $backBtn.bind('click', buttonHandler);

        // listen for clicks on forward button
        $forwardBtn.bind('click', buttonHandler);
    }

    var
        // DOM references
        $cardFlip,
        $backBtn,
        $forwardBtn,
        $cardContent,

        // private content data
        contentArray = [],

        // local vars
        transitionEvent = whichTransitionEvent(),
        flipDirection,
        classToggle,

        // counters
        count = 0,
        pos = 0,

        // module API
        publicAPI = {
            loadData: loadData,
            init: init
        };
    return publicAPI;
})(jQuery);