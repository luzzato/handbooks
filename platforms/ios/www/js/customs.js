//need to change url, also need to all files (specially index.js) for include jquery library
var HOSTNAME='http://alturkigroup-apps.com/apps/';
var API_ID='alturki';
var fontSize=15;
var APPNAME='Alturki Apps';

//var online = navigator.onLine || false;


jQuery(document).ready(function($){
	
	//notification for new message
	//messageNotification();

/*
	$(document).bind('deviceready', function(){
	    onDeviceReady()
	});
	if(online) {
	  //alert('online');
	} else {
	  $('#mainBody').html('<h1>Internet Connection Lost.</h1>');
	}
*/
	//Check Internet Connection
	//internetConnectionExist();

	//font resizing
	$('#fontResize .increase').on('click', function (event) {
		if(fontSize < 18){
			fontSize=fontSize+1;
			$('.fontControler').css({'font-size':fontSize+'px'});
		}
    });
    $('#fontResize .decrease').on('click', function (event) {
    	if(fontSize > 12){
			fontSize=fontSize-1;
			$('.fontControler').css({'font-size':fontSize+'px'});
		}
    });

	//basic paged navigation
	$('#menuMain .menuItem a, .menulinkAsContent').on('click', function (event) {
		var id=$(this).attr('data-id');
		localStorage.setItem("pageId", id);
		//alert(localStorage.getItem("pageId"));
	});

	$('.menuBtn').on('click', function (event) {
        $('#menuMain').toggleClass('active');
        setLockScrollForMenu($('#menuMain').hasClass('active'));
        //$('#main').toggleClass('active');
    });

    $('.dropdown').find('.textHolder').hide();
    //$('#menuMain').attr('style', 'height:'+$('#mainBody')[0].scrollHeight+'px');

    $( window ).resize(function() {
      //$('#menuMain').attr('style', 'height:'+$('#mainBody')[0].scrollHeight+'px');
      	$(".galleryLogo").css("top", $("header").height() / 2 + "px");
    });
	
	
	if($('#menuMain').length > 0){
		//var lang=$('body').attr('data-lang');
		//getSideBar(lang);
		getMsgEventNum();
	}
	//get live data
	if($('#menuMain').length > 0){
		var refreshId = setInterval( function() {getLiveMsgEventNum();},3000);		
	}
	if($('body#pages').length > 0){
		var lang=$('body').attr('data-lang');
		//localStorage.setItem("pageId", 1);
		getContent(lang);
	}
	if($('.gallerySlider ul.rslides').length > 0){
		getGallery();
	}
	if($('#downloadWraper').length > 0){
		var lang=$('body').attr('data-lang');
		getDownloadContent(lang);
	}
	if($('#messageWraper').length > 0){
		var lang=$('body').attr('data-lang');
		getMessages(lang);
	}
	//get live data
	if($('#messageWraper').length > 0){
		var lang=$('body').attr('data-lang');
		var refreshId = setInterval( function() {getLiveMessages(lang);},3000);		
	}
	if($('#eventListWraper').length > 0){
		var lang=$('body').attr('data-lang');
		getEventList(lang);
	}	
	//get live data
	if($('#eventListWraper').length > 0){
		var lang=$('body').attr('data-lang');
		var refreshId = setInterval( function() {getLiveEventList(lang);},3000);		
	}
	if($('#eventDetail').length > 0){
		var lang=$('body').attr('data-lang');
		getEventDetail(lang);
	}
	//comment form submit
	$( "#commentsBox form" ).submit(function( event ) {
	  	if($('#commentsBox #cname').val() =='' || $('#commentsBox #csubject').val() =='' || $('#commentsBox #comment').val() ==''){
			navigator.notification.alert('Please complete all fields.', null, APPNAME, "OK");
			return;
		}
		var lang=$('body').attr('data-lang');
		var cname=$('#commentsBox #cname').val();
		var csubject=$('#commentsBox #csubject').val();
		var comment=$('#commentsBox #comment').val();
		if($('#ajaxLoaderContent').length > 0){
			$('#ajaxLoaderContent').show();
		}
		$.getJSON(HOSTNAME+"comments.php?jsoncallback=?",
		  {
		  	cname:cname,
		  	csubject:csubject,
			comment: comment,
			lang: lang
		  },
		  function(data) {
				if(data.results.msg){
					$('#commentsBox .showMsg').html(data.results.msg);
				}
				if($('#ajaxLoaderContent').length > 0){
					$('#ajaxLoaderContent').hide();
				}
		  });
	  event.preventDefault();
	});

	$("#comment_email").text(localStorage["comment_email"])

	//
	if(isIphone()) {
		$(".newHeader").addClass("ios");
		$(".menuBtn").addClass("ios");
	}

	$(".galleryLogo").css("top", $("header").height() / 2 + "px");

});

