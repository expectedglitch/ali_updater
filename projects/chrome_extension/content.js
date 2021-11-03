let disabled=true;

if (document.getElementsByTagName('div').length) {

    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {  
            if (request.message === "browser_action" ) {                
                disabled=!disabled;
                                
                if (!disabled){
                    let ifrm = document.createElement('iframe');                    

                    Object.entries({ src: chrome.runtime.getURL('angular/index.html'),                                         
                        id: "ebay_listing", 
                        title: "eBay_Listing"
                    }).map(x=>ifrm.setAttribute(x[0],x[1]))
                                                                        
                    let wrap = document.createElement('div');
                        wrap.classList.add('ebay-listing-wrapper');
                    let ttl = document.createElement('div');
                        ttl.classList.add('title');
                        ttl.innerHTML = 'eBay Listing Extension';
                    wrap.appendChild(ttl);
                    wrap.appendChild(ifrm);
                    document.getElementById('root').appendChild(wrap);
                    
                    $('body').addClass('qqq');                        
                } else {
                    $('body').removeClass('qqq');
                    document.getElementsByClassName('ebay-listing-wrapper')[0].remove();
                }
                sendResponse({disabled:disabled})                
            }            
        }
    )
            
}