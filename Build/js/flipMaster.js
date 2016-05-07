/*globals jQuery, document*/ /* jshint -W030  */

var flipMaster = (function ($, document) {
    "use strict";
    
    var
        // DOM references
        $cardFlip,
        $backBtn,
        $forwardBtn,
        $cardContent,

        // private content data
        contentArray = [],
        
        // module API
        publicAPI,

        // local vars
        transitionEvent = whichTransitionEvent(),
        flip,
        classToggle,
        infiniteFlip = false,

        // counters
        count = 0,
        pos = 0;
    
    /** 
     * Test if transition feature is available in browser returns event name
     * From: https://davidwalsh.name/css-animation-callback
     *
     * @return {string} event name available in browser
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
     * Returns class name or adds class to flip element
     *
     * @param {boolean} [getClassName] - true to get class name false/undefined to add class
     * @return {string} className if getClassName argument is passed
     */
    function flipForward(getClassName) {
        return (getClassName) ? 'f90' : $cardFlip.addClass('f90');
    }
    
    /** 
     * Returns class name or adds class to flip element
     *
     * @param {boolean} [getClassName] - true to get class name false/undefined to add class
     * @return {string} className if getClassName argument is passed
     */
    function flipBackward(getClassName) {
        return (getClassName) ? 'b90' : $cardFlip.addClass('b90');
    }
    
    /** 
     * Button handler 
     */
    
    function buttonHandler(evt) {

        var currentBtn = evt.target,
            maxLen = contentArray.length;

        // Assigns forward or backward function to flip depending on which button was clicked
        flip = (currentBtn.id === 'btnF') ? flipForward : flipBackward;

        if (infiniteFlip) {
            // infinite flips
            if (flip(true) === 'f90' && pos + 1 === maxLen) {
                pos -= maxLen;
            } else if (flip(true) === 'b90' && pos - 1 <= 0) {
                pos = maxLen;
            }
        } else {
            // prevents back flip animation if current content is 0, or front flip if it reaches the end length of content array
            if ((pos <= 0 && flip(true) === 'b90') ||
                (pos + 1 === maxLen && flip(true) === 'f90')) {
                return;
            }
        }

        flip();

        // unbind event listeners until animation is complete
        $backBtn.unbind('click', buttonHandler);
        $forwardBtn.unbind('click', buttonHandler);
    }
    
    /** 
     * Disable animation on an element
     *
     * @param {string} className - class name
     */
    function disableAnimation(className) {
        classToggle = (className === 'f90') ? 'b90' : 'f90';
        $cardFlip.addClass('no-transition ' + classToggle).removeClass(className);
    }
    
    /** 
     * Removes animation classes for the final flip transition
     *
     * @param {string} className - current classname to be removed
     */
    function finishFlipAnimation(className) {
        classToggle = (className === 'f90') ? 'b90' : 'f90';
        $cardFlip.removeClass('no-transition ' + classToggle);
    }
    
    /** 
     * Force reflow/repaint of an element so the animations after this function call will work properly 
     */
    function triggerReflow() {
        $cardFlip.outerHeight();
    }
    
    /** 
     * Insert content into card content element
     *
     * @param {string|HTMLElement} content - string or DOM element to be inserted in card content
     */
    function insertContent(content) {
        $cardContent.html(content);
    }
    
    /** 
     * Gets the content from the content array
     *
     * @return {string|HTMLDivElement} returns an element or string from the content array
     */ 
    function getContent() {
        // check which button was clicked then update content position back or forward (in contentArray)
        (flip(true) === 'f90') ? pos++ : pos--;

        return contentArray.filter(function (e, i) {
            return (i === pos);
        })[0];
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
            var content = getContent(),
                flipClass = flip(true);
            disableAnimation(flipClass);
            insertContent(content);
            triggerReflow();
            finishFlipAnimation(flipClass);
        }
        count++;
    }
    
    /** 
     * load data from array
     *
     * @param {object} data - array of elements or strings to be stored in an internal array
     */
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

        infiniteFlip = opts.infiniteFlip;

        // load initial content
        insertContent(contentArray[0]);

        // listen for transition-end events
        transitionEvent && $cardFlip.bind(transitionEvent, animationEndHandler);
        
        // listen for clicks on back button
        $backBtn.bind('click', buttonHandler);

        // listen for clicks on forward button
        $forwardBtn.bind('click', buttonHandler);
    }

 
    publicAPI = {
        loadData: loadData,
        init: init
    };
    
    return publicAPI;
    
})(jQuery, document);