function isIphone() {
	var userAgent = navigator.userAgent;
	userAgent = userAgent.toUpperCase();
	return (userAgent.indexOf("IPHONE") >= 0);
};

function setLockScrollForMenu(lock) {
	if(lock) {

        	var marginTop = parseFloat($("#pageContent").css("margin-top"));
        	$('#pageContent').css({'height' : ($('#menuMain').height() - marginTop) + 'px'});
        	$('#pageContent').css({'overflow' : 'hidden'});
        	$('#pageContent').css({'position' : 'fixed'});
        	$('#pageContent').css({'-webkit-backface-visibility' : 'hidden'});
        }
        else {
        	$('#pageContent').css({'height' : 'auto'});
        	$('#pageContent').css({'overflow' : 'auto'});
        	$('#pageContent').css({'position' : 'static'});
        	$('#pageContent').css({'-webkit-backface-visibility' : 'visible'});
        }
}


//login

function getUser(name, cb) {
	if(name.length < 3) {
		navigator.notification.alert('Please input at least 3 sequential characters in your name', null, APPNAME, "OK");
		return;
	}

	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"users.php",
	  {
		name: name
	  },
	  function(data) {
			if(data.results){
				cb(data.results);
			}
			if($('#ajaxLoaderContent').length > 0){
				$('#ajaxLoaderContent').hide();
			}
	  });
}
function loginUser(){
	//check internet conection

	/*if($('#password').val() =='' || $('#password').val() =='Password'){
		alert('Please enter your password.');
		return;
	}

	if($('#userid').val() =='' || $('#userid').val() == -1){
		alert('Please select your name.');
		return;
	}*/

	if($('#code').val() =='' ){
		navigator.notification.alert('Please insert code.', null, APPNAME, "OK");
		return;
	}

	//var password=$('#password').val();
	//var userid=$('#userid').val();
	/*
	var cont=localStorage.getItem('alturkiapppass');
	if(cont==password && cont!==null){
		window.location.href = "welcome.html";
		return false;
	}
	*/
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"login.php?jsoncallback=?",
	  {
		api_id: API_ID,
		code : $('#code').val()
		//password: password,
		//user_id : userid
	  },
	  function(data) {
			if(data.results.msg){

				var output=data.results.msg;
				if(output==0){
					navigator.notification.alert('Invalid code. Please try again.', null, APPNAME, "OK");
				}
				else{
					localStorage.setItem("loggedin", output);
					localStorage.setItem("alturkiapppass", $('#code').val());
					localStorage.setItem("comment_email", data.results.comment_email);
					window.location.href = "welcome.html";
					/*
					if(lang=="arabic"){
						window.location.href = "arabic-welcome.html";
					}else{
						window.location.href = "welcome.html";
					}
					*/
				}
			}
			else{
				navigator.notification.alert('Invalid login Password. Please try again.', null, APPNAME, "OK");
			}
			if($('#ajaxLoaderContent').length > 0){
				$('#ajaxLoaderContent').hide();
			}
	  });	
}

