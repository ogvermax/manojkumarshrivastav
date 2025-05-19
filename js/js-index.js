$(document).ready(function () {
    mobileWorksNav();
    homepageCarousel();
    if ($('.book-detail-page').length > 0)
        bookDetailPage();
    authorPage();
    homepageContentBlocks();
    navCurrent();
    stickyNav();
    searchFunctionality();
    worksFilters();
    gridViewHeight();
    mobileNav();
    mobileSearch();
    sortWorks();
    toggleDarkMode();
    detectDarkModeSession();
    faqHandler();
    scrollToSection();
    tableGridExpander();
    expandMobileContent();
    faqLinkCopy();
    scollSidebarHightlight();
    imageZoom();
    sideBarScroll();
    ukCovers();
    formValidation();
});

$(window).resize(function () {
    gridViewHeight();
});

/*
Scrolls you to the appropriate section when a side bar link is
clicked that has a '#some_id' as an href that matches the id
of a section on the page, and the class '.scroller'. The author
and FAQ pages are examples of this.
*/
function sideBarScroll() {
    var $links = $('.sidebar .scroller')
    $links.click(function (e) {
        e.preventDefault();
        var $this = $(this);
        //If the link clicked is the top one, scroll you to the very top of the page
        if ($this[0] == $links[0]) {
            $('html, body').animate({
                scrollTop: 0
            }, 1000)
        }
        //Other wise scroll to the section with an offset of 100 to account for the sticky nav
        else {
            var $elem = $($this.attr('href'));
            $('html, body').animate({
                scrollTop: $elem.offset().top - 100
            }, 1000)
        }
    });
}

/*
Opens the image viewer modal whenever an image is clicked that has
the class .image-zoom. This can be seen on the home page by clicking
on the book covers.
*/
function imageZoom() {
    $('body').on('click', '.image-zoom', function (e) {
        e.preventDefault();
        var $this = $(this);
        if (!$('#black-out').hasClass('lightbox')) {
            $('#black-out').addClass('animate').addClass('lightbox');
            $('.image-viewer').append('<img src="' + $this.attr('src') + '"/>');

            $('.image-viewer').click(function (e) {
                e.stopPropagation();
            })

            $('.close, #black-out').click(function (e) {
                e.preventDefault();
                $('#black-out').removeClass('lightbox');
                setTimeout(function () {
                    $('#black-out').removeClass('animate');
                    $('.image-viewer').find('img').remove();
                }, 300)
            })
        }
    })
}

/*
Special functionality that opens the image viewer using a books UK cover
when the 'UK Cover' link is clicked that has the class '.uk'. This can be seen
on the home page.
*/
function ukCovers() {
    $('.uk').click(function (e) {
        e.preventDefault();
        var $this = $(this);

        $('#black-out').addClass('animate').addClass('lightbox');
        $('.image-viewer').append('<img src="' + $this.attr('src') + '"/>');

        $('.close').click(function (e) {
            e.preventDefault();
            $('#black-out').removeClass('lightbox');
            setTimeout(function () {
                $('#black-out').removeClass('animate');
                $('.image-viewer').find('img').remove();
            }, 300)
        })

    })


}

/*
Uses the waypoint.js library to detect when you have scrolled to a new section
and highlight the appropriate link in the sidebar nav. The href of the sidebar links
must match the ID of the page sections. Examples can be found on the Author page
and the FAQ page.
*/
function scollSidebarHightlight() {
    if ($('.scroller').length) {
        $('.scroller').each(function () {
            $($(this).attr('href')).addClass('scroll-section');
        })

        var $scrollSections = $(".scroll-section");

        if ($scrollSections.length) {
            $scrollSections.each(function () {
                var $this = $(this),
                    waypoint = new Waypoint({
                        element: $(this),
                        offset: 100,
                        handler: function (direction) {
                            var $links = $('.sidebar span a');
                            $links.removeClass('active');
                            $('.sidebar span a[href*="' + $this.attr('id') + '"]').addClass('active')
                        }
                    })
            })
        }
    }
}

/*
Automatically adds a link to the corresponding FAQ question when copy icon
is clicked and flashes a notice to the user.
*/
function faqLinkCopy() {
    $('.copy-link').click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this),
            $question = $this.parent().parent(),
            link = window.location.origin + window.location.pathname + "?scroll=" + $question.attr('id');

        copyToClipboard(link);

        $('.flash-notice.copied').addClass('flash');

        setTimeout(function () {
            $('.flash-notice.copied').removeClass('flash');
        }, 5000)
    })
}

