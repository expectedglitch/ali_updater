var myInt;
var prot;

function catalog_indication(par){	
	
	top_row_id_prev=$("table:eq(3) tbody")?.eq(0)?.attr('id'); //we'll use it for comparison on the first row id (when we are switching between the pages)
	num_rows_prev=$("table:eq(3) tbody").length; // we'll use it for comparison on the number of the rows on the current page (when we are changing the number of the rows to display on the screen)

	if (!par) {	//this is a first call to Indication on the page load (from the content.js on page load event).
		prot=1;	//here we're setting the protection to let the first page be processed normally (otherwise the page Update event would call this function again and the process would be interrupted too early)
		myInt = setInterval(()=>{
			top_row_id_new=$("table:eq(3) tbody")?.eq(0)?.attr('id');
			if (top_row_id_new) indication();
		}, 100);
	} else { //this is the page UPDATE event call from Background.js (by sending a message to content.js) - usually it's a paganation click..............
		if (!prot) { 			
			clearInterval(myInt);			
			myInt = setInterval(()=>{
			
				top_row_id_new=$("table:eq(3) tbody")?.eq(0)?.attr('id');
				num_rows_new=$("table:eq(3) tbody").length;

				if (top_row_id_prev!==top_row_id_new || num_rows_prev!==num_rows_new) { //either there was a switching between the pages (pagination) or (||) the number of the rows to display on the screen was changed...			
					indication(); 			
				}
			}, 100);
		}
	}
}

function indication() {				
	clearInterval(myInt);
	var active=(document.URL.indexOf('active')!==-1)?1:0;					
	$.post(
		"https://listva-aw.com/php_functions/assist_state_all.php",	
	 	{	},
         response=> {
         	assist_state_arr=JSON.parse(response);

         	$.post("https://listva-aw.com/php_functions/products_detect_ebay_structure_changes.php",	
					{param: "all"},	 	
					response=>{				        	

					active_updates=JSON.parse(response).active_changed;	 					

				$("table:eq(3) tbody").each((ind, row) => {					
					$sku=active?$(row).find("td:eq(5) .shui-dt--text-column div span").text():$(row).find("td:eq(4) .shui-dt--text-column div").text();				

					if ($sku){													
						$cmpl_btn=$(row).find("td:eq(1) .cell-wrapper");																

						$(assist_state_arr).each((ind,state)=>{
							if (state.SKU==$sku && state.status!=='loaded'){										
								$cmpl_btn.css({"border": "1px solid green","border-radius": "5px", "padding": "2px 3px", "margin":"20px 5px", "position":"relative", "overflow":"visible"});											
								$cmpl_btn.append('<div class="lbl_aa">'+state.user_name+'</div>');										
								$cmpl_btn.find(".lbl_aa").css({"position":"absolute", "top": "-14px", "right": "-2px", "background-color":colors[parseInt(state.user_id)-1]['back'], "color":colors[parseInt(state.user_id)-1]['text'], "border":"1px solid green","padding":"0 5px"});
								if (state.status=='completed'){
									$cmpl_href=$(row).find("td:eq(1) span a");
									$cmpl_btn.css({"border": "4px solid green"});													 
								}
							}
						});																										

						$(active_updates).each((ind,update)=>{
							if (update==$sku){																				
								$cmpl_btn.append('<div class="active_update">Update it!</div>');										
							}
						});																										
					}
					prot=0;				
				});	
			});
	});		
};


function save_buttons(){        
	$('[value="Preview"]').remove();
	//$('[value="Save as draft"]').css("visibility", "hidden");
	//if ($("#save_and_send").length==0) {

	bottom_section='<div id="saving_btns">\
						<input type="checkbox" id="to_save_or_not" checked></input><label for="to_save_or_not" class="lbl2">Save listing&nbsp;</label>\
						<button type="button" id="send_to_assist">&nbsp;Send to Assistant&nbsp;</button>\
						<select id="assist_list">';

	return $.post("https://listva-aw.com/php_functions/get_user_names.php",	
		{},
		function(names) {
		names=JSON.parse(names);

		$.each(names, function(index, name){
			
			if ($("#assist_load div.lbl_bb").attr("data-id")){
				if (name[0]==$("#assist_load div.lbl_bb").attr("data-id")) $sel="selected"; else $sel="";	
			} else {
				$sel=(name[0]==3)?"selected":"";
			}
			
			if (Number(name[0])) bottom_section+='<option value="'+name[0]+'" class="option" '+$sel+'>'+name[1]+'</option>';				
		});

		bottom_section+='</select></div>';

		//$("#controls").append(bottom_section);			  			
		$(bottom_section).insertAfter('#assist_load');

		//$("#save_and_send").on("click", function(){save_function()});
		block_sku();
	});
				 
	//}
}


