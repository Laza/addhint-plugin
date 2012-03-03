// addHint :: little Popup displaying title text, or passed text (can be jQuery element too)
// http://lazaworx.com/addhint-plugin/

var ALIGN_LEFT = ALIGN_TOP = 0,
	ALIGN_CENTER = ALIGN_MIDDLE = 1,
	ALIGN_RIGHT = ALIGN_BOTTOM = 2;
	
(function($) {

	$.extend( $.support, {
		touch: "ontouchend" in document
	});
	
	var version = parseFloat($.browser.version);
		vendor = $.browser.msie && version < 9 && '-ms-' || 
		$.browser.webkit && version < 6 && '-webkit-' || 
		$.browser.mozilla && version < 4  && '-moz-' || 
		$.browser.opera && version < 10.5 && '-o-' || '';
	
	$.fn.alignTo = function( el, settings ) {
		
		settings = $.extend( {}, $.fn.alignTo.defaults, settings );
		
		if (typeof el === 'string') {
			el = $(el);
		}
		if (!(el instanceof $ && el.length)) {
			return;
		}
		
		var to = el.offset(),
			tw = el.outerWidth(),
			th = el.outerHeight();
		
		return $(this).each( function() {
			var w = $(this).outerWidth(),
				h = $(this).outerHeight(),
				rx = Math.round(to.left + settings.toX * tw / 2 + 
					(settings.toX - 1) * settings.gap);
				ry = Math.round(to.top + settings.toY * th / 2 + 
					(settings.toY - 1) * settings.gap);
				l = Math.round(rx - settings.posX * w / 2),
				t = Math.round(ry - settings.posY * h / 2);
			
			if ( t < 0 ) {
				if ( settings.toX !== ALIGN_CENTER ) {
					t = 0;
				} else if ( settings.toY !== ALIGN_BOTTOM  ) {
					t = to.top + el.outerHeight() + settings.gap;
				}
			} else if ( (t + h) > $(window).height() ) {
				if ( settings.toX !== ALIGN_CENTER ) {
					t = $(window).height() - h;
				} else if ( settings.toY !== ALIGN_TOP ) {
					t = to.top - h - settings.gap;
				}
			}

			if ( l < 0 ) {
				if ( settings.toY !== ALIGN_MIDDLE ) {
					l = 0;
				} else if ( settings.toX != ALIGN_RIGHT ) {
					l = to.left + el.outerWidth() + settings.gap;
				}
			} else if ( (l + w) > $(window).width() ) {
				if ( settings.toY !== ALIGN_MIDDLE ) {
					l = $(window).width() - w;
				} else if ( settings.toX != ALIGN_LEFT ) {
					l = to.left - w - settings.gap;
				}
			}
			
			$(this).css({
				position: 'absolute',
				left: l, 
				top: t 
			});
		});
	};

	$.fn.alignTo.defaults = {
		gap: 5,
		posX: ALIGN_CENTER,
		posY: ALIGN_BOTTOM,
		toX: ALIGN_CENTER,
		toY: ALIGN_TOP
	};

	$.fn.addHint = function(txt, settings) {
		
		// Only settings, text is taken from title
		if ( txt && typeof txt !== 'string' && !txt.jquery ) {
			settings = txt;
			txt = null;
		}
		
		settings = $.extend( {}, $.fn.addHint.defaults, settings );
		
		// Recycling the old container if exists, or create new
		var getPop = function() {
			var c = $('#' + settings.id);
			if ( !c.length ) {
				c = $('<div>', { 
					id: settings.id 
				}).css(settings.css).css({
					position: 'absolute'
				}).css(
					vendor + 'box-shadow', '1px 2px 5px rgba(0,0,0,0.25)' 
				).css( 
					vendor + 'border-radius', '4px' 
				).appendTo('body');
			}
			return c;
		};
		
		return this.each(function() {
			var t = $(this), 
				tx = txt || t.attr('title'), 
				to, 
				over = false,
				focus = false,
				dyn = !(tx && tx.jquery), 
				pop;
			
			if ( !tx || !tx.length ) {
				return;
			}
			
			var enter = function(e) {
				
				// Inserting dynamic content

				if ( dyn ) {
					pop = getPop();
					pop.empty().html( tx );
				} else {
					pop = tx.show();
				}
				
				pop.off('mouseover', getFocus);
				pop.off('mouseout', lostFocus);
				
				// mouse is over / out the trigger element
				var getFocus =  function() {
					to = clearTimeout(to);
					over = true;
					pop.stop(true, true).css({opacity: 1}).show();
				};
				
				var lostFocus = function() {
					if ( focus ) {
						return;
					}
					to = clearTimeout(to);
					over = false;
					fade();
				};
				
				// Keep the popup live while the mouse is over, or an input box has focus
				pop.on('mouseover', getFocus);
				pop.on('mouseout', lostFocus);
				
				pop.find('input').focus(function() {
					focus = true;
					getFocus();
				}).blur(function() {
					focus = false;
				});
				
				// Aligning and fading in
				pop.stop(true, true).show().alignTo(t, { 
					posX: settings.posX,
					posY: settings.posY,
					toX: settings.toX,
					toY: settings.toY,
					gap: settings.gap
				}).css({
					opacity: 0
				}).animate({
					opacity: 1
				}, 200);
				
				// Remove hint automatically on touch devices, missing the mouse leave event
				if ( $.support.touch ) {
					to = setTimeout(fade, settings.stay);
				} else {
					over = true;
				}
			};
			
			// Leaving the trigger element
			var leave = function(e) {
				over = false;
				to = clearTimeout(to);
				fade();
			};
			
			// Fading the popup
			var fade = function() {
				if ( !over && pop && pop.length ) {
					pop.stop(true, false).animate({opacity: 0}, 200, function() { 
						$(this).hide(); 
					});
				}
			};
			
			if ( !tx.jquery ) {
				t.removeAttr('title');
			}
			
			t.on($.support.touch? {
				'touchstart': enter
			} : {
				'focus mouseenter': enter,
				'blur mouseleave': leave
			});
		});
	};
	
	$.fn.addHint.defaults = {
		id: 'hint',
		stay: 3000,
		posX: ALIGN_CENTER,
		posY: ALIGN_BOTTOM,
		toX: ALIGN_CENTER,
		toY: ALIGN_TOP,
		gap: 5,
		css: { 
			padding:'0.5em 0.75em',
			backgroundColor:'rgba(255,240,170,0.9)',
			color:'#000',
			maxWidth:'200px',
			zIndex:99999
		}
	};
	
})(jQuery);		