/*
Adds functionality to reveal more content when at mobile sizes and the copy
is very long. This is implemented on the Author page in the biography section.
*/
function expandMobileContent() {
    $('.expand-content').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            $about = $this.parent().parent();

        $about.addClass('expanded');
        $about.find('.mobile-expand').slideDown(function () {
            $(this).css('display', 'block');
        });
    })
}

/*
Listens for a change in the works-nav select form and then changes the page
based on the selection. Only visible on mobile on the works page, and works
subpages.
*/
function mobileWorksNav() {
    if ($("#works-nav").length) {
        $("#works-nav").change(function () {
            var value = $(this).find("option:selected").val();

            //automatically take the user to the list view instead of the grid view when
            //written-works is selected
            if (value == "written-works") {
                window.location = '/works'
            }
            //otherwise use the value of the <option> tag as a page url
            else {
                window.location = value
            }

        });

        //Set the value of the select to the current page on page load.
        var url = window.location.href.replace(/\/$/, ""),
            location = url.substring(url.lastIndexOf('/') + 1);

        if (location == "works-grid" || location == "works-list") {
            $("#works-nav").val("written-works");
        } else {
            $("#works-nav").val(location);
        }

    }

}

/*
Automatically scroll to a given section when a 'scroll' url parameter is present
and matches a corresponding element ID. An example of this can be seen when 'Presskit'
is clicked in the footer.
*/
function scrollToSection() {
    var section = getUrlParameter('scroll');
    if (section) {
        var $elem = $("#" + section);

        $('html, body').animate({
            scrollTop: $elem.offset().top - 100
        }, 1000, function () {
            $elem.addClass('open')
            $elem.find('.answer').slideDown();
        })
    }
}

/*
Utility function to grab a given url parameter. Used in automatically scrolling
to page sections on page load.
*/
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        } else
            return false
    }
};

/*
Opens and closes a clicked FAQ question
*/
function faqHandler() {
    $('.question-wrapper').click(function () {
        var $this = $(this);
        if ($this.hasClass('open')) {
            $('.question-wrapper').removeClass('open');
            $('.answer').slideUp();
        } else {
            $('.question-wrapper').removeClass('open');
            $('.answer').slideUp();
            $this.addClass('open');
            $this.find('.answer').slideDown();
        }
    })

}

/*
Detects if the user has a preference set to use "darkmode", and
detects if the user has interacted with our darkmode toggle
to load the appropriate version of the site on page load.
*/
function detectDarkModeSession() {
    //detect user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $('html').addClass('dark')
    }

    //detect if the user has set a preference using our dark mode toggle
    if (sessionStorage.getItem("mode") == "dark") {
        $('html').addClass('dark')
    } else if (sessionStorage.getItem("mode") == "light") {
        $('html').removeClass('dark')
    }
}

/*
Switches the site between dark and light mode when the tower is clicked.
Mostly just animation timings, but additionally we set a session storage item
to keep track of the user's preference. This gets reset when the page closes.
*/
function toggleDarkMode() {

    $("#darkMode").click(function (e) {
        e.preventDefault();
        if (!$('#darkMode').hasClass('disable')) {
            var $circleWipe = $('#circleWipe'),
                $wipeWrapper = $('#wipeWrapper'),
                isDark = $('html').hasClass('dark'),
                $darkMode = $('#darkMode');

            if (isDark) {
                $circleWipe.addClass('light')
            } else {
                $circleWipe.addClass('dark')
            }
            $darkMode.addClass('disable');
            disableScrolling();
            $circleWipe.addClass('show');
            $circleWipe.addClass('wipe');
            $darkMode.addClass('anchor');
            $wipeWrapper.css({
                height: $('body').height()
            })
            $wipeWrapper.addClass('expand');
            setTimeout(function () {
                $('html').toggleClass("dark")
            }, 750)

            setTimeout(function () {
                $circleWipe.addClass('fade');
            }, 850)

            setTimeout(function () {
                if (isDark) {
                    $circleWipe.removeClass('light')
                } else {
                    $circleWipe.removeClass('dark')
                }
                if ($('html').hasClass("dark")) {
                    sessionStorage.setItem("mode", "dark");
                } else {
                    sessionStorage.setItem("mode", "light");
                }
                $circleWipe.removeClass('show');
                $circleWipe.removeClass('wipe');
                $circleWipe.removeClass('fade');
                $darkMode.removeClass('anchor');
                $darkMode.removeClass('disable');
                enableScrolling();
                $wipeWrapper.attr('style', '');
                $wipeWrapper.removeClass('expand');
            }, 1300)
        }

    })
}