function block_sku(){
	par=Number($("#controls").attr("data-state"));

	$("#editpane_skuNumber").prop("disabled", true);

	$("#labelcat1_par #cover_1").remove();
	$("#labelcat1_par").append('<div id="cover_1"></div>');		

	var sku=$.trim($("#editpane_skuNumber").val()).replace(/\s{2,}/g, ' ');

	// if (!sku || par==1 || par==2) {
	//if (par==2) {
	 if (!sku || par==2) {	
		$("#to_save_or_not").prop({"disabled":true, "checked":false}); 
		$("#to_save_or_not").css({ "cursor":"context-menu"});
		$("#saving_btns .lbl2").css({"color":"LightGray"});			                 	

		$("#send_to_assist").prop({"disabled":true});
		$("#send_to_assist").css({"color":"lightgray"});

		$("#assist_list").prop("disabled",true);
		$("#assist_list").css({"color":"lightGray"}); 
		
	} else {
		$("#to_save_or_not").prop({"disabled":false, "checked":true}); 
		$("#to_save_or_not").css({ "cursor":"pointer"});
		$("#saving_btns .lbl2").css({"color":"black"});			                 	

		$("#send_to_assist").prop({"disabled":false});
		$("#send_to_assist").css({"color":"black"});

		$("#assist_list").prop("disabled",false);
		$("#assist_list").css({"color":"black"});		
	}
			
}


function top_table(info){
	$("#controls #assist_fields #sku_clip").val(info.sku?info.sku:'');
	$("#controls #assist_fields #a_l").val(info.ali_link?info.ali_link:'');
	$("#controls #assist_fields #a_n").val(info.ali_name?info.ali_name:'');
	$("#controls #assist_fields #e_l").val(info.eb_comp_links?info.eb_comp_links.join(', '):'');

	$("#controls #assist_fields .fld input").each((ind, val)=>{
		if ($(val).val().indexOf('no_')!==-1) $(val).addClass('inactive');
	})
}
function sending_section(){	
	console.log('sending_section');

	a_l=$("#controls #assist_fields #a_l").val();
	a_n=$("#controls #assist_fields #a_n").val();

	e_l_str=$("#controls #assist_fields #e_l").val();	
	e_l_arr=$('#e_l').val().split(' ,');
	
	cats=new Array();
	
	$('ul.summary span').each((ind, val)=>{
    	if (ind) cats.push($(val).text());
	})

	//console.log('before');
	$("#send_to_assist").on("click", function() {save_function(a_l, a_n, e_l_arr, cats)} );
	//console.log($("#send_to_assist").on("click"));
}

function reading_data (){		
	console.log('reading_data');

	$("#clip_msg").css({"display":"none"});
	
	$sku=$('.prod_list').val();
	//setTimeout(function(){  
	$("#clip_msg").css({"display":"block"});

	$.post("https://listva-aw.com/php_functions/products_get_ebay_changed_structure.php",	
		{sku: $sku}, response => {

			//console.log(response);

			list=JSON.parse(response);
			top_table(list);
			sending_section();
										
			$("#fill_basics").css({"border":"4px blue solid", "cursor":"pointer", "pointer-events":"auto", "color":"blue"});		

			//console.log(list);
		});
	//}, 200);

}

function no_data() {	
	console.log('no_data');

	$("body #controls select.prod_list").prop('disabled', true);								
	$("body #controls").addClass('nothing_to_upload');

	$sku=$("#editpane_skuNumber").val();

	$.post("https://listva-aw.com/php_functions/products_get_basic_info.php",	
		{sku:$sku},	 	
		response=>{
			//console.log(response);
			basic_info=JSON.parse(response);

			top_table(basic_info);
			sending_section();
		});
}


