desc_css='footer { margin-top: 20px; padding-top: 20px; padding-right: 20px; padding-left: 20px; border: 1px solid #d3d3d3; text-align: center; } footer .s_name span { padding-bottom: 20px; display: block; font-size: 13px; } footer .s_name span b1 { color: #0000cd; font-size: 15px; } .flex-container { display: flex; background-color: #fff; flex-wrap: wrap; padding: 10px; } .flex-container > div { flex: 40% 1 0; } .text_1 { margin-right: 10px; padding-bottom: 15px; } .image_1 { margin-left: 10px; } .image_1 img { width: 100%; max-height: 100%; } .desc_title { height: 50px; font-size: 18px; font-weight: 700; margin-bottom: 15px; } .desc_text, .desc_title { background-color: #f1f1f1; border: 1px solid LightGray; padding: 20px; -webkit-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); -moz-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); } @media screen and (max-width: 800px) { .flex-container { flex-flow: column; } }';
desc_html='<header><div class="s_name"><font face="Helvetica"><div></div></font></div></header><div class="flex-container"><div class="text_1"><div class="desc_title"><font face="Helvetica"><div>[title]</div></font></div><div class="desc_text editable trig" style="font-size:13px" contenteditable="false" spellcheck="false"><font face="Helvetica" style=""><div class="from_specs" style="">Type: <b style="">Hot Water Bottle</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Material: <b style="">Rubber</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Item Color: <b style="">Pink / Blue / Gray</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Item Size (S): <b style="">20 cm x 14 cm (7,87 in x 5.51 in)</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Item Size (M): <b style="">25,5 cm x 15,2 cm (10 in x 6 in)</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Item Size (L): <b style="">31,5 cm x 19 cm (12,4 in x 7,48 in)</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Package Includes: <b style="">1 pcs x Hot Water Bottle</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Volume: <b style="">500 ml / 1000 ml / 2000 ml</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Features 1: <b style="">High-Temperature Resistance, Anti-scalding</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Features 2: <b style="">Durable, Soft, Non-slip, Leak-proof</b></div><div class="from_specs" style=""><br style=""></div><div class="from_specs" style="">Design: <b style="">Diagonal Stripe Design</b></div><div class="from_specs" style=""><br style=""></div><div style=""><div style=""><div style="">This stylish Hot Water Bottle will warm you while you are sitting in an armchair with your favorite book or working at a computer.</div></div><div style=""><br style=""></div><div style=""><div style="">The texture is soft and warm, and the grip is comfortable, giving you the warmest feelings.</div><div style=""><br style=""></div><div style="">Hot Water Bag is equipped with a spiral cover.</div><div style="">Widening the water inlet facilitates water injection and prevents splashing.</div><div style="">&nbsp;</div></div><div style=""><div style="">Notice:</div><div style="">Due to the different monitor and light effects, the actual color may be slightly different from the picture.</div><div style="">Please, allow 1 - 2 cm differs due to manual measurement.</div></div><div style=""><br style=""></div></div></font></div><footer><div class="s_name"><font face="Tahoma"><div><span><u>First-hand Store:</u>&nbsp;<b1>"Dear Buyers, your satisfaction is our Top Priority!</b1></span> <span><b1>Please, feel free to contact us upon any possible questions! :)</b1></span></div></font></div></footer></div><div class="image_1"></div></div>';