/*
Utility function to temporarily disable scroll while we are
switching toggling light/dark mode.
*/
function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(x, y);
    };
}

/*
Utility function to re-enable scrolling after animation has finished.
*/
function enableScrolling() {
    window.onscroll = function () {
    };
}

/*
Uses the tinysort.js library to sort the works list/grid
based on either title or date.
*/
function sortWorks() {
    $('.AtoZ').click(function(){
        tinysort('a.work',{data:'sort', order:'asc'});
        tinysort('div.bibliography-section',{data:'sort', order:'asc'});
        $('.active-sort').text(" - " + $(this).text());
        $('.sort-mobile .toggle-title').text($(this).text());
    })
    $('.ZtoA').click(function(){
        tinysort('a.work',{data:'sort', order:'desc'});
        tinysort('div.bibliography-section',{data:'sort', order:'desc'});
        $('.active-sort').text(" - " + $(this).text());
        $('.sort-mobile .toggle-title').text($(this).text());
    })
    $('.NewtoOld').click(function(){
        tinysort('a.work',{data:'date', order:'desc'});
        tinysort('div.bibliography-section',{data:'date', order:'desc'});
        $('.active-sort').text(" - " + $(this).text());
        $('.sort-mobile .toggle-title').text($(this).text());
    })
    $('.OldtoNew').click(function(){
        tinysort('a.work',{data:'date', order:'asc'});
        tinysort('div.bibliography-section',{data:'date', order:'asc'});
        $('.active-sort').text(" - " + $(this).text());
        $('.sort-mobile .toggle-title').text($(this).text());
    })
}


/*
Toggles the mobile nav drawer.
*/
function mobileNav() {
    $('.mobile-nav').click(function () {
        $('#mobile-nav-drawer, .mobile-nav').toggleClass('open');
        $('#mobile-search-drawer, .searchIconWrapper').removeClass('open');

        function enableScroll() {
            window.onscroll = function () {
            };
        }

        function disableScroll() {
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();

            window.onscroll = function () {
                window.scrollTo(scrollLeft, scrollTop);
            };
        }

        if ($('#mobile-nav-drawer').hasClass("open")) {
            disableScroll();
        } else {
            enableScroll();
        }
    });
}

/*
Toggles the mobile search drawer.
*/
function mobileSearch() {
    $('.searchIconWrapper').click(function () {
        $('#mobile-search-drawer, .searchIconWrapper').toggleClass('open');
        $('#mobile-nav-drawer, .mobile-nav').removeClass('open');
    });
}

/*
Sticks the top nav to the top of page after 85px of scrolling,
and sticks the sidebar when the top of that element is reached.
*/
function stickyNav() {
    var $nav = $('#sticky-nav');

    if ($('.sidebar').length) {
        var $sideNav = $('.sidebar'),
            $sideNavSpacer = $('.sidebar-spacer'),
            sideNavScrollTop = $sideNav.offset().top;

        $sideNavSpacer.css({
            height: $sideNav.height()
        })
        $sideNav.css({
            width: $sideNav.width()
        })
        if ($(window).scrollTop() > 90) {
            $sideNavSpacer.addClass('show')
            $sideNav.addClass('stuck');
        }
    }

    if ($(window).scrollTop() > 85) {
        $nav.addClass('stuck')
    }

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop(),
            width = $(window).width();

        if (scroll > 85 || width < 990) {
            $nav.addClass('stuck')
        } else {
            $nav.removeClass('stuck')
        }
        if (scroll <= sideNavScrollTop) {
            $sideNavSpacer.removeClass('show')
            $sideNav.removeClass('stuck');
        }

        //This is using the waypoint.js to determine when to stick the sidebar nav
        if ($('.sidebar').length) {
            var waypoint = new Waypoint({
                element: $sideNav,
                offset: 90,
                handler: function (direction) {
                    if (direction == "down") {
                        $sideNavSpacer.addClass('show')
                        $sideNav.addClass('stuck');
                    }
                }
            })
        }
    });
}