function assist_load(state, id, name){
	$("#controls").attr("data-state",state);
	
	if (state==1 || state==2 || state==3) {
		$("#controls").find(".lbl_bb").attr("data-id", id); 
		$("#controls").find(".lbl_bb").text(name);
		$("#controls").find(".lbl_bb").css({"background-color": colors[parseInt(id)-1]['back'], "color": colors[parseInt(id)-1]['text']});		
	}
		
	if (state==3) {	
		$("#assist_load .assist_state").text("L O A D E D!");
		$("#assist_load").addClass('loaded');		
	}
	if (state==2) {
		$("#assist_load .assist_state").text("Finished by Assistant!");
		$("#assist_load").addClass('finished');
	}
	if (state==1) {
		$("#assist_load .assist_state").text("Not ready yet...");				
		$("#assist_load").addClass('not_ready');
	}
	if (state==0) {
		$("#assist_load .assist_state").text("Was NOT SENT yet");
		$("#assist_load").addClass('not_sent');
	}        
}


function listing_controls() {		
	$('body #controls').remove();
	$("body").append('<div id="controls">\
						<div class="listing_state"></div>\
						<div id="assist_fields">\
							<div class="fld"><label for="sku_clip">SKU: </label><input type="text" id="sku_clip" autocomplete="off"></input></div>\
							<div class="fld"><label for="a_l">Ali_link: </label><input type="text" id="a_l" autocomplete="off"></input></div>\
							<div class="fld"><label for="a_n">Ali_name: </label><input type="text" id="a_n" autocomplete="off"></input></div>\
							<div class="fld"><label for="e_l">eBay_link: </label><input type="text" id="e_l" autocomplete="off"></input></div>\
						</div>\
						<div id="assist_load">\
							<span class=assist_state></span>\
							<div class="lbl_bb"></div>\
						</div>\
						<div>Upload data:<select class="prod_list"></select></div>\
						<div id="fill_basics">Upload Data in the Listing</div>\
					</div>\
					<div class="expandable_bar"></div>');
	
	$(document).on("change", "body #controls .prod_list", reading_data);
	$(document).on("click", "body #controls #fill_basics", base_filling);
	$(document).on("click", "body #controls #assist_load", filling);			
	
	$sku=$("#editpane_skuNumber").val();

	$.post( "https://listva-aw.com/php_functions/assist_state.php",	
		{sku: $sku},
        async response=> {
        	assist_state=JSON.parse(response);
        	name=assist_state.user_name;
        	id=assist_state.user_id;					        		

        	if (Object.keys(assist_state).length){ // means that this draft was sent to Assistant previously ...
        		//$("body #controls select").prop('disabled', true);				        																			
				if (assist_state.status=="loaded") {
					assist_load(3, id, name);							
				} else if (assist_state.status=="completed") {											
					assist_load(2, id, name);							
				} else if (assist_state.status=="task") {											
					assist_load(1, id, name); 												
				}																			
			} else { //otherwise - if this Draft was NOT sent to Assistant yet.......................
				assist_load(0); 													
			}
			
			await save_buttons(); 								

			$.post("https://listva-aw.com/php_functions/products_detect_ebay_structure_changes.php",	
			 	{sku:$sku},	 	
			 	response=>{				        	
					structures=JSON.parse(response);
					all_updates=structures.active_changed.concat(structures.new_before_assistant);

					console.log(structures);
					
					if (all_updates.length){
						$.each(all_updates, (ind, val)=>$("body #controls select.prod_list").append('<option>'+val+'</option>'));
						reading_data();
					} else {
						no_data();				
					}
			});
	});

	if (document.URL.indexOf('ReviseItem')!==-1) {//then this is an Active listing..........
		$('#controls .listing_state').text('A C T I V E');
		$('#controls .listing_state').addClass('active');
	} else if (document.URL.indexOf('AddItem')!==-1) { //otherwise - if this is a Draft on eBay (not Active)..............................
		$('#controls .listing_state').text('D R A F T');
		$('#controls .listing_state').addClass('draft');
	}
}