function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
	s=input.charCodeAt(i);
    if (s<=127) output += input.charAt(i);

    if (s==253 || s==255) output += "y";
    if (s>=249 && s<=252) output += "u";
    if ((s>=242 && s<=246)||(s==248)||(s==240)) output += "o";
	if (s==247) output += "%";
	if (s==241) output += "n";
    if (s>=236 && s<=239) output += "i";
	if (s>=232 && s<=235) output += "e";
	if (s==231) output += "c";
	if (s==230) output += "&";	
	if (s>=224 && s<=229) output += "a";
	if ((s>=222 && s<=223)||(s==254)) output += "b";
	if (s==221) output += "Y";	
	if (s>=217 && s<=220) output += "U";
	if (s==215) output += "x";	
	if ((s>=210 && s<=214)||(s==216)) output += "O";
	if (s==209) output += "N";		
	if (s==208) output += "D";			
	if (s>=204 && s<=207) output += "I";
	if (s>=200 && s<=203) output += "E";	
	if (s==199) output += "C";			
	if (s>=192 && s<=198) output += "A";		
    }
    return output;
}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//function image_request_desc(img_num) {
	//chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":img_num}, function(response){
		//$image=response.message.substring(0,response.message.search(".JPG")+4).replace("$_0.JPG", "$_10.JPG");
		
		// iframe = $("#rteDiv iframe:eq(1)")[0];
		// iframe.contentWindow.document.getElementsByClassName("image_1")[0].innerHTML+='<img src='+$image +' alt="main_image">';
	//});
//}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function convertToPlain(html){    
//     var tempDivElement = document.createElement("div");    
//     tempDivElement.innerHTML = html;
//     return tempDivElement.textContent || tempDivElement.innerText || "";
// }

function insert_template(){
	iframe = $("#rteDiv iframe:eq(1)")[0];	
	var prevTxt= iframe.contentWindow.document.getElementsByTagName("body")[0].innerText;		

	$("#rteDiv a.std-lnk")[0].click();
	iframe = $("#rteDiv iframe:eq(0)")[0];			

	iframe.contentWindow.document.getElementsByTagName("body")[0].innerText='<style>'+desc_css+'</style>'+desc_html.replace("[title]",$("#editpane_title").val());
	
	$("#rteDiv a.htm-lnk")[0].click();

	iframe = $("#rteDiv iframe:eq(1)")[0];
	
	iframe.contentWindow.document.getElementsByClassName("desc_text")[0].innerHTML='<div style></div>';
	iframe.contentWindow.document.getElementsByClassName("desc_text")[0].getElementsByTagName("div")[0].innerText=prevTxt;
	//iframe.contentWindow.document.getElementsByClassName("desc_text")[0].setAttribute("contenteditable", "true");
	//iframe.contentWindow.document.getElementsByClassName("image_1")[0].setAttribute("contenteditable", "true");

	//image_request_desc(0);	
	chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":0}, function(response){
		iframe = $("#rteDiv iframe:eq(1)")[0];
		iframe.contentWindow.document.getElementsByClassName("image_1")[0].innerHTML+='<img src='+response.message +' alt="main_image">';
	});
}



