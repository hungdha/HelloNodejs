(function($){
	var defaults = {
		fromTop : 50
	};

	$(function() {	
		$(document).on("scroll", onScroll );
		$("a.navigation").click(function(event) {	
			event.preventDefault();
			$(document).off("scroll", onScroll );
			offSetScroll($(this));
			activeNavigation( $(this));					
		});		
		offSetScrollFromLocation( window.location.href.toLowerCase());		
	});

	function activeNavigation( target ){
		$("ul.nav li").each(function(){
			$(this).removeClass("active");
			$(this).find("a").css("box-shadow", "");	
		});
		target.parent().addClass("active");
		target.css("box-shadow", "inset 0px -3px 0px #FFF");
	}
	function offSetScroll(anchor) {		
		var href = anchor.attr("href");
		offSetScrollFromLocation(href );
	}

	function offSetScrollFromLocation(href) {		
		
	    //Change this according to the height of the navigation bar	    	   	
	    var fromTop = 50;		  
	    if(href.split("/")[3] == ""){
	    	href = href+"#home";

	    }else if( href.indexOf("#")<=0 ) {	    		    	
	    	// neu khong co hashtag, dung scroll offset    	    	    
	    	return;
	    }		
	    var hash=href.substring(href.indexOf("#"));	   
	    if( $(hash).offset() === undefined )
	    	return;
	    else	    	
	    	var targetOffset = $(hash).offset().top-defaults.fromTop;

	    $('html, body').animate({scrollTop: targetOffset}, 500, function() {	
	    	window.location.hash = hash; 
	    	$(document).on("scroll", onScroll );   	
	    });
	}
	var menuActive = "";	
	var posHome = $("#home").offset().top - defaults.fromTop;
	var posAbout = $("#about").offset().top - defaults.fromTop;
	var posContact = $("#contact").offset().top - defaults.fromTop;

	function onScroll(event){	

		var scrollPos = $(document).scrollTop();
		var hash =  "";				
	
		if(scrollPos >= posContact ){ // position contact
			hash =  "#contact";
		}else if(scrollPos >= posAbout ){ // position about
			hash =  "#about";

		}else if( scrollPos >= posHome ) { // position home
			hash = "#home";		
		}	

		// khi nao menuActive khac hash thi change menu
		if( menuActive != hash ){

			window.location.hash = hash;
			resetMenu();
			activeMenuByHashTag(hash);
			menuActive = hash;
		}

	}	
	function resetMenu(){
		$('ul.nav li a').each( function (item) {
			$(this).css("box-shadow", "");
			$(this).parent().removeClass("active");
		});
	}
	function activeMenuByHashTag( hash ){
		$('ul.nav li a.navigation').each( function (item) {
			var href = $(this).attr("href");
			if( href.substring(href.indexOf("#")) == hash ){
				$(this).css("box-shadow", "inset 0px -3px 0px #FFF");
				$(this).parent().addClass("active");
			}
		});
	}


}(jQuery));