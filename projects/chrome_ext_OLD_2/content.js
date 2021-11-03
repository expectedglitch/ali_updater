chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "clicked_browser_action" ) {


//----------------------------------------
//views=document.getElementsByClassName("shui-dt-column__visitCount");
//SKUs=document.getElementsByClassName("shui-dt-column__listingSKU");
tb=document.getElementById("sh-page-gridData-gridContent-grid");
rows=tb.getElementsByTagName("tbody");

str="";
for (i=0; i<rows.length;i++){
    code=rows[i].getElementsByTagName("tr")[0].getAttribute("data-id");
    views=rows[i].getElementsByClassName("shui-dt-column__visitCount")[0].innerText;
    
    mini_pic=rows[i].getElementsByTagName("tr")[0].getElementsByClassName("shui-dt-column__image")[0].getElementsByTagName("img")[0];
    
    if (mini_pic.hasAttribute("data-src")) {pic_link=mini_pic.getAttribute("data-src");}
    else {pic_link=mini_pic.getAttribute("src");}
    

    str+=code+" "+views+" "+pic_link+"<br>";
}


var myWindow = window.open();
                           myWindow.document.open();
                           myWindow.document.write(str);
                           myWindow.document.close();
//--------------------------------------


    }
	
return true;});