function save_function(a_l, a_n, e_l, cats){
	//this function is being executed when when the Save button is cliked. The type of action is defined in the previous function (Save_btn_action) - it is defined by setting the parameters.......
	chrome.runtime.sendMessage({"message": "image_request"}, function(response){		

		$image=response.message.substring(0,response.message.search(".JPG")+4).replace("$_0.JPG", "$_02.JPG");

		sku_1=$.trim($("#editpane_skuNumber").val()).replace(/\s{2,}/g, ' ');
		if (!sku_1) {
			alert ("SKU is NOT set! You should first load the Basic data before Saving!");
		} else {

			note_1="";
			note_2="";
			txt="";
			
			if($("#storeCat").val()==1) note_1=" The Store Category is set to Other.";
			if ($image=="") note_2=" The Default image is not set.";
	
			x=1;
			if (note_1.length>0 || note_2.length>0) {
				txt+="The following remarks were made: "+note_1+note_2+" Would you like to continue without correting them?"; x = confirm(txt);
			}

			$.post( "https://listva-aw.com/settings/read_settings.php",
			       {	},
				function(resp) {
				response = JSON.parse(resp);			
				$allow_anonim=(response.allow_anonim==1) ? 1 : 0; 
				
				if(x==true) {$("#privateAuction").prop("checked", $allow_anonim);  //here we will aslo try to set the "Allow buyers to stay anonim" property... 

					// if ($('[value="Save as draft"]').length) save_btn=$('[value="Save as draft"]');
					// if ($('[value="Update listing"]').length) save_btn=$('[value="Update listing"]');
					

					if ($("#to_save_or_not").prop("checked")) {			
						profile(a_l, a_n, e_l, cats, $image, true);   //collecting the profile data (fields) for the Assistant................						
						//save_btn.trigger("click");
					} else {
						profile(a_l, a_n, e_l, cats, $image, false);
					}
				}

			});

		}
	});

}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function profile(a_l, a_n, e_l, cats, img, to_save){

var str_tmp=new Array;
var str_tmp_frequent=new Array();
var str_tmp_adds=new Array();
var k=0;
var str=new Array();

var results_vals=new Array();
var item_title="";
var item_description="";

var prefilled=new Array();
str.push(document.getElementById("editpane_skuNumber").value);  //SKU.................
str.push(a_l);
str.push(a_n);
str.push(e_l);
var excl="Brand, MPN, Model, Country/Region of Manufacture, Modified Item, California Prop 65 Warning"; //These fields are going to be excluded as they are already filled and there's no need for Assistant to fill them...

function checkFr(itm) {
  return itm == str_tmp_frequent[k];
}

function checkAd(itm) {
  return itm == str_tmp_adds[k];
}

if ($("#editpane_title").val().length>=65) item_title=$("#editpane_title").val(); // here we're getting the item title to send to assistant (if the title is long enough - otherwise the title will be set as zero-length string, so the ALi-title will be displayed in the assistant's service)

iframe = $("#rteDiv iframe:eq(1)")[0];	//now we will take the description to send to assistant
description= iframe.contentWindow.document.getElementsByTagName("body")[0].innerText;		
if (description.length>10) {	
	desc_node = iframe.contentWindow.document.getElementsByTagName("body")[0].cloneNode(true);
	if ($(desc_node).find('.flex-container .text_1 .desc_title').length) { //here we are checking if the template is correct................
		$(desc_node).find('style').remove();
		item_description=$(desc_node).html();
	} else { //if it's not correct then we'll send only a notification..........
		item_description='<div> THE TEMPLATE IS INCORRECT on eBay_s SIDE </div>'
	}
}


$fields=$("fieldset:eq(1) .eisi-padBtm");

for (i=0; i<$fields.length; i++) { //here we will be looping through all of the fields to collect them and their values.......

	lst=$fields.eq(i).find(".mnu");	
	
	if ($fields.eq(i).find(".eib-ld:eq(0)").length) { //in case that's a "normal" filed.....						
		title=$fields.eq(i).find(".eib-ld:eq(0) span:eq(0)").text(); 		
		if (!$fields.eq(i).parents('div#optItemSpec').length) {
			req="recommended";
		} else req="additional";
	} else if ($fields.eq(i).find('.reqd').length) { //in case that's a "required" filed.....
    		req="required";
    		if ( $fields.eq(i).find('.reqd').contents().eq(0).contents().length ) {
    			title=$fields.eq(i).find('.reqd').contents().eq(0).contents().eq(0).text();
    		} else {
    			title=$fields.eq(i).find('.reqd').contents().eq(0).text();
    		}    		
    } else { //in case that's a user's "hand-made" filed.....    
		req="custom";		
		title=$fields.eq(i).find('span.eib-selTgLbl').text()
		$fields.eq(i).find("div:eq(0)>span").text();
		cstm_fld=1; 
	} 

    str_tmp=[];
    str_tmp2=[];
    str_tmp2.push(title);  //the first fields is title (index=0)
    str_tmp2.push(0);	//place for the length field.......
    str_tmp2.push("");	//place for radio_btn/check_box field.......
	str_tmp2.push(req);	//required/recommended/additional field........    
    str_tmp_adds=[];
    str_tmp_frequent=[];    
    
    /*if ($fields.eq(i).)
    results_vals[results_vals.length-1][1].push($(adds_area_lst).eq(j).text());*/



    if (excl.search(title)==-1){

    	results_vals.push([title,[]]);
    	if ($fields.eq(i).find('.opnd-vl').length) { //taking value from the field (if this is a filed with drop-down list)
    		field_val=$fields.eq(i).find('.opnd-vl').val();
    		if (field_val) results_vals[results_vals.length-1][1].push(field_val);
    	} else if ($fields.eq(i).find('.cell-lblTopFldDiv').length) { // standard field without drop-down list
    		field_val=$fields.eq(i).find('.cell-lblTopFldDiv').find('input[type="text"]').val();
    		if (field_val) results_vals[results_vals.length-1][1].push(field_val);
    	} else { // custom (user's) field without drop-down-list
    		field_val=$fields.eq(i).find('.opnd-Span input[type="text"]').val();
    		if (field_val) results_vals[results_vals.length-1][1].push(field_val);
    	}
	    
	    //if (lst.length>0 && excl.search(title)==-1) {                
	    if (lst.length>0) {                

	        items=lst[0].getElementsByTagName("li");       
	        adds_area=$fields[i].getElementsByClassName("eib-bndlTbl")[0];
	        if (adds_area!==undefined) {
	            adds_area_lst=adds_area.getElementsByTagName("label");
		    	for (j=0; j<adds_area_lst.length; j++) {
		    		str_tmp_adds.push($(adds_area_lst).eq(j).text());

		    		if ($(adds_area_lst).eq(j).prev().prop('checked')) {
		    			results_vals[results_vals.length-1][1].push($(adds_area_lst).eq(j).text());	    		
		    		}
		    	}		    	
	        }

	        for (j=0; j<items.length; j++){
		    	$iii=$(items).eq(j).text();
	            if (items[j].parentElement.nodeName=="UL") {
	            	str_tmp.push($iii);
	            } else str_tmp_frequent.push($iii);
	        }                      

	        for (k=0; k<str_tmp_frequent.length; k++){
	            if(str_tmp.find(checkFr)==undefined) str_tmp.push(str_tmp_frequent[k]);
	        }

	        for (k=0; k<str_tmp_adds.length; k++){
	            if(str_tmp.find(checkAd)==undefined) str_tmp.push(str_tmp_adds[k]);
	        }
	    }
	}

	$in_bt=$fields.eq(i).find(".eib-addcheck:eq(0) input:eq(2)"); 

    str_tmp2[1]=str_tmp.length;

	if ($in_bt.length) { //here we are checking whether the button Add exists inside this field............
		str_tmp2[2]="check_box";
	} else {
		str_tmp2[2]="radio_btn";
	}		

    str_tmp2.push(str_tmp);

	str_tmp2.push(i);

    if (excl.search(title)==-1) {
       	str.push(str_tmp2);        	
    } else {
    	prefilled.push(title);
    }
}

/*console.log(results_vals);
console.log('');*/


$.post("https://listva-aw.com/php_functions/saving_new.php",
    {
	user: $("#assist_list").val(),
    sku: str[0],
    status: "task",
    ali_link: str[1],
    ali_name: str[2],
    eb_link: JSON.stringify(str[3]),
	profile: cleanString(JSON.stringify(str.slice(4))),
	image: img,
	prefilled: JSON.stringify(prefilled),
	cats: JSON.stringify(cats),
	results_vals: JSON.stringify(results_vals),
	item_title: item_title,
	item_description: item_description,
    },
    function(data,status){
		alert (data);
		if (to_save){			
			if ($('[value="Save as draft"]').length) $('[value="Save as draft"]').trigger("click");
			if ($('[value="Update listing"]').length) $('[value="Update listing"]').trigger("click");	
		} else {
			listing_controls();	
		}		
	});	

}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
			
