
// Speicher Values in Array bei click
var values = [];

$(document).on('click', '#main li', function(event) {
	event.preventDefault();
	values = [];
	$(this).find('div').each(function(){
		var heightInPx = $(this).css('height');
		var height = parseInt(heightInPx.replace('px','')) * parseInt($('.weights input[type="radio"]:checked').val());
		values.push(height);
	})
	// Das ist nur um die werte mal in der Console anzeigen zu lassen
	.promise().done(function(){
		console.log(values);
	});		
});