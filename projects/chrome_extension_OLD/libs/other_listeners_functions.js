function run_promo(request){
	if (document.URL.search("promoted-listing")!==-1) {  //if it is Promoted Listings frame ...............................................................................................
	 	yyy=document.getElementById("optinCheckbox")
		if (yyy.checked==false) yyy.click();
		qqq=document.getElementById("adRate");	

	    $.post( "https://listva-aw.com/settings/read_settings.php",
	        {	},
	    function(resp) {	
	        response = JSON.parse(resp);
			$prom_lst_rate=response.prom_lst_rate;
		     
			zzz=Number(qqq.value)-$prom_lst_rate;  // $prom_lst_rate - is the rate we are going to set (FROM SETTINGS DB)
			if (zzz>0) for (i=1; i<=Math.round(zzz*10); i++) document.getElementsByClassName("btn btn--regular spinner")[0].click();   // here we are setting Promoted listings' Rate
			if (zzz<0) for (i=1; i<=Math.round(zzz*(-10)); i++) document.getElementsByClassName("btn btn--regular spinner")[1].click();   // here we are setting Promoted listings' Rate
			
			//console.log('before_promo_is_finished');
	        if (request.message!== "promo_single") chrome.runtime.sendMessage({"message": "promo_is_finished"});                                        	    

		});
	}

	if (document.URL.search("bulksell.ebay.com/ws/eBayISAPI.dll")!==-1) {
		block_sku();
	}	
}


function run_vars(request) {
	if (document.URL.search("bulksell.ebay.com/ws/eBayISAPI.dll")!==-1) { //if it is the Top frame of the page.............................................................................
	vars_enter=document.getElementById("var_create")||document.getElementById("var_edit");
	vars_enter.click();
	}
}


function current(request) {
	if (document.URL.search("msku")!==-1) {
	qqq=document.getElementById("msku-photos_variations");
	fff=qqq.getElementsByTagName("li");
	for (i=0; i<fff.length; i++) 
		if (fff[i].getElementsByTagName("a")[0].innerText.toUpperCase().replace(/\s/g,'')==request.array[request.index][0].toUpperCase().replace(/\s/g,'')) {fff[i].click(); break;}				
	chrome.runtime.sendMessage({"message": "upload_picture", "array": request.array, "index": request.index});                                        	    
	}
}


function current_pic_upload(request) {
	if (document.URL.search("picupload/main")!==-1 && window.name=="photo-iframe-picupload-variations") {  
      		if (document.getElementById("tg-thumbs").getElementsByClassName("prog").length>0){
			qqq=document.getElementById("tm-topMsg");
			fff=qqq.getElementsByClassName("recommendedCount msg");
			sss=fff[0].getElementsByClassName("multiple")[0];
			ggg=sss.getElementsByClassName("deleteAll")[0].click();
			document.getElementsByClassName("b1 btn btn-m btn-ter")[0].click();   }//if some pictures (by some chance) are already present there then we are deleting them.........
		document.getElementsByClassName("copyWebLink2")[0].click();
		document.getElementById("cw-inpList").getElementsByTagName("input")[0].value="https://firsthand.000webhostapp.com/Images/"+request.array[request.index][1];		
		document.getElementsByClassName("btn btn-prim btn-m")[1].click();     //here we are confirming the image downloading from the URL..............................


	        if (request.index+1<request.array.length) chrome.runtime.sendMessage({"message": "processing_var", "array": request.array, "index": request.index+1}); 
		else chrome.runtime.sendMessage({"message": "start_table"}); 		
    }
}


function ar_ind (ar1) {  //this function will convert the array [37, 35,80,24,890,36] to [4, 2, 5, 1, 6, 3]  (FOR EXAMPLE)
    www=Array();
    ar2=Array();
	$(ar1).each(function(index,value){www[index]=[index,value]})
	www.sort(function(a,b) {return a[1]-b[1]})
	$(www).each(function(index,value){value[1]=index})
	www.sort(function(a,b) {return a[0]-b[0]})
	$(www).each(function(index,value){ar2[index]=value[1]+1;})	
	return ar2;
}