function desc_pic_choosing(){
		$("#rteDiv span:eq(0)").append(
			'<div class="img_controls">\
				<small>Add Image:</small>\
				<div id="pic_select">\
					<div>\
						<span value="1">1</span>\
						<span value="2">2</span>\
						<span value="3">3</span>\
					</div>\
					<div>\
						<span value="4">4</span>\
						<span value="5">5</span>\
						<span value="6">6</span>\
					</div>\
					<div>\
						<span value="7">7</span>\
						<span value="8">8</span>\
						<span value="9">9</span>\
					</div>\
					<div>\
						<span value="10">10</span>\
						<span value="11">11</span>\
						<span value="12">12</span>\
					</div>\
				</div>\
				<div class="insert_template">insert_template</div>\
				<div class="mini_img"></div>\
			</div>\
			');

		$("#pic_select").val(0);
		$("#pic_select").css({"font-size":"20px", "color":"green", "font-weight":"700"});

		$("#pic_select span").on("click", function(){
			//image_request_desc($(this).val()-1)
			//chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":$(this).val()-1}, function(response){
			chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":$(this).attr("value")-1}, function(response){
				iframe = $("#rteDiv iframe:eq(1)")[0];
				iframe.contentWindow.document.getElementsByClassName("image_1")[0].innerHTML+='<img src='+response.message +' alt="main_image">';
			});
		});		
		//$(".insert_template").on("click", function(){template_ins()});		
		$(".insert_template").on("click", insert_template);		

		$(document).on('mouseover', '#pic_select span', function(){
			//chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":$(this).val()-1}, function(response){
			chrome.runtime.sendMessage({"message": "image_request_desc", "img_num":$(this).attr("value")-1}, function(response){
				//iframe = $("#rteDiv iframe:eq(1)")[0];
				//iframe.contentWindow.document.getElementsByClassName("image_1")[0].innerHTML+='<img src='+response +' alt="main_image">';
				$('.mini_img').html('<img src='+response.message+'>');	
	  			$('.mini_img').addClass("show");
			});
	  		
  		})
  		$(document).on('mouseleave', '#pic_select span', function(){  
  			$('.mini_img').removeClass("show");
  		})
}

/*<button class="ins_template">insert_template</button>*/