/*
Expands/Closes the search bar in the nav.
*/
function searchFunctionality() {
    var $searchWrapper = $('.search-wrapper');
    $('.container-fluid:not(.mainNav)').click(function () {

        if ($searchWrapper.hasClass('expanded')) {
            $searchWrapper.removeClass('expanded');
            $('.nav-item').removeClass('hide');
        }
    });
    $('.searchInput').click(function (event) {
        var $this = $(this),
            $searchWapper = $(this).parent().parent();

        if ($searchWrapper.hasClass('expanded')) {
            event.stopPropagation();
        }
    });

    $('.searchIconWrapper').on('click', function (event) {
        var $this = $(this),
            $searchWrapper = $(this).parent();

        if ($searchWrapper.hasClass('expanded')) {
            $searchWrapper.removeClass('expanded');
            $searchWrapper.siblings('.nav-item').removeClass('hide');
        } else {
            if ($(window).width() > (950)) {
                $searchWrapper.addClass('expanded')
                $('.searchInput').val('');
                $searchWrapper.siblings('.nav-item').addClass('hide')
                $(this).parent().find('input').focus();
            }
            event.stopPropagation();
        }

    })

    $('.arrowWrapper').click(function (e) {
        e.preventDefault();

        $(this).parent().submit();
    })

}

/*
Initializes the homepage carousel with custom
navigation dots and auto loop functionality.
*/
function homepageCarousel() {
    var owl = $('#header-carousel .owl-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        dots: false,
        mouseDrag: false
    })

    var autoLoop = setInterval(initLoop, 4000)

    $('.header-carousel, .owl-dot').hover(function () {
        clearInterval(autoLoop);
    }, function () {
        autoLoop = setInterval(initLoop, 4000)
    })

    $('.owl-dots .owl-dot').click(function (event) {
        event.stopPropagation();
        $('.owl-dot').removeClass('active');
        $(this).addClass('active')

        owl.trigger('to.owl.carousel', ($(this).data('slide') - 1))
    })

    owl.on('drag.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            e.preventDefault()
        }
    })

    owl.on('dragged.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            return true
        }
    })

    function initLoop() {
        if ($('.owl-dot.active').next().length)
            $('.owl-dot.active').next().trigger('click');
        else
            $('.owl-dot').first().trigger('click');
    }
};

/*
Set the active state for the top navigation items,
*/
function navCurrent() {
    var page = window.location.pathname.split('/')[1];

    if (page === '') {

    } else if (page === 'upcoming') {
        $('.navlink-upcoming').addClass('active')
        $('.content-block').removeClass('col-lg-4').removeClass('col-lg-6').removeClass('col-md-6').addClass('featured')
    } else if (page === 'news') {
        $('.navlink-news').addClass('active')
    } else if (page === 'works-list') {
        $('.navlink-works').addClass('active')
    } else if (page === 'works-grid') {
        $('.navlink-works').addClass('active')
    } else if (page === 'the-author') {
        $('.navlink-author').addClass('active')
    } else if (page === 'faq') {
        $('.navlink-faq').addClass('active')
    }
}

/*
Toggle the custom drop downs on the works page.
*/
function worksFilters() {
    $('.sort-by .toggle').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $('.sort-by .toggle').removeClass('open')
        } else {
            $('.sort-by .toggle').removeClass('open')
            $(this).toggleClass('open')
        }
    })
}

/*
Set the ratio on page load for the work grid items so it is consistent.
*/
function gridViewHeight() {
    $('.work-image-wrapper').css({
        height: $('.work-image-wrapper').width() * 1.5 + "px"
    })
}

/*
Functionality to expand the tables found on the Author page and
Book detail page.
*/
function tableGridExpander() {
    $('.bookDetail-characters .toggle, .author-appearances .toggle, .author-awards .toggle').click(function (e) {
        e.preventDefault();
        var $table = $(this).parent(),
            $this = $(this);

        $table.toggleClass('full')
        $table.find('.grid-content:not(.initial, .ellipsis), .award-header:not(.initial)').slideToggle({
            duration: 200,
            start: function () {
                jQuery(this).css('display', 'flex');
                jQuery(this).toggleClass('author-show');
            }
        });
    })
    $('.grid-content.ellipsis').click(function () {
        $(this).parent().siblings('.toggle').trigger('click');
    })
}

