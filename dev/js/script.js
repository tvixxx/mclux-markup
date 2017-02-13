(function(global){

    $(document).ready(function(){
        var $rootPageContainer = $('.js-root');
        var $hamburger = $('#nav-icon');
        var $menuList = $('.js-navigation-list');
        var $phoneInputField = $('.js-input-phone-field');
        var OPEN_CLASS = 'open';
        var ACTIVE_CLASS = 'active';
        var NON_ANIMATION_CLASS = 'non-animation';
        var MOBILE_WIDTH = 768;
        var MOBILE_OFFSET_FROM_TOP = 48;
        var DESKTOP_OFFSET_FROM_TOP = 145;
        var windowWidth = window.innerWidth;

        if (windowWidth <= MOBILE_WIDTH) {
            $rootPageContainer.addClass(NON_ANIMATION_CLASS);
        } else {
            $rootPageContainer.removeClass(NON_ANIMATION_CLASS);
        }

        $hamburger.on('click', toggleMenu);
        $phoneInputField.on('keypress', validateNumber);

        function toggleMenu(e) {
            e.preventDefault();

            $(this).toggleClass(OPEN_CLASS);
            $menuList.toggleClass(ACTIVE_CLASS);
        }

        $(window).on('load', function() {
            var $navButtons = $('.js-anchor-link');
            var hashName = location.hash;
            var headerHeight;

            if (hashName) {
                var $aimSection = $('.js-hash-elem').filter('[data-hash="' + hashName + '"]');
                var aimScrollPosition = $aimSection.offset().top;
                var mcLuxHeaderHeight = 80;
                $(window).scrollTop(aimScrollPosition - mcLuxHeaderHeight);
            }

            $navButtons.on('click', function(event) {
                event.preventDefault();

                var $this = $(this);
                var hash  = $this.attr('href');
                var $aimSection = $('.js-hash-section').filter('[data-hash="' +  hash + '"]');

                $hamburger.removeClass(OPEN_CLASS);
                $menuList.removeClass(ACTIVE_CLASS);

                $navButtons.filter(function(index, item){
                    var $item = $(item);

                    if ($item.hasClass(ACTIVE_CLASS)) {
                        $item.removeClass(ACTIVE_CLASS);
                    }
                });

                $this.addClass(ACTIVE_CLASS);

                if (windowWidth < MOBILE_WIDTH) {
                    headerHeight = MOBILE_OFFSET_FROM_TOP;
                } else {
                    headerHeight = DESKTOP_OFFSET_FROM_TOP;
                }

                var destination = ($aimSection.offset().top) - headerHeight;

                $('body,html').animate({scrollTop: destination}, 600);
            })
        });

        function validateNumber(evt) {
            var $this = $(this);
            var theEvent = evt || window.event;
            var key = theEvent.keyCode || theEvent.which;
            var regex = /[0-9]|\./;

            key = String.fromCharCode( key );

            if( !regex.test(key) ) {

                theEvent.returnValue = false;

                if (theEvent.preventDefault) {
                    theEvent.preventDefault()
                }
            }
        }
    });

    jQuery(document).ready(function($) {

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        var $chart = $('.js-chart-item'),
            chartNr = $('.js-chart-content');

        var windowHeight = $(window).height();
        var $scrollToElemListCosts = $('.js-scroll-to-list-costs');

        if ($chart.length) {
            centerChartsNr();

            $(window).on('resize', debounce(function(){
                centerChartsNr();
            }, 250));

            $(window).on('scroll.animateChart', debounce(function(){
                animateOnScroll($scrollToElemListCosts);

                setTimeout(function(){
                    $(window).off('scroll.animateChart');
                }, 250)
            }, 250));
        }

        function centerChartsNr() {
            chartNr.css({
                top: ($chart.height() - chartNr.outerHeight()) / 2
            });
        }

        function animateChartsIsOn() {

            $.each($chart, function(index, item){

                $(item).easyPieChart({
                    scaleColor: false,
                    lineWidth: 4,
                    size: 68,
                    trackColor: '#fff',
                    lineCap: 'square',
                    animate: 2000,
                    easing: 'swing'
                });
            });
        }

        function animateOnScroll($elem){
            var top = $(window).scrollTop();
            var scrollToElemPosition = $elem.offset().top;

            if ( ((top + windowHeight) >= scrollToElemPosition) ) {
                animateChartsIsOn();
            }
        }
    });
}(window));
