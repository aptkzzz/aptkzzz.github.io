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

window.addEventListener('load', () => {
    document.querySelector('.vk').addEventListener('click', () => {
        document.location = "https://vk.com/aptk_off";
    });
    document.querySelector('.twitter').addEventListener('click', () => {
        document.location = "https://twitter.com/aptk_off";
    });
    document.querySelector('.telegram').addEventListener('click', () => {
        document.location = "https://t.me/arseniypetrikor";
    });
    document.querySelector('.rtr').addEventListener('click', () => {
        document.location = "http://store.steampowered.com/app/604490/Running_Through_Russia/";
    });
    document.querySelector('.ff').addEventListener('click', () => {
        alert("I said it's coming soon!");
    });
});