function getMsgEventNum(){
	var msgNum=localStorage.getItem('total_message');
	var eventNum=localStorage.getItem('total_event');
	if(msgNum!==null && eventNum!==null){
		$('.menuItem .msgNum').html(msgNum);
		$('.menuItem .eventNum').html(eventNum);
		return false;
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"msg-event-count.php?jsoncallback=?",{
		user_id : user_id
		},
	  function(data) {
			if(data.results.msgNum){
				$('.menuItem .msgNum').html(data.results.msgNum);
			}
			if(data.results.eventNum){
				$('.menuItem .eventNum').html(data.results.eventNum);
			}
	  });
}
function getLiveMsgEventNum(){
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"msg-event-count.php?jsoncallback=?",{
		user_id : user_id
		},
	  function(data) {
			if(data.results.msgNum){ //alert(2);
				var msgNum=data.results.msgNum;				
				$('.menuItem .msgNum').html(msgNum);
				localStorage.setItem('total_message', msgNum);
			}
			if(data.results.eventNum){
				var eventNum=data.results.eventNum;
				$('.menuItem .eventNum').html(eventNum);
				localStorage.setItem('total_event',eventNum);
			}
	  });
}
//get sidebar
/*
function getSideBar(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	if($('#ajaxLoaderMenu').length > 0){
		$('#ajaxLoaderMenu').show();
	}
	$.getJSON(HOSTNAME+"sidebar.php?jsoncallback=?",
	  {
	  	user_id : user_id,
		lang: lang
	  },
	  function(data) {
			if(data.results.msg){
				var output=data.results.msg;
				if(output==""){
					//$('#menuMain .menu').html(output);	
				}
				else{
					$('#menuMain .menu .menuInnerCont').html(output);
					mainMenuNavigation();		
				}
			}	
				
		if($('#ajaxLoaderMenu').length > 0){
			$('#ajaxLoaderMenu').hide();
		}
	  });
}
*/
//get page content

