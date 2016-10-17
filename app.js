$(document).ready(function(){

	window.app = {
		t: 1500,
		intervalID: null,
		init: function(){
			app.listeners();
		},
		listeners: function(){
			$('#pomodoro').on('click', app.pomodoro);
			$('#shortBreak').on('click', app.shortBreak);
			$('#longBreak').on('click', app.longBreak);
			$('start').on('click', app.start);
			$('stop').on('click', app.stop);
			$('reset').on('click', app.reset);
		},
		start: function(){
			app.intervalID = setInterval(function(){
				app.updateView();
				app.t--;
				if (app.t === 0) {
   					app.stop();
   				}
			}, 1000);
		},
		updateView: function(min, sec){
			var minutes = Math.floor(app.t/60);
			var secondes = app.t % 60;
			if (minutes < 10 && secondes < 10) {
   				$('h1').html('0' + minutes + ':' + '0' + secondes);
   			}
   			else if (minutes < 10 && secondes >= 10) {
   				$('h1').html('0' + minutes + ':' + secondes);
   			}
   			else if (minutes >= 10 && secondes < 10) {
   				$('h1').html(minutes + ':' + '0' + secondes);
   			}
   			else {
   				$('h1').html(minutes + ':' + secondes);
   			}
		},
		stop: function(){
			clearInterval(app.intervalID);
		},
		reset: function(){
			clearInterval(app.intervalID);
			app.t;
			app.updateView();
		},
		pomodoro: function(){
			app.t = 1500;
			app.updateView();
		},

		shortBreak: function(){
			app.t = 300;
			app.updateView();
		},

		longBreak: function(){
			app.t = 600;
			app.updateView();
		},

	};

	app.init();

});