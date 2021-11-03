function base_filling() {	
    if (document.URL.search("bulksell.ebay.com/ws/eBayISAPI.dll")!==-1) { //if it is the Top frame of the page.............................................................................    	

		console.log(JSON.stringify(list));

	    /*if ($('#editpane_msku .rm-var:eq(1)').length) { //I SUSPECT THIS PART IS NEVER GETTING CONTROL - it is ALWAYS going by the ELSE statement......
	    	if (confirm('Now we will ERASE the CURRENT VARIATIONS automatically!! After they disappear, please, click the Button again.')) {
	    		$('#editpane_msku .rm-var:eq(1)')[0].click();
	    		$('#remove_var_olp_pad .sbtn:eq(0)')[0].click();			
			}
		} else { // SO WE ARE ALWAYS GETTING HERE (to the ELSE)................*/

		// if ($('#var_edit').length && !Object.keys(list.cats).length) { //the case when there ARE already variations in this listing but we are uploading the "SINGLE"-item (so the current variations should be removed - MANUALLY)...
		// 	alert ("PLEASE, REMOVE ALL the current VARIATIONS MANUALLY before uploading this data!")
		// } else {		    		    
	    $("#to_save_or_not").prop({"disabled":true, "checked":true}); 
		$("#to_save_or_not").css({ "cursor":"context-menu"});

	    sku=list.sku;

	    //console.log('www='+sku);

	    $.post( "https://listva-aw.com/settings/read_settings.php",
			{},
	    	function(resp) {//these values we will use further in this script to fill respective fields... I will mark those rows with "(FROM SETTINGS DB)"	
				settings = JSON.parse(resp);
				$modified=(settings.modified==1) ? 1 : 0;

				//console.log("qqq="+$modified);
				
				$country_of_manufacture=settings.country_of_manufacture;
				$location_country=settings.location_country;
				$location_city_state=settings.location_city_state;

			    $('#editpane_skuNumber').val(sku);
			    $('#itemCondition').val(1000);		    

			    $("#privateAuction").trigger("change");

			    policy_found=0;

				$('#ALL_ShippingProfile option').each(function(ind, val){
					//if ($(val).html().search(sku)!==-1){
					if ($(val).html().search(list.ali_link.substring(list.ali_link.length-13, list.ali_link.length-5))!==-1){
						$('#ALL_ShippingProfile').val($(val).attr('value')); //here we are setting the shipping policy
						policy_found=1;
					}
				});

			    if (policy_found==0 && sku!=="   ") alert ("Shipping policy was NOT CREATED PREVIOUSLY for this item !! Please, create it and try again !!");

			    
			    $('#anLocId')[0].click();
			    $('[name="itemCountry"]:eq(0) option').each(function(ind, val){
			    	if ($(val).html().search($location_country)!==-1) $('[name="itemCountry"]').eq(0).val($(val).attr('value'));
			    })
			    $('#location').val($location_city_state);


				
			    manuf_input=$('[id="Listing.Item.ItemSpecific[Country/Region of Manufacture]"]');		    		    
			    if (manuf_input.length) {
			    	manuf_input.val($country_of_manufacture); //here we are setting the Country of manufacture (FROM SETTINGS DB)		    	
			    	var event = new Event('change', { view: window,  bubbles: true,  cancelable: true});
			    	manuf_input[0].dispatchEvent(event);  //Here we are dispatching Change event for the input/textarea field.....................................
			    }
			    		    
				
			    //------------------I suspect this field does not exist any longer..................................................
			    modif_item=document.getElementById("editpane_Listing.Item.ItemSpecific[Modified Item]");
			    if (modif_item!==undefined && modif_item!==null) {
			    	if (!$modified) {
			    		$(modif_item).find("button")[0].click();
			    		$(modif_item).find("li:eq(0) a:eq(0)")[0].click();
			    	} else {
			    		$(modif_item).find("li:eq(1) a:eq(0)")[0].click();
			    	}
			    } //This item is NOT modified (FROM SETTINGS DB)
		    	//------------------I suspect this field does not exist any longer..................................................
			   
			    
			    remove_all=$('#autofillMsg Button');
			    if (remove_all.length) remove_all[0].click();	//Here we are removing automatically filled in values from the Specifics........................
			    
			    
			    //tlt_1=document.getElementById("editpane_titlewrap").getElementsByTagName("input")[0].value;
			    tlt_1=$('#editpane_titlewrap input').val();
			    space_1=tlt_1.search(" ");
			    word_1=tlt_1.substring(0,space_1);
			    word_1=word_1.replace("'","").toLowerCase();
			    word_1=word_1.charAt(0).toUpperCase() + word_1.substring(1);

			    tlt_2=tlt_1.substring(space_1+1);
			    space_2=tlt_2.search(" ");
			    if (space_2!==-1) word_2=tlt_2.substring(0,space_2); 
					else word_2=tlt_2.substring(0); // it is necessary to enter AT LEAST 2 WORDS in to the Title separated with Space.......................................................
			    word_2=word_2.replace("'","").toLowerCase();
			    word_2=word_2.charAt(0).toUpperCase() + word_2.substring(1);

			    brand=word_1+" "+word_2+" "+"China";
				if ($('[id="Listing.Item.ItemSpecific[Brand]"]').length) $('[id="Listing.Item.ItemSpecific[Brand]"]').val(brand); //Setting the Brand name - generated out of 2 first words of the Title + "China" ----
			        
			    a=Math.round(Math.random() * 9);
			    b=Math.round(Math.random() * 9);
			    c=Math.round(Math.random() * 9);
			    d=Math.round(Math.random() * 9);
			    model=String(a)+String(b)+String(c)+String(d);

			    
			    if ($('[id="Listing.Item.ItemSpecific[Model]"]').length) $('[id="Listing.Item.ItemSpecific[Model]"]').val(model);  //Setting the Model numder for this item...............		    



			    mpn=word_1.toLowerCase()+word_2.toLowerCase()+model;
			    if ($('[id="Listing.Item.ItemSpecific[MPN]"]').length) $('[id="Listing.Item.ItemSpecific[MPN]"]').val(mpn); //Setting MPN code for this item...................

				$('[id="_st_MPN.tbl"] input').each(function(ind, val){
					if ($(val).val().search(model)==-1 && $('[id="_st_MPN_0"]').prop("checked")) $(val)[0].click();
				})

		
	    		if (policy_found!==0){ //only in case of shipping policy exists (otherwise it's necessary to create it, update the page and start the Upload script again)....

				    //if (list[1][1]>0) {  //if we have NOT a single-item product (in other words - if variations exist)..................
				    if (Object.keys(list.cats).length>0) {  //if we have NOT a single-item product (in other words - if variations exist)..................
						chrome.storage.local.set({'varsArray': list});
						chrome.runtime.sendMessage({"message": "basic_is_finished"});     
						listing_controls();	                                   	    
					} else { //else - if this is a SINGLE item.......................................................................................
		 
						//pr_value=list[4][3].substring(1);
						
						pr_value=Object.values(list.vars)[0].price;
						
						/*dec_part=String(pr_value).substring(String(pr_value).search("\\.")+1);
						int_part=String(pr_value).substring(0,String(pr_value).search("\\."));
						   
	   	 				if (dec_part>30) pr_value=Number(String(int_part)+"\."+String(99));
		   					else pr_value=Number(String(Number(int_part)-1)+"\."+String(99));*/

						$('#binPrice').val(pr_value);  //single PRICE
						//$('#quantity').val(list[4][2]);  //single QUANTITY
						$('#quantity').val(Object.values(list.vars)[0].quantity);
						/*document.getElementById("binPrice").value=pr_value;  //single PRICE
						document.getElementById("quantity").value=list[4][2]; //single QUANTITY*/

		        		chrome.runtime.sendMessage({"message": "basic_is_finished_single"});                                        	    		
		        		listing_controls();	
					}	              

				} //only if Shipping policy exists for this item...................

		});  //this is the end of Read-settings Handler function........... (here we are taking values from the Sets DB and using them for filling the respective fields....
		
		//} //if the "Create Variations" button exists at the moment the Browser Actions buttion being clicked............................

	}  //if it is the Top frame of the page.............................................................................

}