function getContent(lang){

	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var id=localStorage.getItem("pageId");
	if(!id){
		var id=7;//for president's page
	}else{
		var id=id;
	}
	var cont=getBasicPage(lang, id);
	if(cont!==null){
		$('#pageContent').html(cont);
		contentAccordion();
		return false;
	}

	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}

	$.getJSON(HOSTNAME+"pages.php?jsoncallback=?",
	  {
	  	id: id,
		lang: lang
	  },
	  function(data) {
			if(data.results.msg){
				var content=data.results.msg;
				if(content==""){	
				}
				else{
					$('#pageContent').html(content);	
					contentAccordion();	
				}
			}
			if(data.results.page_title){
				var page_title=data.results.page_title;
				if(page_title==""){	
				}
				else{
					$('#pageTitle').html(page_title);		
				}
			}
			if($('#ajaxLoaderContent').length > 0){
				$('#ajaxLoaderContent').hide();
			}
	  });
}
function getBasicPage(lang, id){
	var cont="";
	if(id==2){
		if(lang=='arabic'){
			cont=localStorage.getItem("talent_page_arabic");
			$('#pageTitle').html('إدارة المواهب');
		}else{
			cont=localStorage.getItem("talent_page_english");
			$('#pageTitle').html('Talent Management');
		}
	}else if(id==3){
		if(lang=='arabic'){
			cont=localStorage.getItem("employee_page_arabic");
			$('#pageTitle').html('سياسة علاقات الموظفين');
		}else{
			cont=localStorage.getItem("employee_page_english");
			$('#pageTitle').html('Employee Relations');
		}
	}else if(id==4){
		if(lang=='arabic'){
			cont=localStorage.getItem("business_page_arabic");
			$('#pageTitle').html('سياسة السفر للعمل');
		}else{
			cont=localStorage.getItem("business_page_english");
			$('#pageTitle').html('Business Travel');
		}
	}else if(id==5){
		if(lang=='arabic'){
			cont=localStorage.getItem("rewards_page_arabic");
			$('#pageTitle').html('سياسة إجمالي المكافآت');
		}else{
			cont=localStorage.getItem("rewards_page_english");
			$('#pageTitle').html('Total Rewards');
		}
	}else if(id==6){
		if(lang=='arabic'){
			cont=localStorage.getItem("about_page_arabic");
			$('#pageTitle').html('حول تطبيقات');
		}else{
			cont=localStorage.getItem("about_page_english");
			$('#pageTitle').html('About the apps');
		}
	}else if(id==1){
		if(lang=='arabic'){
			cont=localStorage.getItem("introduction_page_arabic");
			$('#pageTitle').html('مقدمة');
		}else{
			cont=localStorage.getItem("introduction_page_english");
			$('#pageTitle').html('Introduction');
		}
	}else{
		if(lang=='arabic'){
			cont=localStorage.getItem("president_page_arabic");
			$('#pageTitle').html('خطاب الرئيس الترحيبي');
		}else{
			cont=localStorage.getItem("president_page_english");
			$('#pageTitle').html('President’s Note');
		}
	}
	return cont;
}
//get gallery
function getGallery(){
	
	var cont="";
	cont=localStorage.getItem("gallery_images");
	if(cont!==null){
		$('.gallerySlider .rslides').html(cont);
		//$(".rslides li img").css({width: "100%"});
		//slider start
		$(".rslides").responsiveSlides({
				speed: 1000,
				auto: true,
				timeout: 4000,
  				nav: false,
				after: function(){
					console.log("responsiveSlides");
					// $(".rslides li.rslides1_on img").animate({"width": "100%"}, 4000, "swing", function() {
					// 	$(".rslides li.rslides1_on img").css({"width": "150%"});
					// });
					$(".rslides li.rslides1_on img").stop(true, true);
					$(".rslides li.rslides1_on img").css({"width": "120%"});

					$(".rslides li.rslides1_on img").animate({"width": "140%"}, 3000, "swing", function() {
						$(".rslides li.rslides1_on img").css({"width": "120%"});
					});
				}
			});
		//end slider
		return false;
	}
	
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"gallery.php?jsoncallback=?",{},
	  function(data) {
			if(data.results.msg){
				var output=data.results.msg;
				if(output){	
					$('.gallerySlider .rslides').html(output);
					//start slider
					//$(".rslides li img").css({width: "100%"});
					$(".rslides").responsiveSlides({
						speed: 1000,
						auto: true,
						timeout: 7000,
		  				nav: false,
						after: function(){
							console.log("responsiveSlides1");
							// var newSize = $('.rslides li.rslides1_on').width() + 40;
							// $(".rslides li.rslides1_on img").animate({width: newSize+"px"},8000);
							// setTimeout(function () {
							// 	$(".rslides li.rslides1_on img").animate({width: "100%"},8000);
							// }, 4990)

							$(".rslides li.rslides1_on img").stop(true, true);
							$(".rslides li.rslides1_on img").css({"width": "120%"});

							$(".rslides li.rslides1_on img").animate({"width": "140%"}, 6000, "swing", function() {
								$(".rslides li.rslides1_on img").css({"width": "120%"});
							});
						}
					});
					//end of slider
				}
			}
			if($('#ajaxLoaderContent').length > 0){
				$('#ajaxLoaderContent').hide();
			}
	  });
}
//get gallery
function getDownloadContent(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var cont="";
	if(lang=='arabic'){
		cont=localStorage.getItem("download_page_arabic");
	}else{
		cont=localStorage.getItem("download_page_english");
	}
	if(cont!==null){
		$('#downloadWraper').html(cont);
		return false;
	}
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"download.php?jsoncallback=?",{
		lang : lang
	},
  function(data) {
		if(data.results.msg){
			var output=data.results.msg;
			if(output){
				$('#downloadWraper').html(output);
			}
		}
		if($('#ajaxLoaderContent').length > 0){
			$('#ajaxLoaderContent').hide();
		}
  });
}
//get messages
function getMessages(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var cont="";
	if(lang=='arabic'){
		cont=localStorage.getItem("message_page_arabic");
	}else{
		cont=localStorage.getItem("message_page_english");
	}
	if(cont!==null){
		$('#messageWraper').html(cont);
		return false;
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"message.php?jsoncallback=?",{
		user_id : user_id,
		lang : lang
	},
  function(data) {
		if(data.results.msg){
			var output=data.results.msg;
			if(output){
				$('#messageWraper').html(output);
			}
		}
		if($('#ajaxLoaderContent').length > 0){
			$('#ajaxLoaderContent').hide();
		}
  });
}
//get live messages
function getLiveMessages(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"messageLive.php?jsoncallback=?",{
		user_id : user_id,
		lang : lang
	},
  function(data) {
		if(data.results.msg){
			var output=data.results.msg;
			if(output){
				$('#messageWraper').html(output);
				if(lang=="arabic"){
					localStorage.setItem("message_page_arabic", output);
					}else{
					localStorage.setItem("message_page_english", output);
					}
			}
		}
  });
}
//get events
function getEventList(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	var cont="";
	if(lang=='arabic'){
		cont=localStorage.getItem("event_page_arabic");
	}else{
		cont=localStorage.getItem("event_page_english");
	}
	if(cont!==null){
		$('#eventListWraper').html(cont);
		eventReadMore();
		return false;
	}
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}
	$.getJSON(HOSTNAME+"events.php?jsoncallback=?",{
		user_id : user_id,
		lang : lang
	},
  function(data) {
		if(data.results.msg){
			var output=data.results.msg;
			if(output){
				$('#eventListWraper').html(output);
				eventReadMore();
			}
		}
		if($('#ajaxLoaderContent').length > 0){
			$('#ajaxLoaderContent').hide();
		}
  });
}
//get events
function getLiveEventList(lang){
	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"eventsLive.php?jsoncallback=?",{
		user_id : user_id,
		lang : lang
	},
  function(data) {
		if(data.results){			
			if(lang=="arabic" && data.results.event_page_arabic){
				var output=data.results.event_page_arabic;
				$('#eventListWraper').html(output);
			}else{
				var output=data.results.event_page_english;
				$('#eventListWraper').html(output);
			}
			eventReadMore();
				//event page
				if(data.results.event_page_english){
					$content=data.results.event_page_english;
					localStorage.setItem("event_page_english", $content);
				}
				if(data.results.event_page_arabic){
					$content=data.results.event_page_arabic;
					localStorage.setItem("event_page_arabic", $content);
				}
				//event details contents
				if(data.results.event_detail_english){
					var obj = data.results.event_detail_english;
					$.each( obj, function( key, value ) {
					  //alert( key + ": " + value );
					  if(value){
					  	localStorage.setItem("event_english_id_"+key, value);
					  }else{
					  	localStorage.setItem("event_english_id_"+key, null);
					  }
					});
				}
				if(data.results.event_detail_arabic){
					var obj = data.results.event_detail_arabic;
					$.each( obj, function( key, value ) {
					  //alert( key + ": " + value );
					  if(value){
					  	localStorage.setItem("event_arabic_id_"+key, value);
					  }else{
					  	localStorage.setItem("event_arabic_id_"+key, null);
					  }
					});
				}
		}
  });
}
//get Event Detail

