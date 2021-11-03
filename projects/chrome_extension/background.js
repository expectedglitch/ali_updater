chrome.browserAction.onClicked.addListener(_ => {    
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {                        
        if (tab.url.includes('https://www.aliexpress.com/item')) {                                 
            chrome.tabs.sendMessage(tab.id, {"message": "browser_action"}, 
                response => chrome.browserAction.setIcon({ path: !response.disabled?"icon_active.png":"icon.png", tabId: tab.id })
            );        
        }
    });
} );
  

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {  
        if(request.message === "get_tab_url" ) {            
            chrome.tabs.sendMessage(sender.tab.id, {"message": "tab_url", "url": sender.tab.url});    	    
        }       
    }
)