function msku_variations(){
	if (document.URL.search("msku")!==-1) { //if it is a Variations Editing frame .....................................................................................................................

		chrome.storage.local.get(['varsArray'], function(result) {
			if (typeof result.varsArray) { //----- if varsArray is defined (exists in Chome storage) -------------------------------
				console.log(result);

				$('.var-tag:eq(0) span a').each(function(ind, val){$(val)[0].click();});				
				
				$.each(result.varsArray.cats, (cat_ind, category)=>{
					attrib_found=0;		
					document.getElementById("msku-attribute-add").click();
					msku_list=document.getElementById("msku-variation-checkbox-list").getElementsByTagName("label");
					for (k=0; k<msku_list.length; k++) {						
						if (msku_list[k].innerText.toUpperCase()==category.name.toUpperCase()) { 
							attrib_found=1;
							msku_list[k].click();//if we find our attribute inside the standard list then we click it.......
							document.getElementById("msku-add-parent-tag-btn").click();
						}   
					}

					if (attrib_found==0){ 
						document.getElementById("msku-main-w3-w0").getElementsByClassName("mar-t10")[0].click(); //if we don't find our attribute inside the standard list then we create it - by clicking on "add your own attribute"						
						document.getElementById("msku-custom-parent-attribute-input").value=category.name;
						document.getElementById("msku-add-parent-tag-btn").click();
					}					
				})						
												
				attribs=document.getElementsByClassName("var-tag")[0].getElementsByClassName("inline-block") // here we are getting the list all the Attributes installed for this item (the last boject in this list is not an Atribute but the link "+Add"
				for (j=0; j<attribs.length-1; j++){			

					attribs[j].click();
					
					//console.log('after_click');

					attribs_options_list=document.getElementById("msku-variations-body").getElementsByTagName("div");
					for (i=0; i<attribs_options_list.length; i++) {

						//console.log(attribs_options_list);

						if (attribs_options_list[i].id.search("msku-variation-values")!==-1 && !attribs_options_list[i].classList.contains("hide")){
											
							$.each(result.varsArray.cats, (cat_ind, category)=>{																
								if (category.name.toUpperCase()==attribs[j].innerText.trim().toUpperCase()) {									
									options_list=attribs_options_list[i].getElementsByTagName("ul")[0].getElementsByTagName("li");																
									$.each(category.values, (ind, cat_val)=>{
										option_found=0;
										for (k=0; k<options_list.length; k++){											
											if (options_list[k].innerText.toUpperCase()==cat_val.name.toUpperCase()) {											
												option_found=1;
												options_list[k].click(); 
												break;
											}
										}
										if (option_found==0){											
											document.getElementById("msku-custom-option-link").click();											
											document.getElementById("msku-custom-option-input").value=cat_val.name;
											document.getElementById("msku-custom-option-add").click();
										}
									})																						
									i=1000;
								}
							}) 														
						}
					}

					if (i==attribs_options_list.length) {			
						console.log('bottom');					
						$.each(result.varsArray.cats, (cat_ind, category)=>{							
							$.each(category.values, (ind, cat_val)=>{
								document.getElementById("msku-custom-option-link").click();
								document.getElementById("msku-custom-option-input").value=cat_val.name;
								document.getElementById("msku-custom-option-add").click();										
							});															
						});						
					}

				}

				document.getElementById("msku-create-variations-button").click(); //clicking "CONTINUE" button..................................................
				document.getElementById("msku-footer").getElementsByClassName("btn--primary btn space-right")[0].addEventListener("mouseup", function(){chrome.storage.local.remove("varsArray")}, false);
				document.getElementById("msku-cancel").addEventListener("mouseup", function(){chrome.storage.local.remove("varsArray")}, false);
				document.getElementById("msku-previewBtn").addEventListener("mouseup", function(){chrome.storage.local.remove("varsArray")}, false);


				opts_list=document.getElementById("msku-photos_options");
				opts=opts_list.getElementsByTagName("option");
		        
		        if (result.varsArray.pics_category) {
					for (j=0; j<opts.length; j++) {
						if (result.varsArray.pics_category.toUpperCase().replace(/\s/g,'')==opts[j].innerText.trim().toUpperCase().replace(/\s/g,'')) {
							opts[j].selected=true; break;
						}
					}
				} else opts[0].selected=true;


				if ("createEvent" in document) {
			       	var evt = document.createEvent("HTMLEvents");
			        evt.initEvent("change", false, true);
			        opts_list.dispatchEvent(evt);
				} else {
					opts_list.fireEvent("onchange");  //here we have chosen that the images to Variations will be either from Default gallery (0 - index) or from some Variation category
				}


				if (opts_list.selectedIndex==0) chrome.runtime.sendMessage({"message": "start_table"}); //in case of we have Variations without images we should immediately step over to the table filling........

			} else {
				alert("The storage is empty!!");    
			}

	    }); //----- reading of Chrome Storage------------------------------------------------

	} //if this is an MSKU frame----------------------------------------------------------------------------------------------------------------------------------------------------
}



