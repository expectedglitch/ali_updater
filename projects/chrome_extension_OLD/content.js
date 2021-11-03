var list=new Array();
var colors=new Array;
colors=[{ "back": "#0000FF", "text": "white" },
	{ "back": "#8A2BE2", "text": "white" },
	{ "back": "#A52A2A", "text": "white" },
	{ "back": "#7FFF00", "text": "black" },
	{ "back": "#FF7F50", "text": "black" },
	{ "back": "#DC143C", "text": "white" },
	{ "back": "#00FFFF", "text": "black" },
	{ "back": "#008B8B", "text": "white" },
	{ "back": "#006400", "text": "white" },
	{ "back": "#8B008B", "text": "white" },
	{ "back": "#8B0000", "text": "white" },
	{ "back": "#9400D3", "text": "white" }
				];


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null) {
		return null;
	}
		return decodeURI(results[1]) || 0;
	}


msku_variations();


pictures();


if (document.URL.search("https://www.ebay.com/sh/lst/drafts")!==-1 || document.URL.search("https://www.ebay.com/sh/lst/active")!==-1) {
	catalog_indication();
}


/*if (document.URL.search("https://bulksell.ebay.com/ws/eBayISAPI.dll")!==-1 && ($.urlParam('draftId')!==null || $.urlParam('DraftURL')!==null)){*/
if (document.URL.search("https://bulksell.ebay.com/ws/eBayISAPI.dll")!==-1){
	//block_sku();
	listing_controls();	
	expandable_bar();
	desc_pic_choosing();
}

if (document.URL.search("aliexpress.com/item/")!==-1){	
	ali_load_button();
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  if (request.message === "url_changed" && (document.URL.search("https://www.ebay.com/sh/lst/active")!==-1 || document.URL.search("https://www.ebay.com/sh/lst/drafts")!==-1)) 
  		{console.log('looks like pagination activity...');   			
  			catalog_indication('pagination');}

  if( request.message === "run_promo" || request.message === "promo_single") {run_promo(request);}

  if( request.message === "run_vars" ) {run_vars(request);}

  if( request.message === "current" ) {current(request);} 

  if( request.message === "current_pic_upload" ) {current_pic_upload(request);} 

  if( request.message === "give_me_an_image" ) {    
	    if (document.URL.search("picupload/main")!==-1 && window.name!=="photo-iframe-picupload-variations" && window.name!=="photo-iframe-photos-default") {  
		$resp=$("#tg-thumbs li:eq(0) img:eq(0)").attr("src");
		if ($resp!==undefined) sendResponse({"message": $resp}); else sendResponse({"message": ""});
	}
  }

  if( request.message === "main_table_loading" ) {main_table_loading(request);}

  if( request.message === "give_me_an_image_for_desc" ) {
		if (document.URL.search("picupload/main")!==-1 && window.name!=="photo-iframe-picupload-variations" && window.name!=="photo-iframe-photos-default") {  
			$resp=$("#tg-thumbs li:eq("+request.img_num+") img:eq(0)").attr("src");
			if ($resp!==undefined) sendResponse({"message": $resp}); else sendResponse({"message": ""});
			}
		}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------			   
	
return true;});
