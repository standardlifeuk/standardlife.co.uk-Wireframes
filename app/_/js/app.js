// = triggers
//-----------------------------------------------------------------------------//

$('.main-search').before('<a id="js-search-toggle" class="search-toggle primary-nav-item icon-search col small_2 btn btn--small btn--link"><span class="visuallyhidden">Search</span></a>');

$('#js-nav-toggle').on('click', function() {
    $('#js-primary-nav').toggleClass('show'); 
}); 

$('#js-search-toggle').on('click', function() {
    $('#js-main-search-wrap').toggleClass('show'); 
}); 




jQuery.expr[':'].parents = function(a,i,m){
    return jQuery(a).parents(m[3]).length < 1;
};

function toggleNavSearch(container, e) {
	e.preventDefault();
	$('header').find('.toggle').filter(':parents(' + container + ')').removeClass('show');
	$(container).find('.toggle').toggleClass('show');
	$('.wrap-search, .nav-utility').each(function(index, element) {
		var link = $(element).find('.utility-link, .search-link');
        if($(element).find('.toggle').hasClass('show')) {
			link.addClass('active');
		} else {
			link.removeClass('active');
		}
    });
}


function loadAsync(url, loadFn) {
    loadFn = loadFn || function() {}
    $(function() {
	    var script = document.createElement('script');
	    script.src = url;
	    script.async = true;
	    $(script).on('load', loadFn);
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
	});
}


$(function () {
    
    $('#tabs').children('li').first().children('a').addClass('active')
        .next().addClass('is-open').show();
        
    $('#tabs').on('click', 'li > a', function() {
        
      if (!$(this).hasClass('active')) {

        $('#tabs .is-open').removeClass('is-open').hide();
        $(this).next().toggleClass('is-open').toggle();
        
        $('#tabs').find('.active').removeClass('active');
        $(this).addClass('active');
      } else {
        $('#tabs .is-open').removeClass('is-open').hide();
        $(this).removeClass('active');
      }
   });
});


$(".js-toggle-content").hide();
$(".js-toggle.js-toggle--open").addClass("js-toggle--active").next().show();

var toggleNavFilter = function (elem) {
	elem.siblings('div').toggle();
	elem.children('i').toggleClass("icon-plus").toggleClass("icon-minus");
	elem.toggleClass("js-toggle--active");
};

var toggle = $('.js-toggle');

toggle.on('click', function () {
	toggleNavFilter($(this));
});