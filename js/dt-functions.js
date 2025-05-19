
$(window).on('scroll', function () {
    $('.section').each(function () {
        var $this = $(this),
            rotator = $this.find('.rotator'),
            $window = $(window),
            a = $this.offset().top,
            b = $this.outerHeight(),
            c = $window.height(),
            d = $window.scrollTop();

        if (c + d > a + b) {
            $this.addClass('bottom');
        }

        if (c + d > a) {
            if (!$this.hasClass('displayed')) {
                $this.find('.section-image').removeClass('unloaded');
                $this.removeClass('unloaded');
                $this.addClass('displayed');

                if (rotator.length > 0) {
                    rotator.slick({
                        slidesToShow: 1,
                        center: true,
                        arrows: true,
                        lazy: 'progressive',
                        touchThreshold: 5000
                    });
                }
            }
        }
    });

    if ($(window).scrollTop() == 0) {
        $('#site-header').addClass('top');
    } else {
        $('#site-header').removeClass('top');
    }
});

$(document).ready(function() {

    $(".main-nav").clickMenu({});

    if ($(window).scrollTop() == 0) {
        $('#site-header').addClass('top');
    } else {
        $('#site-header').removeClass('top');
    }

    $(this).scrollTop(0);

    $(".jump-links a[href^='#']").on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr("href");
        if (url.length > 1 && $(url).length > 0) {
            $('html, body').animate({
                scrollTop: $(url).offset().top-78
                }, 300, function(){
                window.location.hash = url;
            });
            console.log(url);
        }
        $('li[id="' + url.substr(1) + '"]').each(function(){
            $(this).find('.btn-toggle:not([aria-expanded="true"])').trigger('click');
        });
    });
});