/*
Initializes the carousels found on the Book detail page.
*/
function bookDetailPage() {
    var owl = $('.alt-covers').owlCarousel({
        center: false,
        margin: 20,
        dots: false,
        autoWidth: true,
        // mouseDrag: false,
        loop: true,
        items: 7
    })


    owl.on('drag.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            e.preventDefault()
        }
    })

    owl.on('dragged.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            return true
        }
    })

    $('#alt-covers .photo-gallery-arrows .arrow-inner.left').click(function (e) {
        e.preventDefault();

        $('.alt-covers').trigger('prev.owl.carousel', [300]);
    })

    $('#alt-covers .photo-gallery-arrows .arrow-inner.right').click(function (e) {
        e.preventDefault();

        $('.alt-covers').trigger('next.owl.carousel', [300]);
    })

    var owl2 = $('.related-works').owlCarousel({
        center: false,
        margin: 20,
        dots: false,
        autoWidth: true,
        loop: true
    })


    owl2.on('drag.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            e.preventDefault()
        }
    })

    owl2.on('dragged.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            return true
        }
    })


    var imgs = $('.related-works img'),
        imgCount = imgs.length

    if (imgs.length > 0) {
        var imgLoadInterval = setInterval(function () {
            var imgsLoaded = 0
            imgs.each(function () {
                if ($(this)[0].complete)
                    imgsLoaded++
            })

            if (imgsLoaded >= imgCount) {
                clearInterval(imgLoadInterval)
                owl2.trigger('refresh.owl.carousel')
            }
        }, 500)


        $('.related-works-arrows .arrow-inner.left').click(function (e) {
            e.preventDefault();

            owl2.trigger('prev.owl.carousel', [300]);
        })

        $('.related-works-arrows .arrow-inner.right').click(function (e) {
            e.preventDefault();

            owl2.trigger('next.owl.carousel', [300]);
        })

        if ($('.related-works .owl-stage .owl-item.active').length === $('.related-works .owl-stage .owl-item').length) {
            //return true
            // $('.related-works-arrows').hide()
        } else {
            //return false
        }

        if ($('.alt-covers .owl-stage .owl-item.active').length === $('.alt-covers .owl-stage .owl-item').length) {
            //return true
            //   $('.alt-covers .photo-gallery-arrows').hide()
        } else {
            //return false
        }

        if ($('.related-works .owl-stage .owl-item.active').length < 5) {
            owl2.data('owl.carousel').options.loop = false;
            owl2.trigger('refresh.owl.carousel');
        }
    }

}

/*
Initializes the carousel found the Author page.
*/
function authorPage() {

    var owl = $('.author-gallery').owlCarousel({
        center: false,
        margin: 20,
        dots: false,
        // mouseDrag: false,
        autoWidth: true,
        loop: true
    })


    owl.on('drag.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            e.preventDefault()
        }
    })

    owl.on('dragged.owl.carousel', function (event) {
        document.ontouchmove = function (e) {
            return true
        }
    })

    $('#author-gallery .photo-gallery-arrows .arrow-inner.left').click(function (e) {
        e.preventDefault();

        $('.author-gallery').trigger('prev.owl.carousel', [300]);
    })

    $('#author-gallery .photo-gallery-arrows .arrow-inner.right').click(function (e) {
        e.preventDefault();

        $('.author-gallery').trigger('next.owl.carousel', [300]);
    })

    if ($('.author-gallery .owl-stage .owl-item.active').length === $('.author-gallery .owl-stage .owl-item').length) {
        //return true
        //   $('.author-gallery .photo-gallery-arrows').hide()
    } else {
        //return false
    }

}

/*
Utility function to append text to the clipboard.
*/
function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

/*
Determines if a homepage block is long enough to need us to fade
out the additional content.
*/
function homepageContentBlocks() {
    $('.layout_home #latest-news .latest-news .news-content .news-description').each(function () {
        var $this = $(this);

        if ($this.height() < 140) {
            $this.addClass('shorter')
        }
    })
}

/*
Checks forms and adds error-states as needed
 */
