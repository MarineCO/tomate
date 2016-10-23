$(document).ready(function(){
	"use strict";

	window.app = {
		timeSeconds: 1500,
		intervalID: null,
		startT: null,
		maxCount: null,

		init: function(){
			this.listeners();
		},

		listeners: function(){
			$('#pomodoro').on('click', this.pomodoro.bind(this));
			$('#shortBreak').on('click', this.shortBreak.bind(this));
			$('#longBreak').on('click', this.longBreak.bind(this));
			$('#start').on('click', this.start.bind(this));
			$('#stop').on('click', this.stop.bind(this));
			$('#reset').on('click', this.reset.bind(this));
		},

		start: function(){
			this.stop();
			this.startT = this.timeSeconds;
			this.intervalID = setInterval(function(){
				this.updateView();
				this.progress();
				this.timeSeconds--;
				if (this.timeSeconds < 0) {
					this.stop();
				}
			}.bind(this), 1000);
		},

		updateView: function(min, sec){
			var minutes = Math.floor(this.timeSeconds/60);
			var secondes = this.timeSeconds % 60;
			$('h2').html(this.addZero(minutes) + ':' + this.addZero(secondes));
		},

		progress: function(){
			var val = app.timeSeconds;
			var circle = $('#svg #bar');

			var r = circle.attr('r');
			var c = Math.PI * (r * 2);
			
			if (val < 0) {
				val = 0;
			}
			if (val > 100) {
				val = 100;
			}
			var percentage = parseInt(((app.startT - val) / app.startT)* c,10);

			circle.css({
				strokeDashoffset: -percentage
			});
			$('#cont').attr('data-pct', val);
		},


		addZero: function(nombre){
			if (nombre < 10) {
				nombre = '0' + nombre;
			}
			return nombre;
		},

		stop: function(){
			clearInterval(this.intervalID);
		},

		reset: function(){
			clearInterval(this.intervalID);
			this.timeSeconds;
			this.updateView();
			this.pomodoro();
		},

		pomodoro: function(){
			this.timeSeconds = 1500;
			this.updateView();
			$('#reset').show();
		},

		shortBreak: function(){
			this.timeSeconds = 300;
			this.updateView();
			$('#reset').hide();
		},

		longBreak: function(){
			this.timeSeconds = 600;
			this.updateView();
			$('#reset').hide();
		},

	};

	app.init();

	var firstTimestamp = new Date().getTime();

	app.start();

	var secondTimestamp = new Date().getTime(),
	result = secondTimestamp - firstTimestamp;

	console.log(result + "millisecondes");

});