function pictures(){
	if (document.URL.search("picupload/main")!==-1 && window.name=="photo-iframe-picupload-variations") { //if this is a Picture Upload frame----------------------------------------------------------------------------------------------------------------------------------------------------
		chrome.storage.local.get(['varsArray'], function(result) {
			if (typeof result.varsArray) { //----- if varsArray is defined (exists in Chome storage) -------------------------------

				//for (i=2; i<result.varsArray.length; i++) if (result.varsArray[i][0]=="PIC_VAR") break;  // "i" is the number of the string in our Clipboard array which is following right away after the last STRING_n
				//pic_var_str=i;
				//f_row=result.varsArray[pic_var_str];
				var var_pics_array=new Array ();
				var temp_array=new Array (2);

				//for(j=2; j<f_row.length; j++) {
				$.each(result.varsArray.cats, (cat_ind, category)=>{
					if (category.name==result.varsArray.pics_category){
						$.each(category.values, (ind, value)=>{
							//f_name=f_row[j].substring(f_row[j].search("\SKU_"));
					        //var_name=f_name.substring(f_name.search("_@@@_")+5, f_name.search("_@wQw@_"));
					        var_name=value.name;

					        ind2=value.link.lastIndexOf('/');
    						ind1=value.link.lastIndexOf('/', ind2-1);
    						img_code=value.link.substring(ind1+1,ind2);
    						f_name=img_code+'_res_res.jpg';

							temp_array=[]; temp_array.push(var_name); temp_array.push(f_name);
							var_pics_array.push(temp_array);
						});
						
						//}
						
					}
				});
				
				chrome.runtime.sendMessage({"message": "processing_var", "array": var_pics_array, "index": 0});                                        	    		
			} else {
				alert("The storage is empty!!");
			}
		}); //----- reading of Chrome Storage------------------------------------------------
	} //if this is a Picture Upload frame----------------------------------------------------------------------------------------------------------------------------------------------------
}