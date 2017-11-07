(function ($) {
  "use strict";
  // ready? .. set, go!

  var transitionend = "webkitTransitionEnd transitionend";

  var slots = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ];
  var result = [];
  var count = 0;
  var max = 320;

  var endSpin = function (el, match, winBox) {
    var ended = 0;
   	
    el.on(transitionend, function () {
      ended++;
      if(ended === 3) {
       winBox.html(match);
      }
	  
    });
  };


  $(function () {

    var frame = $('#page');
    var winBox = $('#win');
    var creditBox = $('#credits');
    var play = $('#play');
    var wheels = $('.wheel');
    creditBox.html("SPIN");

    //control turning

    var rotation = $('#rotation');
    var perspective = $('#perspective');
    frame.addClass('turn-360');
    setTimeout(function () {
      frame.removeClass('turn-360');
    }, 3600);

    rotation.on('change', function () {
      var degree = $(this).val();
      var view = perspective.val();
      frame.css({
        MozTransform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)',
        WebkitTransform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)',
        transform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)',
      });
    });

    perspective.on('change', function () {
      var degree = rotation.val();
      var view = $(this).val();
      frame.css({
        MozTransform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)',
        WebkitTransform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)',
        transform: 'perspective(' + view + ') rotateY(' + degree + 'deg) translate3d(0,0,0)'
      });

    });

    //@end turning*/

	var zero = 0;
	var spinPlus = 0;
	play.on('click', function () {
	
	      var type = 0;
		  
		  do {
			 type = parseInt(parseInt((Math.random() * max + 1), 10).toString(8), 10);
		  } while(type > max);
		  
		  
		  var str = "" + type;
		  var pad = "000";
	      var val = pad.substring(0, pad.length - str.length) + str
		  
		  
		  spinPlus += 3600;
	
		  // define for each wheel
		  for(var i = 0; i < 3; i++) {
			  var $this = $(wheels[i]);
              var index = $this.index();
			  type = parseInt(val[i], 10);
			
			  var duration = parseInt((Math.random() * 10000), 10);
			  
			  if(duration < 1000) {
				duration *= 10;
			  }
			  
			  if(duration < 5000) {
				duration += 5000;
			  }
			  			  
			  var rotateWheel = (type + 1) * 40 + spinPlus;
			  
			  if(zero < 3) {
				duration = 0;
				zero += 1;
			  } else {
				result.push(slots[index][type]);
				count++;
				
				if(count === 3) {
					//winBox.html(result);
					endSpin(wheels, result, winBox);
				  count = 0;
				  result = [];
			    }
			  
			  }
			  			  
			  $this.css({
				MozTransitionDuration: duration + 'ms',
				WebkitTransitionDuration: duration + 'ms',
				transitionDuration: duration + 'ms',
				MozTransform: 'rotateX(-' + rotateWheel + 'deg)',
				WebkitTransform: 'rotateX(-' + rotateWheel + 'deg)',
				transform: 'rotateX(-' + rotateWheel + 'deg)'
			  });
		  		  
		  }
               
      });

    play.trigger('click');
	
    setInterval(function () {
	
      if (creditBox.css("visibility") === "visible") {
        creditBox.css('visibility', 'hidden');
      } else {
        creditBox.css('visibility', 'visible');
      }
	  
    }, 500);
  });
}(jQuery));
