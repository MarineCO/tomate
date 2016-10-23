$(document).ready(function(){
	"use strict";

	window.app = {
		timeSeconds: null,
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
				// this.progress();
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
			var bar = new ProgressBar.Circle('#container', {
				color: 'black',
				strokeWidth: 6,
				trailWidth: 10,
				easing: 'easeInOut',
				text: {
					autoStyleContainer: false
				},
				from: { color: '#FFD700', width: 10 },
				to: { color: '#FFFF00', width: 10 },
				step: function(state, circle) {
					circle.path.setAttribute('stroke', state.color);
					circle.path.setAttribute('stroke-width', state.width);
					var value = (Math.round(circle.value() * 100) + '%');
					if (value === 0) {
						circle.setText('0');
					} else {
						circle.setText(value);
					}
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = '2rem';

			bar.animate(1, {
				duration: (app.timeSeconds--) * 1135
			}, function() {
				location.reload();
			});
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
			this.stop();
			this.timeSeconds = 1500;
			this.updateView();
			this.progress();
			$('#reset').show();
		},

		shortBreak: function(){
			this.stop();
			this.timeSeconds = 300;
			this.updateView();
			this.progress();
			$('#reset').hide();
		},

		longBreak: function(){
			this.stop()
			this.timeSeconds = 600;
			this.updateView();
			this.progress();
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