function ali_load_button(){
	$.post(
			"https://listva-aw.com/php_functions/products_get_shipment.php",
			{ ali_code: ali_code()
				},
				function (ship){ //we will use this shipment just to check if the Product was already loaded before or not.......	

					$(".product-main").css({"position":"relative"});
					$(".product-main").append('<div class="ali_load_container"><div class="buttons"></div></div>');
					$(".ali_load_container .buttons").append('<button id="ali_load_btn">Grab <span>IT</span> nooW!!!</button>');
					$(".ali_load_container .buttons").append('<button id="ali_update_btn">Update</button>');
				

					$(".ali_load_container").append('<div class="r3"></div>');
					$(".ali_load_container .r3").append('<div class="competitor">Competitor_1:<input type="text"></div>');
					$(".ali_load_container .r3").append('<div class="competitor">Competitor_2:<input type="text"></div>');
					$(".ali_load_container .r3").append('<div class="competitor">Competitor_3:<input type="text"></div>');
					if (JSON.parse(ship).length){
						$('.ali_load_container').addClass('update');
					} else {
						$('.ali_load_container').addClass('load');
					}
				});
	
	
	//$('#ali_load_btn').on("click", btn_action);

	$(document).on("click", '#ali_load_btn', function(){  btn_action("load");  });
	$(document).on("click", '#ali_update_btn', function(){  btn_action("update");  });

	//$(document).on("click", '#ali_load_btn', function() {console.log('load_btn')});

	function ali_code(){
		$url=document.URL;
		st=$url.search("aliexpress.com/item/")+20;
		fn=$url.search(".html");
		return $url.substring(st,fn);
	}

	// function btn_action(){			
	// 	$('#ali_load_btn').html("Processing...")				
	// 	var msg_to_console;

	// 	$.post(
 //    		"https://listva-aw.com/php_functions/products_load_product.php",
 //    		{ ali_code: ali_code(), countries:JSON.stringify(["US","IL"]) },
	// 		function(response){ 					
	// 			msg_to_console=response;

	// 			$.post(
	//          		"https://listva-aw.com/php_functions/products_load_shipments.php",
	//          		{ ali_code: ali_code() },
	// 				function(response){ 							
	// 			 		$('#ali_load_btn').html("You've Got <span>It</span> !!!");
	// 			 		$('#ali_load_btn span').css({"color":"red", "font-size":"20px"});
	// 					msg_to_console+=response;
	// 					//console.log(msg_to_console);						

	// 					let comp_arr=[];
	// 					$('.competitor input').each((ind,val)=>comp_arr.push($(val).val()));
	// 					$.post(
	//          				"https://listva-aw.com/php_functions/products_save_competitors.php",
	//          				{ ali_code: ali_code(), comp_arr:JSON.stringify(comp_arr) },
	//          				response=>console.log(msg_to_console+response));	         				
	// 			});
	// 	});
	// }

	function btn_action(mode){			

		countries=(mode=="load"?JSON.stringify(["US","IL"]):JSON.stringify([]));
		
		

		if (mode=="load") $('#ali_load_btn').html("Processing...")						

		if (mode=="update") {
			$('#ali_update_btn').html("Processing...");
			$('#ali_load_btn').html("Grab <span>IT</span> nooW!!!");						
		}

		$.post(    		
    		"https://listva-aw.com/php_functions/products_load_prod_multi.php",
    		{ ali_codes: JSON.stringify([ali_code()]), countries:countries },
			function(response){ 								
				console.log(response+"/1 - successfully");

				if (+response==1){
					if (mode=="load"){
						$('#ali_load_btn').append("<br>products - 1/1");				 		
					} 
					if (mode=="update"){						
				 		$('#ali_update_btn').append("<br>products - 1/1");
					} 

					$.post( //we will run shipment-api only if product-api was successful..............
	        		//"https://listva-aw.com/php_functions/products_load_shipments.php",
	        		"https://listva-aw.com/php_functions/products_load_ship_multi.php",
	        		{ ali_codes: JSON.stringify([ali_code()]), list_length: "full"},
					function(response){ 	
						console.log(response);

						if (response==1){
							if (mode=="load"){
								$('#ali_load_btn').append("<br>shipments - 80/80");
							} 
							if (mode=="update"){
								$('#ali_update_btn').append("<br>shipments - 80/80");
							} 
						} else {
							if (mode=="load"){
								$('#ali_load_btn').append("<br>shipments - Failure...!");
							} 
							if (mode=="update"){
								$('#ali_update_btn').append("<br>shipments - Failure...!");
							} 
						}
						//----------------------------------------------------------------------
						let comp_arr=[];
						$('.competitor input').each((ind,val)=>comp_arr.push($(val).val()));
						$.post(
		     				"https://listva-aw.com/php_functions/products_save_competitors.php",
		     				{ ali_code: ali_code(), comp_arr:JSON.stringify(comp_arr) },
		     				function(response) {
		     					console.log(response);

		     					if (mode=="load"){
									$('#ali_load_btn').append("<br>competitors - saved!<br>FINISHED!");									
								} 
								if (mode=="update"){
									$('#ali_update_btn').append("<br>competitors - saved!<br>FINISHED!");
								}

		     					$('.ali_load_container').removeClass("load");
				 				$('.ali_load_container').addClass("update");
		     				});	         				
		     			//----------------------------------------------------------------------
					});					

				} else if (+response==0 || response=="emergency_exit") {
					if (mode=="load"){
				 		$('#ali_load_btn').html("<span>product - Failure...!</span>");				 		
					} 
					if (mode=="update"){
				 		$('#ali_update_btn').html("<span>product - Failure...!</span>");				 		
					} 
				}								
     			
		});
	}
}


function expandable_bar(){
	$(document).on("mouseover", "body .expandable_bar", ()=>{$('body #controls').addClass('show');});	
	$(document).on("mouseleave", "body #controls", ()=>{$('body #controls').removeClass('show');});	
}