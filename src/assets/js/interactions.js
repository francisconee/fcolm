$( document ).ready(function() {
	$('.btn-agregar').click(function() {
      $('.menu-componentes').toggleClass("show-menu");
    });


	$(".btn-config").click(function() {
	  $(".configuracion-general").toggleClass("show-menu-conf");
	});

	$(".btn-ok-config").click(function() {
	  $(".configuracion-general").toggleClass("show-menu-conf");
	});

});