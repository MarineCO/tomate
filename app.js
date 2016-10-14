(function() {

	var t = 1500;
	var interval;

	$('h1').text('25:00');

	$('#start').on('click', function(){
		interval = setInterval(function() {
		t--;
		minutes = Math.floor(t/60);
		secondes = t % 60;

		$('h1').text(minutes + ':' + secondes);

		}, 1000);
	});

	$('#stop').on('click', function(){
		clearInterval(interval);
	});

	$('#reset').on('click', function(){
		clearInterval(interval);
		t = 1500;
		$('h1').text('25' + ':' + '00');

	});

})();