function main_table_loading(request) {
	if (document.URL.search("msku")!==-1) { //if it is a Variations Editing frame .....................................................................................................................

	    chrome.storage.local.get(['varsArray'], function(result) {
			if (typeof result.varsArray) {
													
				//for (i=2; i<result.varsArray.length; i++) if (result.varsArray[i][0]=="PIC_VAR") break;  // "i" is the number of the string in our Clipboard array which is following right away after the last STRING_n				
				//pic_var_str=i;	
				//for (i=pic_var_str; i<result.varsArray.length; i++) if (result.varsArray[i][0]=="ali_link") break;  // "i" is the number of the string in our Clipboard array which is following right away after the last STRING_n
				//ali_link=i;	

				qqq=document.getElementById("msku-grid-wrapper-w0")||document.getElementById("msku-grid-wrapper");
				www=qqq.getElementsByClassName("grid-body");
				eee=www[0].getElementsByClassName("grid-row");
				//scl=result.varsArray[1][1];
				for_deleting=0;
				for (k=0; k<eee.length; k++){ // the ROWS of the MAIN Table........................................
					
					//for (i=pic_var_str+1; i<ali_link; i++) {	 	   

					//$(eee[k]).find('td:eq(4) ul li:eq(1) a').click(); // setting UPC to 'Does not apply'................
					//eee[k].getElementsByTagName("td")[4].getElementsByTagName("ul")[0].getElementsByTagName("li")[1].getElementsByTagName("a")[0].click();

					before_vars_col_ind=4;
					if ($(qqq).find('.grid-head th.upc').length){ //if UPC column exist in the table (sometimes it doesn't - in some categories of goods)
						$(eee[k]).find('td:eq('+before_vars_col_ind+') div:eq(0) input').val("Does Not Apply");
						var event = new Event('change', { view: window,  bubbles: true,  cancelable: true});
						$(eee[k]).find('td:eq('+before_vars_col_ind+') div:eq(0) input')[0].dispatchEvent(event);  //Here we are setting UPC to "Does Not Apply" value......................
					} else { //if UPC column doesn't exist that means that after the SKU column the first Variation column follows immediately
						before_vars_col_ind=3;
					}

					//eee[k].getElementsByTagName("td")[0].getElementsByTagName("input")[0].click(); //here we are marking the rows to delete them some later......................

					//debugger;

					row_found=0;
					$.each(result.varsArray.vars, (var_ind, variation)=>{ //variations from the Object..........................
						if (!row_found){
						
							//str_match=1;
						


	/*						var ind=new Array ();
							attribs=document.getElementsByClassName("var-tag")[0].getElementsByClassName("inline-block"); // the List of Categories (attributes) in the Top section of the page ...
							for (jjj=0; jjj<attribs.length-1; jjj++){		
								for (lll=0; lll<result.varsArray.length; lll++) if (result.varsArray[lll][1].toUpperCase().replace(/\s/g,'')==attribs[jjj].innerText.trim().toUpperCase().replace(/\s/g,'')) break;				
								ind.push(lll);
							} //here we are comparing the order of Variations categories - because it can change sometimes.........................
							ind=ar_ind(ind);

							for (j=1; j<=scl; j++){
								if (result.varsArray[i][ind[j-1]].toUpperCase().replace(/\s/g,'')!==eee[k].getElementsByTagName("td")[4+j].innerText.toUpperCase().replace(/\s/g,'')) str_match=0;
							}*/

							this_row_match=1;
							attribs=document.getElementsByClassName("var-tag")[0].getElementsByClassName("inline-block"); // the List of Categories (attributes) in the Top section of the page ...
							for (jjj=0; jjj<attribs.length-1; jjj++){	//looping throught the head of the page (categories)..............
								$.each(result.varsArray.cats, (cat_ind, category)=>{ //categories from my Object..................................
									// console.log(attribs[jjj].innerText.trim().toUpperCase().replace(/\s/g,''));
									// console.log(category);
									if (category.name.toUpperCase().replace(/\s/g,'')==attribs[jjj].innerText.trim().toUpperCase().replace(/\s/g,'')) {
										// console.log(category.name.toUpperCase().replace(/\s/g,''));
										// console.log(attribs[jjj].innerText.trim().toUpperCase().replace(/\s/g,''));
										// console.log('')
										// console.log(variation.values[cat_ind].toUpperCase().replace(/\s/g,''));
										// console.log(eee[k].getElementsByTagName("td")[4+jjj+1].innerText.toUpperCase().replace(/\s/g,''));
										// console.log('      www       ');
										//if (variation.values[cat_ind].toUpperCase().replace(/\s/g,'')!==eee[k].getElementsByTagName("td")[4+jjj+1].innerText.toUpperCase().replace(/\s/g,'')) this_row_match=0;
										if (variation.values[cat_ind].toUpperCase().replace(/\s/g,'')!==eee[k].getElementsByTagName("td")[before_vars_col_ind+jjj+1].innerText.toUpperCase().replace(/\s/g,'')) this_row_match=0;
									}
								})											
							} 

							//console.log(this_row_match);

									
							if (this_row_match){ 
								sku=eee[k].getElementsByTagName("td")[3].getElementsByTagName("div")[0].getElementsByTagName("textarea")[0]; 
								//sku.value=result.varsArray[i][Number(scl)+1];   //SKU value......................................................................
								sku.value=variation.sku;   //SKU value......................................................................
				     			var event = new Event('change', { view: window,  bubbles: true,  cancelable: true});
				                sku.dispatchEvent(event);  //Here we are ispatching Change event for the input/textarea field.....................................

								//qnt=eee[k].getElementsByTagName("td")[4+attribs.length].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
								qnt=eee[k].getElementsByTagName("td")[before_vars_col_ind+attribs.length].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
								//qnt.value=result.varsArray[i][Number(scl)+2]; //Quantity..........................................................................
								qnt.value=variation.quantity; //Quantity..........................................................................
				       			var event = new Event('change', { view: window,  bubbles: true,  cancelable: true});
				                qnt.dispatchEvent(event);  //Here we are ispatching Change event for the input/textarea field.....................................

								//pr=eee[k].getElementsByTagName("td")[4+attribs.length+1].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
								pr=eee[k].getElementsByTagName("td")[before_vars_col_ind+attribs.length+1].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
								//pr_value=result.varsArray[i][Number(scl)+3].substring(1);
								pr_value=variation.price;

								/*dec=String(pr_value).substring(String(pr_value).search("\\.")+1);
								int=String(pr_value).substring(0,String(pr_value).search("\\."));									  
								if (dec>30) pr_value=Number(String(int)+"\."+String(99));
								else pr_value=Number(String(Number(int)-1)+"\."+String(99));*/
									   
								pr.value=pr_value;
				       			var event = new Event('change', { view: window,  bubbles: true,  cancelable: true});
				                pr.dispatchEvent(event);  //Here we are ispatching Change event for the input/textarea field.....................................
				                row_found=1;
								//break;
							}		
						}
					})

					//}
					if (!row_found) {	//************the we should DELETE this row from the Table
						eee[k].getElementsByTagName("td")[0].getElementsByTagName("input")[0].click(); //here we are marking the rows to delete them some later......................
						for_deleting=1;		
					}
				}

				if (for_deleting>0) { //here we will actually delete what was marked for deleting previously................
				    document.getElementById("msku-bulkedit-w3").getElementsByClassName("btn btn--small right space-right")[0].click();		
				}

			} else {
				alert("The storage is empty!!");
			}
		
		});
	     
	}
}