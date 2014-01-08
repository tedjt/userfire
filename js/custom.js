jQuery(document).ready(function(){ 
	// --------------------------------------------------------
	//  Testimonial Slider
	// --------------------------------------------------------
	
	$('#testimonials').flexslider({
		animation:"fade",
		slideshow : true,
		controlNav : true,
		directionNav: false,
		slideshowSpeed: 5000, //Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 600 //Set the speed of animations, in milliseconds
	});
	
	// --------------------------------------------------------
	//	Fancy box
	// -------------------------------------------------------- 
	
	$('.fancybox').fancybox({
		'overlayShow'	: true, //Toggle overlay
		'opacity'		: true, //When true, transparency of content is changed for elastic transitions
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'none',
		'overlayOpacity'	:   0.8 //Opacity of the overlay (from 0 to 1; default - 0.3)
	});


	// --------------------------------------------------------
	//	Parse Code
	// -------------------------------------------------------- 
	var contactsCompleteHtml = '<h2> Thanks for contacting us. We\'ll be in touch shortly </h2>';
	Parse.initialize("uXfsYkqe7KVGWABXnJ9Ulm09UrzI21KmhgC7RFMC", "5BMsy1FFGRD9X6nvPk4VU9arjrk6f3U6CSocE3mY");
	var ContactObject = Parse.Object.extend("ContactObject");
	var SOURCE_TYPE = {
		TRIAL: 'TRIAL',
		SUBSCRIBE: 'SUBSCRIBE',
		BUY: 'BUY'
	};

	function freeTrial() {
		var nameVal = $('.js-trialname').val();
		var emailVal = $('.js-trialemail').val();
		_postContact({
			source: SOURCE_TYPE.TRIAL,
			name: nameVal,
			email: emailVal
		});
		$('.form-area').parent().html(contactsCompleteHtml);
		return false;
	}

	function buyNow(e) {
		$('.js-buybutton')
			.click(function(e) {
				$('.js-buybutton').parent().fadeOut(1000, function() {
					$('.buttons-area').html(contactsCompleteHtml).show();
				});
				var emailVal = $('.js-buyemail').val();
				_postContact({
					source: SOURCE_TYPE.BUY,
					email: emailVal
				});
				return false;
			})
			.text('Submit');

		$('.buymessagebox')
			.removeClass('buymessagebox-hidden')
			.addClass('buymessagebox-shown');

    return false;
	}

	function subscribe() {
		var emailVal = $('.js-subscribeemail').val();
		_postContact({
			source: SOURCE_TYPE.SUBSCRIBE,
			email: emailVal
		});
		$('#buttom-subscribe').parent().html(contactsCompleteHtml);
		return false;
	}

  function _postContact(contactObj) {
  	var newContact = new ContactObject();
		newContact.save(contactObj);
  }

  $('.js-buybutton').click(buyNow);
	$('#form-area').submit(freeTrial);
	$('#buttom-subscribe').submit(subscribe);
});