function getEventDetail(lang){

	if(lang){
		var lang=lang;
	}else{
		var lang='english';
	}
	var id=localStorage.getItem("eventId");
	if(!id){
		var id=0;
	}else{
		var id=id;
	}
	//call ajax for move unread event to read status
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"update-event-status.php?jsoncallback=?",
	  {
	  	id : id,
	  	user_id : user_id
	  },
	  function(data) {
	  	if(data.results.msg){
	  		//alert(data.results.msg);
			}
	  });
	//find into the local storage
	var cont=getEventLocalStorage(lang, id);
	if(cont!==null){
		$('#eventDetail').html(cont);
		return false;
	}
	if($('#ajaxLoaderContent').length > 0){
		$('#ajaxLoaderContent').show();
	}

	$.getJSON(HOSTNAME+"event-detail.php?jsoncallback=?",
	  {
	  	id : id,
		lang: lang
	  },
	  function(data) {
			if(data.results.msg){
				var content=data.results.msg;
				if(content){
					$('#eventDetail').html(content);	
				}
			}
			if($('#ajaxLoaderContent').length > 0){
				$('#ajaxLoaderContent').hide();
			}
	  });
}
//find event detail from local storage
function getEventLocalStorage(lang, id){
	var cont="";
	if(lang && id){
		if(lang=='arabic'){
			cont=localStorage.getItem("event_arabic_id_"+id);
		}else{
			cont=localStorage.getItem("event_english_id_"+id);
		}
	}
	return cont;
}
//get message notification
/*
function messageNotification(){
	var user_id=localStorage.getItem("loggedin");
	if(!user_id){
		var user_id=0;
	}else{
		var user_id=user_id;
	}
	$.getJSON(HOSTNAME+"notification.php?jsoncallback=?",{
		user_id : user_id
	},
	  function(data) {
			if(data.results.msg){
				var output=data.results.msg;
				if(output){	
					alert(output);
				}
			}
	  });
}
*/
//logout
function logOut(){
	if(localStorage.getItem("loggedin")){
		localStorage.setItem("loggedin", null);
	}
	if(localStorage.getItem("alturkiapppass")){
		localStorage.setItem("alturkiapppass", "");
	}
	window.location.href = "index.html";
}
//download content to the local storage
function downloadToLocalStorage(){
	navigator.notification.confirm("Are you sure want to refresh application?", function(buttonIdx) {
		if(buttonIdx != 1)
			return;

		if($('#overlay').length > 0){
			$('#overlay').show();
		}
		var user_id=localStorage.getItem("loggedin");
		if(!user_id) {
			var user_id=0;
		} else {
			var user_id=user_id;
		}
		$.getJSON(HOSTNAME+"downloadToLocalStorage.php?jsoncallback=?",{
			user_id : user_id
		},
		function(data) {
			if(data.results){
				//event details contents
				if(data.results.event_detail_english){
					var obj = data.results.event_detail_english;
					$.each( obj, function( key, value ) {
					  //alert( key + ": " + value );
					  if(value){
					  	localStorage.setItem("event_english_id_"+key, value);
					  }else{
					  	localStorage.setItem("event_english_id_"+key, null);
					  }
					});
				}
				if(data.results.event_detail_arabic){
					var obj = data.results.event_detail_arabic;
					$.each( obj, function( key, value ) {
					  //alert( key + ": " + value );
					  if(value){
					  	localStorage.setItem("event_arabic_id_"+key, value);
					  }else{
					  	localStorage.setItem("event_arabic_id_"+key, null);
					  }
					});
				}
				//President page
				if(data.results.president_page_english){
					$content=data.results.president_page_english;
					localStorage.setItem("president_page_english", $content);
				}else{
					localStorage.setItem("president_page_english", null);
				}
				if(data.results.president_page_arabic){
					$content=data.results.president_page_arabic;
					localStorage.setItem("president_page_arabic", $content);
				}else{
					localStorage.setItem("president_page_arabic", null);
				}
				//Introduction page
				if(data.results.introduction_page_english){
					$content=data.results.introduction_page_english;
					localStorage.setItem("introduction_page_english", $content);
				}else{
					localStorage.setItem("introduction_page_english", null);
				}
				if(data.results.introduction_page_arabic){
					$content=data.results.introduction_page_arabic;
					localStorage.setItem("introduction_page_arabic", $content);
				}else{
					localStorage.setItem("introduction_page_arabic", null);
				}
				//Talent Management page
				if(data.results.talent_page_english){
					$content=data.results.talent_page_english;
					localStorage.setItem("talent_page_english", $content);
				}else{
					localStorage.setItem("talent_page_english", null);
				}
				if(data.results.talent_page_arabic){
					$content=data.results.talent_page_arabic;
					localStorage.setItem("talent_page_arabic", $content);
				}else{
					localStorage.setItem("talent_page_arabic", null);
				}
				//Employee Relations page
				if(data.results.employee_page_english){
					$content=data.results.employee_page_english;
					localStorage.setItem("employee_page_english", $content);
				}else{
					localStorage.setItem("employee_page_english", null);
				}
				if(data.results.employee_page_arabic){
					$content=data.results.employee_page_arabic;
					localStorage.setItem("employee_page_arabic", $content);
				}else{
					localStorage.setItem("employee_page_arabic", null);
				}
				//Business Travel page
				if(data.results.business_page_english){
					$content=data.results.business_page_english;
					localStorage.setItem("business_page_english", $content);
				}else{
					localStorage.setItem("business_page_english", null);
				}
				if(data.results.business_page_arabic){
					$content=data.results.business_page_arabic;
					localStorage.setItem("business_page_arabic", $content);
				}else{
					localStorage.setItem("business_page_arabic", null);
				}			
				//Total Rewards
				if(data.results.rewards_page_english){
					$content=data.results.rewards_page_english;
					localStorage.setItem("rewards_page_english", $content);
				}else{
					localStorage.setItem("rewards_page_english", null);
				}
				if(data.results.rewards_page_arabic){
					$content=data.results.rewards_page_arabic;
					localStorage.setItem("rewards_page_arabic", $content);
				}else{
					localStorage.setItem("rewards_page_arabic", null);
				}			
				//About page
				if(data.results.about_page_english){
					$content=data.results.about_page_english;
					localStorage.setItem("about_page_english", $content);
				}else{
					localStorage.setItem("about_page_english", null);
				}
				if(data.results.about_page_arabic){
					$content=data.results.about_page_arabic;
					localStorage.setItem("about_page_arabic", $content);
				}else{
					localStorage.setItem("about_page_arabic", null);
				}
				//message page
				if(data.results.message_page_english){
					$content=data.results.message_page_english;
					localStorage.setItem("message_page_english", $content);
				}else{
					localStorage.setItem("message_page_english", null);
				}
				if(data.results.message_page_arabic){
					$content=data.results.message_page_arabic;
					localStorage.setItem("message_page_arabic", $content);
				}else{
					localStorage.setItem("message_page_arabic", null);
				}
				//event page
				if(data.results.event_page_english){
					$content=data.results.event_page_english;
					localStorage.setItem("event_page_english", $content);
				}else{
					localStorage.setItem("event_page_english", null);
				}
				if(data.results.event_page_arabic){
					$content=data.results.event_page_arabic;
					localStorage.setItem("event_page_arabic", $content);
				}else{
					localStorage.setItem("event_page_arabic", null);
				}
				//download page
				if(data.results.download_page_english){
					$content=data.results.download_page_english;
					localStorage.setItem("download_page_english", $content);
				}else{
					localStorage.setItem("download_page_english", null);
				}
				if(data.results.download_page_arabic){
					$content=data.results.download_page_arabic;
					localStorage.setItem("download_page_arabic", $content);
				}else{
					localStorage.setItem("download_page_arabic", null);
				}
				if(data.results.total_message){
					$content=data.results.total_message;
					localStorage.setItem("total_message", $content);
				}else{
					localStorage.setItem("total_message", null);
				}
				if(data.results.total_event){
					$content=data.results.total_event;
					localStorage.setItem("total_event", $content);
				}else{
					localStorage.setItem("total_event", null);
				}
				//gallery images base64 code
				
				if(data.results.gallery_images){
					$content=data.results.gallery_images;
					localStorage.setItem("gallery_images", $content);
				}else{
					localStorage.setItem("gallery_images", null);
				}
				
			}
			if($('#overlay').length > 0){
				$('#overlay').hide();
			}
			navigator.notification.alert('Application successfully updated.', null, APPNAME, "OK");
		});
	}, APPNAME, 'Yes,Cancel');
	
}
//main menu pagination
/*
function mainMenuNavigation(){
	//basic paged navigation
	$('#menuMain .menuItem a').on('click', function (event) {
		var id=$(this).attr('data-id');
		localStorage.setItem("pageId", id);
		//alert(localStorage.getItem("pageId"));
	});
}
*/
//
function eventReadMore(){
	$('#eventListWraper .viewMore a').on('click', function (event) {
		var id=$(this).attr('data-id');
		localStorage.setItem("eventId", id);
		//alert(localStorage.getItem("eventId"));
	});
}			

