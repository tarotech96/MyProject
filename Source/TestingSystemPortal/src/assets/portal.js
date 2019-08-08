$(function() {
	handleScroll();

	$(window).scroll(function() {
		handleScroll();
	});
	$('.search-list').click(function(event) {
		x = $(this).index();

		$('.search-list:nth-child(' + x + ') input').addClass('active')

	});
	$('.menu .nav-item.job').hover(function() {

		$(this).find('.menu_job').stop(true, true).delay(200).fadeIn(150);
		$(this).find('.nav-item').stop(true, true).delay(200).fadeIn(150);

	}, function() {

		$(this).find('.nav-item').stop(true, true).delay(200).fadeOut(500)
		$(this).find('.menu_job').stop(true, true).delay(200).fadeOut(500)
	});

	$('.menu .nav-item').hover(function() {

		$(this).find('.pop-user').stop(true, true).delay(200).fadeIn(150);
		$(this).find('.nav-item').stop(true, true).delay(200).fadeIn(150);

	}, function() {

		$(this).find('.nav-item').stop(true, true).delay(200).fadeOut(500)
		$(this).find('.pop-user').stop(true, true).delay(200).fadeOut(500)
	});

	$('.iconMenu').click(function(event) {
		$(this).toggleClass('on');
		$('.menu-mb-2').toggleClass('on');
		$('.pop-register').removeClass('show');
		$('.popup').removeClass('show');
	});

	$('.user-login-fullname').click(function(event) {
		$('.user_login_mobile').toggleClass('show');
	});

	$('.menu-pc .login-portal').click(function(event) {
		$('.popup').addClass('show');
		$('.pop-register').removeClass('show');
		$('.popup').focus();
	});
	$('.login-portal').click(function(event) {
		$('.popup').addClass('show');
		$('.pop-register').removeClass('show');
		$('.menu-mb-2').removeClass('on');
		$('.iconMenu').removeClass('on');

	});	

	$('.menu-pc .btn-regis').click(function(event) {
		$('.pop-register').addClass('show');
		$('.popup').removeClass('show');
	});
	$('.btn-regis').click(function(event) {
		$('.pop-register').addClass('show');
		$('.popup').removeClass('show')
		$('.menu-mb-2').removeClass('on');
		$('.iconMenu').removeClass('on');
	});


	$('.content .close').click(function(event) {
		$('.popup').removeClass('show');
		$('.pop-register').removeClass('show');
		// $('body').css('overflow', 'auto');
		$(".form-control").val("");
		$("#registerMessage").html($("#labelOr").val()).removeClass("error").addClass("or");
		$("#loginMessage").html($("#labelOr").val()).removeClass("error").addClass("or");
		$("#forgot_message").html("").removeClass("error").addClass("or");
	});

	$(document).keyup(function(e) {
		if (e.which == 27) {
			$('.popup').removeClass('show');
			$('.pop-register').removeClass('show');
			$(".form-control").val("");
			$("#registerMessage").html($("#labelOr").val()).removeClass("error").addClass("or");
			$("#loginMessage").html($("#labelOr").val()).removeClass("error").addClass("or");
			$("#forgot_message").html("").removeClass("error").addClass("or");
		}
	});

	$('.menu .mobile-menu .menu-mb-2 .job').click(function(event) {
		$('.menu .mobile-menu .menu-mb-2 .job .menu_job').toggleClass('show');
	});

	$('.btn-back').click(function(event) {
		$('.popup').addClass('show');
		$('.pop-register').removeClass('show');
		$('.popup-forgot').removeClass('show');

	});
	$('.forgot').click(function(event) {
		$('.popup').removeClass('show');
		$('.pop-register').removeClass('show');
		$('.popup-forgot').addClass('show');

	});
	$('menu-mobile .forgot').click(function(event) {
		$('.popup').removeClass('show');
		$('.popup-forgot').addClass('show');

	});

	function handleScroll() {
		var scroll = $(window).scrollTop();
		if (scroll > 90) {
			$(".navbar").addClass("trf")
		} else {

			$(".navbar").removeClass("trf")
		}
	}
	
	$(".popup").click(function() {
		if ($( event.target ).attr("class").includes("popup")) {
			$('.popup').removeClass('show');
		}
	});
	
	$(".pop-register").click(function() {
		if ($( event.target ).attr("class").includes("pop-register")) {
			$('.pop-register').removeClass('show');
		}
	});
	
})
