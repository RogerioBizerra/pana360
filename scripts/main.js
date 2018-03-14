(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function($){
    $.fn.isOnScreen = function(p){
        var $this   = $(this),
        $window = $(window);

        var windowHeight    = $(window).height();
        var scrollTop       = $(window).scrollTop();
        var top             = $(this).offset().top;
        var height          = $(this).height();

        return ((scrollTop + windowHeight - p) >= top && scrollTop < (top + height));
    };
})(jQuery);

var IsMobile = {
    ANDROID:    navigator.userAgent.match(/Android/i),
    BLACKBERRY: navigator.userAgent.match(/BlackBerry/i),
    IOS:        navigator.userAgent.match(/iPhone|iPad|iPod/i),
    OPERA:      navigator.userAgent.match(/Opera Mini/i),
    WINDOWS:    navigator.userAgent.match(/IEMobile/i)
};

IsMobile.any = function() {
    return (IsMobile.ANDROID || IsMobile.BLACKBERRY || IsMobile.IOS || IsMobile.OPERA || IsMobile.WINDOWS) || window.innerWidth < 1024;
};

var Players = {};
!(function(window, document, undefined){
    'use strict';
    var $window = $(window),
    wW = $window.width(),
    wH = $window.height();


    Player.load(function(){
        $('[data-video-id]').each(function(){
            var videoID = $(this).attr('data-video-id');

            Players[videoID] = new Player(this, videoID);

            Players[videoID].on('playing', function(){
                var $player = this.$el;

                if (IsMobile.any()) {
                    $('.cover-mp4[data-video-play="'+videoID+'"]').hide();
                }
            });

            Players[videoID].on('paused', function(){
                var $player = this.$el;

                if (IsMobile.any()) {
                    $('.cover-mp4[data-video-play="'+videoID+'"]').show();
                }
            });

            Players[videoID].on('ended', function(){

                this.trigger('paused');
            });
        });

        $('[data-video-play]').on('click', function(){
            var videoID = $(this).attr('data-video-play');

            for (var i in Players) {
                Players[i].pause();
            }

            Players[videoID].play();
        });
    });

    $('#wrapper-white-line .slider-pages')
        .off('beforeChange')
        .on('beforeChange', function(event, slick, currentSlide, nextSlide){
            for (var i in Players) {
                Players[i].pause();
            }
        }).slick({
            infinite: false,
            swipe: false,
            accessibility: false,
            arrows: false,
            fade: true
        });

    $('.menu-white-line ul li a').on('click', function(){
        var target = $(this).attr('data-page-index');

        $(this).parent().addClass('active').siblings().removeClass('active');
        $('#wrapper-white-line .slider-pages').slick('slickGoTo', target);
    });

    $('#container-360-laundry, #container-360').on('click', function(){
        var text180 = $(this).siblings('div.text-180-icon');



        TweenLite.to(text180, .4, {opacity: 0, onComplete: function(){
            TweenLite.set(text180, {display: 'none'});
        }});
    });

    if (IsMobile.any()) {
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');

        // $('.content-modal').each(function(i){
        //     new Scroller($(this), $('.scroll-container').eq(0));
        // });
        new Scroller($('.content-modal'), $('.scroll-container'));
    }

    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $('body').addClass('mac');
    }

    Pace.on('done', function(){
        var overlayPace = $('.overlay-pace');

        TweenLite.to(overlayPace, .3, {opacity: 0, onComplete: function(){
            TweenLite.set(overlayPace, {display: 'none'});
        }});

        if (wW >= 1025) {
            Animator.onScroll();
        }
    });

    $('.btn-share').on('click', function(){
        var url = window.location.href;
        Share.facebook(url);
    });

    //Abrir modal
    $('#wrapper-white-line [data-open-modal]').on('click', function(){
        var target = $(this).attr('data-open-modal');
        openModal(target);
    });

    //Fechar modal
    $('#wrapper-white-line .close-modal').on('click', function(){
        var modal = $('#wrapper-white-line .modal');
        var modalItem = $('#wrapper-white-line .modal .item-modal');

        for (var i in Players) {
            Players[i].pause();
        }

        $('#wrapper-white-line main').removeClass('content-blur');

        TweenLite.to(modal, .4, {opacity:0, onComplete: function(){
            slickOff();
            modalItem.removeClass('modal-active');
            TweenLite.set(modal, {display:'none'});
            TweenLite.set(modalItem, {display:'none'});
        }});
    });

    // Modal Zoom
    $('[data-open-zoom]').on('click', function(e){
        var index = $(this).attr('data-open-zoom');
        var target = $(this).parent().index();

        //Joga para conteudo certo dentro do modal
        $('.modal-active .slider-content-modal').slick('slickGoTo', index);

        //Caso tenha slider no ConteÃºdo de Zoom inicia o slick e ja vai para o slide certo
        if($('.modal-active .slider-content-modal .slider-zoom').length) {
            $('.modal-active .slider-content-modal .slick-active .slider-zoom').slick('slickGoTo', target);
        }

        graphicsTitle();
    });

    $('.btn-back').on('click', function(){
        $('.modal-active .slider-content-modal').slick('slickGoTo', 0);

        for (var i in Players) {
            Players[i].pause();
        }
    });

    $('[data-video-play]').on('click', function(){
        var videoID = $(this).attr('data-video-play');

        for (var i in Players) {
            Players[i].pause();
        }

        Players[videoID].play();
    });

    $window.on('resize', function(){
        if($('.modal-active').length) {
            graphicsTitle();
        }
    });
})(window, document, undefined);

