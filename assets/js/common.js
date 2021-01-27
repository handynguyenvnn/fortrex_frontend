$(document).ready(function(){
	$('.select select').on("change", function () {
		$('.select select option').each(function(){
			if($(this).is(':selected')){
				$('.select .icon').addClass($(this).val());
			} else {
				$('.select .icon').removeClass($(this).val());
			}			
		});
	});

	$('.amount .btn').on("click", function() {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find("input").val(newVal);
	});

	$('.toggle').on("click", function() {
		$(this).toggleClass('is-active');
		$(this).parent().toggleClass('is-active');
		$('.header').toggleClass('is-active');
	});
});

$(window).on("load resize",function(){
	var h = $('.sideright').height();
	//alert(h);
	if($(window).width() > 991) {
		$('.header, .sideleft, .toggle').removeClass('is-active');
	}
});