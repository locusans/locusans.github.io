(function ($) {
    'use strict';
    var Accordion = function (elm, options) {
        var self,
            $this = $( elm ),
            $items = $( '[data-rt-accordion-item]', $this ),
            $header = $( 'header', $items ),
            slideItem = function ( direction, $item ) {
                if ( direction == 'up' ) {
                    $item
                        .removeClass( 'active' )
                        .find( '.content' )
                        .slideUp().end()
                        .find( 'header span' )
                        .removeClass( 'wicon-iconmonstr-minus-thin' )
                        .addClass( 'wicon-iconmonstr-plus-thin' );
                } else if ( direction == 'down' ) {
                     if ( options.toggle ) {
                        $items
                            .removeClass( 'active' )
                            .find( '.content' )
                            .slideUp().end()
                            .find( 'header span' )
                            .removeClass( 'wicon-iconmonstr-minus-thin' )
                            .addClass( 'wicon-iconmonstr-plus-thin' );
                     }
                     $item.addClass( 'active' )
                        .find( '.content' )
                        .slideDown().end().
                        find( 'header span' )
                        .removeClass( 'wicon-iconmonstr-plus-thin' )
                        .addClass( 'wicon-iconmonstr-minus-thin' );
               }
            },
            init = function () {
                $items.find( '.content' ).hide();
                $( '<span class="wicon-iconmonstr-plus-thin"></span>' ).appendTo( $header );
                if ( options.active ) {
                    $items
                    .eq( options.active )
                    .addClass( 'active' )
                    .find( '.content' )
                    .show().end()
                    .find( 'header span' )
                    .removeClass( 'wicon-iconmonstr-plus-thin' )
                    .addClass( 'wicon-iconmonstr-minus-thin' );
                }
                $header.on( 'click', function () {
                    var $item = $( this ).parents( '[data-rt-accordion-item]' );
                    if ( $item.hasClass( 'active' ) ) {
                        slideItem( 'up', $item );
                    } else {
                        slideItem( 'down', $item );
                    }
                } );
            };
        self = {
            init: init
        };
        return self;
    };
    $.fn.rtAccordion = function (opt) {
        return this.each(function () {
            var accordion;
            if (!$(this).data('rtAccordion')) {
                accordion = new Accordion(this, $.extend(true, {
                    active: ( $(this).data('rt-accordion-active') === undefined ) ? 0 : $(this).data('rt-accordion-active') - 1,
                    toggle: ( $(this).data('rt-accordion-toggle') === undefined ) ? 0 : $(this).data('rt-accordion-toggle'),
                }, opt));
                accordion.init();
                $(this).data('rtAccordion', accordion);
            }
        });
    };
    var $rtAccordion = $( '[data-rt-accordion]' );
    if ( $rtAccordion.length ) {
        $rtAccordion.rtAccordion();
    }
}(jQuery));
(function ($) {
    'use strict';
    var Countdown = function (elm, options) {
        var
            // Vars

            self,
            $this = $( elm ),
            str = $this.data( 'rt-countdown' ),
            opts = [],
            endDate, today,
            timer_is_on = 0,
            $daysValue = $( '[data-rt-countdown-days] .value', $this ),
            $hoursValue = $( '[data-rt-countdown-hours] .value', $this ),
            $minsValue = $( '[data-rt-countdown-minutes] .value', $this ),
            $secsValue = $( '[data-rt-countdown-seconds] .value', $this ),
            dividers = new Array(86400, 3600, 60, 1), rest, t,
            values = new Array( $daysValue, $hoursValue, $minsValue, $secsValue ),

            // Methods

            convert = function ( element ) {
                opts.push( parseInt( element, 10 ) );
            },
            changeTime = function () {
                today = new Date();
                rest = ( endDate - today ) / 1000;
                for ( var i = 0; i < dividers.length; i++ ) {
                    values[i].html( Math.floor( rest / dividers[i] ) );
                    rest = rest % dividers[i];
                }
                t = setTimeout( changeTime,1000 );
            },
            init = function () {
                str.split( ':' ).map( convert );
                endDate = new Date( opts[0], opts[1] - 1, opts[2], opts[3], opts[4], opts[5] );
                if ( ! timer_is_on ) {
                    timer_is_on = 1;
                    changeTime();
                }
            };
        self = {
            init: init
        };
        return self;
    };
    $.fn.rtCountdown = function( opt ) {
        return this.each( function () {
            var countdown;
            if ( ! $( this ).data( 'rtAccordion' ) ) {
                countdown = new Countdown( this, opt );
                countdown.init();
                $( this ).data('rtAccordion', countdown);
            }
        } );
    };
    var $rtCountdown = $( '[data-rt-countdown]' );
    if ( $rtCountdown.length ) {
        $rtCountdown.rtCountdown();
    }
} ( jQuery ) );