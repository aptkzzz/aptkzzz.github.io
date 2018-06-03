(function($) {
    $.fn.parallax = function(options) {
        var windowHeight = $(window).height();
        var settings = $.extend({
            speed: 0.15
        }, options);
        return this.each( function() {
        	var $this = $(this);
        	$(document).scroll(function(){
    		        var scrollTop = $(window).scrollTop();
            	        var offset = $this.offset().top;
            	        var height = $this.outerHeight();
			if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
				return;
			}
			var yBgPosition = Math.round((offset - scrollTop) * settings.speed);
    			$this.css('background-position', 'center ' + yBgPosition + 'px');
        	});
        });
    }
}(jQuery));

$('.bg-1,.bg-3').parallax({
	speed :	0.15
});

$('.bg-2').parallax({
	speed :	0.25
});

function donate_start() {
	let holder = document.getElementById("holder");
	holder.style.width = document.documentElement.clientWidth + "px";
	holder.style.height = document.documentElement.clientHeight + "px";
}