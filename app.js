$(document).ready(function(){
	"use strict";

	window.app = {
		t: 1500,
		intervalID: null,

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
			this.intervalID = setInterval(function(){
				this.updateView();
				this.t--;
				if (this.t === 0) {
					this.stop();
				}
			}.bind(this), 1000);
		},

		updateView: function(min, sec){
			var minutes = Math.floor(this.t/60);
			var secondes = this.t % 60;
			$('h2').html(this.addZero(minutes) + ':' + this.addZero(secondes));
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
			this.t;
			this.updateView();
			this.pomodoro();
		},

		pomodoro: function(){
			this.t = 1500;
			this.updateView();
			$('#reset').show();
		},

		shortBreak: function(){
			this.t = 300;
			this.updateView();
			$('#reset').hide();
		},

		longBreak: function(){
			this.t = 600;
			this.updateView();
			$('#reset').hide();
		},

	};

	app.init();

});