let pol_ind=0;

let list=new Array();
let full_list=new Array();

let catalog_tab_id=0;
let active_tab_id=0;

let str_tab_id=0;

let option=0;

let domestic_services="US_EconomyShippingFromGC";

let domestic_handling=5; // HANDLING TIME in Days. Possible values: 1, 2, 3, 4, 5, 10, 15, 20, 30		

let international_services="US_IntlEconomyShippingFromGC";

let run_mode=false;


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];    
    pol_ind=0;		
	active_tab_id=0;
	run_mode=false;
	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.tabs.onUpdated.addListener(function (tabId , info, tab) {	
	if (info.status === 'complete') {				

		if (tab.url.indexOf("www.bizpolicy.ebay.com/businesspolicy/manage?entriesPerPage=10000")!==-1) {
			catalog_tab_id=tabId;
			chrome.tabs.sendMessage(tabId, {"message": "catalog_is_loaded"});			
		} else if (tab.url.search("www.bizpolicy.ebay.com/businesspolicy/manage")!==-1 && pol_ind>=0 && (tabId==active_tab_id)){ 					
					if(pol_ind+1<list.length){
						pol_ind++;
						chrome.tabs.sendMessage(tabId, {"message": "processing", "policy": list[pol_ind]}); 					
					} else {
						pol_ind=-10;
						chrome.tabs.remove(active_tab_id);
					}
		} else if (tab.url.search("www.bizpolicy.ebay.com/businesspolicy/shipping")!==-1 && pol_ind>=0 && (!active_tab_id || tabId==active_tab_id)){
			if (catalog_tab_id) {
				chrome.tabs.remove(catalog_tab_id);
				catalog_tab_id=0;
			}
			if (!active_tab_id){
				active_tab_id=tabId;
			}
			chrome.tabs.sendMessage(tabId, {
				"message":"page_is_loaded", 
				"option": option,
				"ind":pol_ind, 
				"name":list[pol_ind].name, 
				"length":list.length,
				"domestic_services":domestic_services,				
				"domestic_handling":domestic_handling,
				"international_services":international_services,	
				"run_mode":run_mode,			
			});
		}
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {  	
  	if( request.message === "list_is_ready" ){
		pol_ind=0;	

		list=request.list;
		full_list=request.full_list_from_app;

		option=request.option;
		chrome.tabs.sendMessage(sender.tab.id, {"message": "processing", "policy": list[pol_ind]});		
	}	

	if ( request.message === "domestic_services" ) {domestic_services=request.value};
	
	if ( request.message === "domestic_handling" ) {domestic_handling=request.value};

	if ( request.message === "international_services" ) {international_services=request.value};

	if ( request.message === "run_mode" ) {run_mode=request.value};	
});