//calcula grafismo do titulo do modal
function graphicsTitle() {
    $('.box-title-modal h3').each(function() {
        var wTitle = $(this).width();
        var leftGraphics = wTitle + 15;

        $(this).siblings('.graphics-title').css('left', leftGraphics);
    });

}

//Abrir modal
function openModal(i) {

    setTimeout(function(){
        var modal = $('#wrapper-white-line .modal');
        var modalItem = $('#wrapper-white-line .modal .item-modal');
        var modalItemTarget = $('#wrapper-white-line .modal [data-modal="'+i+'"]');

        $('#wrapper-white-line main').addClass('content-blur');

        /*for (var i in Players) {
            Players[i].play();
        }*/

        modalItem.removeClass('modal-active');
        modalItemTarget.addClass('modal-active');

        TweenLite.set(modalItem, {display:'none'});
        TweenLite.set(modalItemTarget, {display:'block'});

        graphicsTitle();

        TweenLite.set(modal, {display:"block", onComplete: function(){
            graphicsTitle();
            slickOn();
            $('.modal-active .slider-content-modal').slick('setPosition');
            TweenLite.to(modal, .4, {opacity:1});

        }});
    }, 250);
}

//inicia slick no modal
function slickOn() {
    if($('.modal-active .slider-content-modal .slider-zoom').length) {
        $('.modal-active .slider-content-modal .slider-zoom')
            .off('beforeChange')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                for (var i in Players) {
                    Players[i].pause();
                }
            })
            .slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        });
    }

    if($('.modal-active .slider-content-modal').length) {
        $('.modal-active .slider-content-modal')
            .off('beforeChange')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                $('.box-scroll-modal').hide();
                $('.box-scroll-modal').eq(nextSlide).show();

                for (var i in Players) {
                    Players[i].pause();
                }
            })
            .slick({
            infinite: false,
            swipe: false,
            accessibility: false,
            arrows: false,
            fade: true,
            adaptiveHeight: true
        });
    }

    if($('.modal-active .slider-thumb-videos').length) {
        $('.modal-active .slider-thumb-videos')
            .off('beforeChange')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                for (var i in Players) {
                    Players[i].pause();
                }
            })
            .slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
    }

    if($('.modal-active .slider-thumb-photos').length) {
        $('.modal-active .slider-thumb-photos')
            .off('beforeChange')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                for (var i in Players) {
                    Players[i].pause();
                }
            })
            .slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
    }

    if($('.modal-active .slider-thumb-lines').length) {
        $('.modal-active .slider-thumb-lines')
            .off('beforeChange')
            .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                for (var i in Players) {
                    Players[i].pause();
                }
            })
            .slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
    }

    $(window).trigger('resize');
}

//Destroi slick do modal
function slickOff() {
    if($('.modal-active .slider-content-modal .slider-zoom').length) {
        $('.modal-active .slider-content-modal .slider-zoom').slick('unslick');
    }

    if($('.modal-active .slider-content-modal').length) {
        $('.modal-active .slider-content-modal').slick('unslick');
    }

    if($('.modal-active .slider-thumb-videos').length) {
        $('.modal-active .slider-thumb-videos').slick('unslick');
    }

    if($('.modal-active .slider-thumb-photos').length) {
        $('.modal-active .slider-thumb-photos').slick('unslick');
    }

    if($('.modal-active .slider-thumb-lines').length) {
        $('.modal-active .slider-thumb-lines').slick('unslick');
    }
}