function filling() {

state=$("#controls").attr("data-state");
sku=$("#editpane_skuNumber").val();

if (state==2 || (state==3 && confirm('LOAD this data again?'))) { 
		
	$.post( "https://listva-aw.com/php_functions/returndata.php",	
	{sku: sku},
	function(response) {	

	$fields=$("fieldset:eq(1) .eisi-padBtm");

	$.each($fields, function(ind, fld){ //unchecking all the checkboxes..........
		$.each($(fld).find(".eib-bndlTbl:eq(0) input"), function(ind, chk){$(chk).prop("checked", false); $(chk).trigger('change');});	
	});

	obj=JSON.parse(response);

	title=obj.title;
	values=JSON.parse(obj.values);
	description=obj.description;

	$("#editpane_title").val(title);		

	$.post("https://listva-aw.com/php_functions/task_status.php",
	    {
    		sku: sku,
    		status: "loaded",
    	},
    	function(status_msg){    	
    		$("#controls").attr("data-state", 3);
    		$("#assist_load .assist_state").text("L O A D E D!");
    		$("#assist_load").removeClass();
			$("#assist_load").addClass('loaded');		

			$("#send_to_assist").prop({"disabled":false});
			$("#send_to_assist").css({"color":"black"});

			$("#assist_list").prop("disabled",false);
			$("#assist_list").css({"color":"black"});					
    	});			

	for (s=0; s<$fields.length; s++) if (!$fields.eq(s).find(".eib-ld:eq(0)").length && $fields.eq(s).find(".eib-selTgLbl.reqd:eq(0)")[0]==undefined) $fields.eq(s).find("input:eq(1)").val("");

	$.each($('.itsolp-rmvLnk'), function (ind, cust_fld_remove){
		cust_fld_remove.click();
	});



	for (x=0; x<values.length; x++) {
		if (values[x][1].length>0){
			fld_fnd=0; 

			for (y=0; y<$fields.length; y++){
				cstm_fld=0;	
				//$ttt=$fields.eq(y).find(".eib-ld:eq(0)");
				//fff=$fields.eq(y).find(".eib-selTgLbl.reqd:eq(0)")[0];
				//$yyy=$fields.eq(y).find("div:eq(0)>span");
		
				//if($ttt.length) title=$ttt.find("span:eq(0)").text();   //in case that's a "normal" filed.....
			    //    else if (fff!==undefined) title=fff.firstChild.wholeText; //in case that's a "required" filed.....
				//	else {title=$yyy.text(); cstm_fld=1;} //in case that's a user's "hand-made" filed.....

				if ($fields.eq(y).find(".eib-ld:eq(0)").length) { //in case that's a "normal" filed.....						
					title=$fields.eq(y).find(".eib-ld:eq(0) span:eq(0)").text(); 						
				} else if ($fields.eq(y).find('.reqd').length) { //in case that's a "required" filed.....		    		
			    		if ( $fields.eq(y).find('.reqd').contents().eq(0).contents().length ) {
			    			title=$fields.eq(y).find('.reqd').contents().eq(0).contents().eq(0).text();
			    		} else {
			    			title=$fields.eq(y).find('.reqd').contents().eq(0).text();
			    		}    		
			    } else { //in case that's a user's "hand-made" filed.....    				
					$fields.eq(y).find("div:eq(0)>span").text();
					cstm_fld=1; 
				} 

				// console.log('itereation through the fields...'+y);

				// $adds_area=$fields.eq(y).find(".eib-bndlTbl:eq(0)");
				// $adds_area_lst=$adds_area.find("label");
				// $.each($adds_area.find("input"), function(ind, chk){$(chk).prop("checked", false); $(chk).trigger('change');});	

				if (title==values[x][0]) {
					fld_fnd=1;				
				    $adds_area=$fields.eq(y).find(".eib-bndlTbl:eq(0)");                                             	
					$adds_area_lst=$adds_area.find("label");					
					//$.each($adds_area.find("input"), function(ind, chk){$(chk).prop("checked", false); $(chk).trigger('change');});	
					for (i=0; i<values[x][1].length; i++){						
						$fnd=0;
						for (j=0; j<$adds_area_lst.length; j++){
							//if(values[x][1][i]==$adds_area_lst.eq(j).text()){$adds_area_lst[j].click(); $fnd=1; break;}
							if(values[x][1][i]==$adds_area_lst.eq(j).text()){
								//console.log('here!!!');
								//console.log(title);
								$adds_area_lst.eq(j).prev().prop('checked', true); 
								$adds_area_lst.eq(j).prev().trigger('change'); 
								$fnd=1; 
								break;
							}
						}
						if($fnd==0){	$in_bt=$fields.eq(y).find(".eib-addcheck:eq(0) input:eq(2)");  
								if ($in_bt.length){   //if this field contains a button (multiple choice)....................
									$fields.eq(y).find(".eib-addcheck:eq(0) input:eq(0)").val(values[x][1][i]);
									$in_bt.prop("disabled", false); $in_bt.click(); }
								else    {//console.log("cstm_fld="+cstm_fld+" y="+y+" val="+values[x][1][i]);
										if (!cstm_fld) $fields.eq(y).find("input:eq(0)").val(values[x][1][i]); //if it is a "normal" fields WITHOUT button......
										else $fields.eq(y).find("input:eq(1)").val(values[x][1][i]);} //if it is a custom "hand-made" fields WITHOUT button......
								}
					}	

					break;
				}
			}
			if (fld_fnd==0){
				$(".eib-cusbdr a:eq(0)")[0].click();
				$("#itmSpcCusOlp input").eq(0).val(values[x][0]);
				$("#itmSpcCusOlp input").eq(1).val(values[x][1][0]);
				$("#itmSpcCusOlp input").eq(2).click();
				}

		}
		}

	var desc_string="<style>"+desc_css+"</style>";
	//desc_string+="#get_spec { position: absolute; bottom: -120px; left: 30px; height: 25px; line-height: 10px } footer { margin-top: 20px; padding-top: 20px; padding-right: 20px; padding-left: 20px; border: 1px solid #d3d3d3; text-align: center } footer .s_name span { padding-bottom: 20px; display: block; font-size: 13px } footer .s_name span b1 { color: #0000CD; font-size: 15px } .flex-container { display: flex; background-color: #fff; flex-wrap: wrap; padding: 10px } .flex-container>div { flex: 40% 1 0 } .text_1 { margin-right: 10px; padding-bottom: 15px } .image_1 { margin-left: 10px } .image_1 img { width: 100%; max-height: 100% } .title { height: 50px; font-size: 18px; font-weight: 700; margin-bottom: 15px } .text_1 .trig, .title { background-color: #f1f1f1; padding: 20px; -webkit-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); -moz-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15) } @media screen and (max-width:800px) { .flex-container { flex-flow: column } }";

	//desc_string+="footer { margin-top: 20px; padding-top: 20px; padding-right: 20px; padding-left: 20px; border: 1px solid #d3d3d3; text-align: center; } footer .s_name span { padding-bottom: 20px; display: block; font-size: 13px; } footer .s_name span b1 { color: #0000cd; font-size: 15px; } .flex-container { display: flex; background-color: #fff; flex-wrap: wrap; padding: 10px; } .flex-container > div { flex: 40% 1 0; } .text_1 { margin-right: 10px; padding-bottom: 15px; } .image_1 { margin-left: 10px; } .image_1 img { width: 100%; max-height: 100%; } .desc_title { height: 50px; font-size: 18px; font-weight: 700; margin-bottom: 15px; } .desc_text, .desc_title { background-color: #f1f1f1; border: 1px solid LightGray; padding: 20px; -webkit-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); -moz-box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); box-shadow: 10px 7px 5px -1px rgba(0, 0, 0, .15); } @media screen and (max-width: 800px) { .flex-container { flex-flow: column; } }";	
	//desc_string+="</style>";
	desc_string+=description;		
	desc_string=desc_string.replace("[title]",$("#editpane_title").val());

	$("#rteDiv a.std-lnk")[0].click();
	iframe = $("#rteDiv iframe:eq(0)")[0];
	iframe.contentWindow.document.getElementsByTagName("body")[0].innerText=desc_string;
	$("#rteDiv a.htm-lnk")[0].click();

	iframe = $("#rteDiv iframe:eq(1)")[0];	
	//iframe.contentWindow.document.getElementsByClassName("desc_text")[0].setAttribute("contenteditable", "true");

	

	//$("#pic_select").val(0);
	//image_request_desc(0);

	/*chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":0}, function(response){
		iframe = $("#rteDiv iframe:eq(1)")[0];
		iframe.contentWindow.document.getElementsByClassName("image_1")[0].innerHTML+='<img src='+response.message +' alt="main_image">';
	});*/
	
	});

	}	

}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////