function correctTableWidth() {
	$("table").each(function(idx, table) {
		console.log($(table).width() + "px");
		if($(table).width() > $($("div.textHolder:visible")[0]).width()) {
			var ratio = $($("div.textHolder:visible")[0]).width() / $(table).width();
			$(table).css("font-size", ratio + "em");
		}
	});
}
//page accordion after ajax call
function contentAccordion(){
	$('.dropdown').find('.textHolder').hide();
	$('.line').on('click', function (event) {
    	if ( $(this).hasClass('active') ) {

            $(this).parent().find('.textHolder').removeClass('active');
            //setTimeout(function(){ $('#menuMain').attr('style', 'height:'+$('#mainBody')[0].scrollHeight+'px'); }, 600);
            $(this).parent().find('.textHolder').hide("slow");
            $(this).removeClass('active');
            $(this).parent().find('.pullRight').text('+');

    	} else {
            $('.dropdown').find('.pullRight').text('+');
            $('.line').removeClass('active');
            $('.dropdown').find('.textHolder').hide("slow");
            $(this).parent().find('.textHolder').show("slow");

            $(this).addClass('active');
            $(this).parent().find('.pullRight').text('-');
            //setTimeout(function(){ $('#menuMain').attr('style', 'height:'+$('#mainBody')[0].scrollHeight+'px'); }, 600);

            setTimeout(function() {
            	correctTableWidth();
            }, 1000);
        }
    })


}
