
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});





/*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    chrome.tabs.sendMessage(tabId, {"message": "url_changed", "url":url});
  });
});*/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
    chrome.tabs.sendMessage(tabId, {"message": "url_changed"});  
});

/*chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.sendMessage(details.tabId, {"message": "url_changed"});
  });*/



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  if(request.message === "basic_is_finished" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "run_promo"});    	    
                }  

  if(request.message === "basic_is_finished_single" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "promo_single"});    	    
                }  




  if(request.message === "promo_is_finished" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "run_vars"});    	    
                }  

  if(request.message === "processing_var" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "current", "array": request.array, "index": request.index});    
                }  

  if(request.message === "upload_picture" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "current_pic_upload", "array": request.array, "index": request.index});    	    
                }  

  if(request.message === "start_table" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "main_table_loading"});    	    
                }  



  if(request.message === "image_request" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "give_me_an_image"}, function(response) {
		sendResponse({message: response.message});
			});    	    
                }
   

  /*if(request.message === "image_request_desc" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "give_me_an_image_for_desc", "img_num":request.img_num}, function(response) {
		sendResponse({message: response.message});
			});    	    
                }*/

  if(request.message === "image_request_desc" ) {
     chrome.tabs.sendMessage(sender.tab.id, {"message": "give_me_an_image_for_desc", "img_num":request.img_num}, function(response) {
    sendResponse({message: response.message.substring(0,response.message.search(".JPG")+4).replace("$_0.JPG", "$_10.JPG")});
      });         
                }



return true;});