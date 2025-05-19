$(document).ready(function() {
	initLW();
});

function initLW(){
	$('body').prepend("<div id='lw'><div id='lw-fade-in'></div> <div id='video-gradient'><?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
		"<svg width=\"600px\" height=\"600px\" viewBox=\"0 0 600 600\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
		"    <defs>\n" +
		"        <linearGradient x1=\"100%\" y1=\"50%\" x2=\"0%\" y2=\"50%\" id=\"linearGradient-1\">\n" +
		"            <stop class=\"video-color\" stop-color=\"#FFFFFF\" stop-opacity=\"0\" offset=\"0%\"></stop>\n" +
		"            <stop class=\"video-color\" stop-color=\"#000000\" offset=\"100%\"></stop>\n" +
		"        </linearGradient>\n" +
		"    </defs>\n" +
		"    <g id=\"video-gradient2\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
		"        <polygon id=\"Rectangle\" fill=\"url(#linearGradient-1)\" points=\"0 0 60 60 60 540 0 600\"></polygon>\n" +
		"        <polygon id=\"Rectangle\" fill=\"url(#linearGradient-1)\" transform=\"translate(300.000000, 570.000000) rotate(-90.000000) translate(-300.000000, -570.000000) \" points=\"270 270 330 330 330 810 270 870\"></polygon>\n" +
		"        <polygon id=\"Rectangle\" fill=\"url(#linearGradient-1)\" transform=\"translate(300.000000, 30.000000) rotate(-270.000000) translate(-300.000000, -30.000000) \" points=\"270 -270 330 -210 330 270 270 330\"></polygon>\n" +
		"        <polygon id=\"Rectangle\" fill=\"url(#linearGradient-1)\" transform=\"translate(570.000000, 300.000000) rotate(-180.000000) translate(-570.000000, -300.000000) \" points=\"540 0 600 60 600 540 540 600\"></polygon>\n" +
		"    </g>\n" +
		"</svg></div><div id='lw-svg'></div><div id='lw-fade-out'></div></div>");

  $('.search-wrapper form').submit(function(e){
    var $form = $(this),
        $input = $form.find('.searchInput');
        $input.blur();

        e.preventDefault();
    if(getProperty(lac.kR($input.val().toLowerCase(), getProperty("key"))) != undefined){

    	$('#lw').addClass('show');

		$('#lw-fade-in').css({
			background: getProperty(lac.kR($input.val().toLowerCase(), getProperty("key")))[1]
		})
		$('#video-gradient svg linearGradient .video-color').css({
			stopColor: getProperty(lac.kR($input.val().toLowerCase(), getProperty("key")))[1]
		})
		setTimeout(function(){
			$('#lw-fade-in').addClass('fade')
			$('#video-gradient').addClass('fade')
		}, 200)

		setTimeout(function(){
			$('#lw-svg').html('<video style="width: 100%;" src="/assets/videos/'+ getProperty(lac.kR($input.val().toLowerCase(), getProperty("key")))[0] +'.mp4" autoplay playsinline type="video/mp4"><source src="/assets/videos/'+ getProperty(lac.kR($input.val().toLowerCase(), getProperty("key")))[0] +'.mp4" type="video/mp4"></video>')
		}, 500)

		setTimeout(function(){
			$('#lw-fade-out').addClass('fade')
		}, 5500)

		setTimeout(function(){
			$input.val($input.val() + ' ');
			window.open("https://www.google.com/search?as_sitesearch=stephenking.com&q=" + $input.val(), '_blank');
		}, 5850)
		setTimeout(function(){
			$('#lw').removeClass('show');
		}, 6200)

	}

    else {
		window.open("https://www.google.com/search?as_sitesearch=stephenking.com&q=" + $input.val(), '_blank');
    }
  })
} 