function formValidation() {
    var homepageNewsletter = $('#homepage-newsletter-form'),
        newsletterSignup = $('#newsletter-signup-form'),
        contactForm = $('#contact-form'),
        dollarBabiesForm = $('#dollarBabies-form'),
        pressForm = $('#press-form');

    homepageNewsletter.submit(function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find('[name="name"]'),
            email = form.find('[name="email"]'),
            validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            country = form.find('[name="country"]'),
            valid = true;

        // Clear error states
        form.find('.error').removeClass('error');
        form.find('.form-hint').removeClass('show');

        // Do validation first
        if (country.val() == null) {
            country.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please select a country");
        }
        if (!validEmail.test(email.val())) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter a valid email address");
        }
        if (email.val().length <= 0) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (name.val().length <= 0) {
            name.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (valid) {
            homepageNewsletter.addClass('success');
            $('.success-message').addClass('success')
        }
    })

    newsletterSignup.submit(function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find('[name="name"]'),
            email = form.find('[name="email"]'),
            validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            country = form.find('[name="country"]'),
            valid = true;

        // Clear error states
        form.find('.error').removeClass('error');
        form.find('.form-hint').removeClass('show');

        // Do validation first
        if (country.val() == null) {
            country.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please select a country");
        }
        if (!validEmail.test(email.val())) {
            email.parent().addClass('error');
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter a valid email address");
        }
        if (email.val().length <= 0) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (name.val().length <= 0) {
            name.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (valid) {
            newsletterSignup.addClass('success');
            $('.success-message').addClass('success')
        }
    })


    contactForm.submit(function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find('[name="name"]'),
            email = form.find('[name="email"]'),
            emailconfirm = form.find('[name="emailconfirm"]'),
            message = form.find('[name="message"]'),
            topic = form.find('[name="topic"]'),
            validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            valid = true;

        // Clear error states
        form.find('.error').removeClass('error');
        form.find('.form-hint').removeClass('show');
        form.find('.success').removeClass('success');

        // Do validation first
        if (message.val().length <= 0) {
            message.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please write a message");
        }
        if (topic.val() == null) {
            topic.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please select an email topic");
        }
        if (emailconfirm.val().length <= 0) {
            emailconfirm.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (emailconfirm.val() != email.val()) {
            email.parent().addClass('error');
            emailconfirm.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Email address does not match");
        }
        if (!validEmail.test(email.val())) {
            email.parent().addClass('error');
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter a valid email address");
        }
        if (email.val().length <= 0) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (name.val().length <= 0) {
            name.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (valid) {
            contactForm.addClass('success');
            $('.success-message').addClass('success')
        }
    })

    pressForm.submit(function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find('[name="name"]'),
            phone = form.find('[name="phone"]'),
            email = form.find('[name="email"]'),
            message = form.find('[name="message"]'),
            purpose = form.find('[name="purpose"]'),
            organization = form.find('[name="organization"]'),
            validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            valid = true;

        // Clear error states
        form.find('.error').removeClass('error');
        form.find('.form-hint').removeClass('show');
        form.find('.success').removeClass('success');

        // Do validation first
        if (message.val().length <= 0) {
            message.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please write a message");
        }
        if (purpose.val() == null) {
            purpose.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please select a purpose of contact");
        }
        if (!validPhone.test(phone.val())) {
            phone.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter valid phone number");
        }
        if (phone.val().length <= 0) {
            phone.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }

        if (!validEmail.test(email.val())) {
            email.parent().addClass('error');
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter a valid email address");
        }
        if (email.val().length <= 0) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (organization.val().length <= 0) {
            organization.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (name.val().length <= 0) {
            name.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (valid) {
            pressForm.addClass('success');
            $('.success-message').addClass('success')
        }
    })

    dollarBabiesForm.submit(function (e) {
        e.preventDefault();

        var form = $(this),
            name = form.find('[name="name"]'),
            email = form.find('[name="email"]'),
            emailconfirm = form.find('[name="emailconfirm"]'),
            message = form.find('[name="message"]'),
            story = form.find('[name="story"]'),
            validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            valid = true;

        // Clear error states
        form.find('.error').removeClass('error');
        form.find('.form-hint').removeClass('show');
        form.find('.success').removeClass('success');

        // Do validation first
        if (message.val().length <= 0) {
            message.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please write a message");
        }
        if (story.val() == null) {
            story.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please select a story");
        }
        if (emailconfirm.val().length <= 0) {
            emailconfirm.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (emailconfirm.val() != email.val()) {
            email.parent().addClass('error');
            emailconfirm.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Email address does not match");
        }
        if (!validEmail.test(email.val())) {
            email.parent().addClass('error');
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Please enter a valid email address");
        }
        if (email.val().length <= 0) {
            email.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (name.val().length <= 0) {
            name.parent().addClass('error');
            valid = false;
            form.find('.form-hint').addClass('show');
            form.find('.form-hint').text("*Highlighted field(s) cannot be blank");
        }
        if (valid) {
            dollarBabiesForm.addClass('success');
            $('.success-message').addClass('success')
        }
    })
}


