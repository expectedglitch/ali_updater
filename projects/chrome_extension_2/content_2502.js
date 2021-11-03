chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

	if( request.message === "clicked_browser_action" ) {    		
		var myWindow = window.open("https://www.bizpolicy.ebay.com/businesspolicy/manage?entriesPerPage=10000", "catalog_win");
	}	

	if (request.message === "catalog_is_loaded" ) {		
		$('.page-title').append('\
			<div class="update_dashboard catalog">\
				<div>\
				  <input type="radio" id="changed_new" name="mode" value="changed_new" checked>\
				  <label for="changed_new">Changed + New</label>\
				</div>\
				<div>\
				  <input type="radio" id="new" name="mode" value="new">\
				  <label for="new">New</label>\
				</div>\
				<div>\
				  <input type="radio" id="changed" name="mode" value="changed">\
				  <label for="changed">Changed</label>\
				</div>\
				<div>\
				  <input type="radio" id="not_changed" name="mode" value="not_changed">\
				  <label for="not_changed">Not_Changed</label>\
				</div>\
				<div>\
				  <input type="radio" id="all" name="mode" value="all">\
				  <label for="all">All</label>\
				</div>\
				<span class="process_button">P R O C E S S</span>\
			</div>\
		');

		$(document).on('click', '.process_button', ()=>{
			option=$('input[name="mode"]:checked').val();

			$.post("https://listva-aw.com/php_functions/shipping_all_list.php",
				{},
		    	function(resp) {		    		
		    		policies_from_app=JSON.parse(resp);	    		
		    		list_rows=$('tbody').eq(3).find('tr');
		    		list_data=[];		    		
		    		policies_to_upload=[];
		    		
		    		$.each(list_rows, function(row_ind, row){
		    			list_data.push({
		    				"type":$(row).find('td:eq(2)').text().replace(/[\t\n\r]/gm,''),
		    				"id":$(row).attr('data-pid'),
		    				"name":$(row).find('td:eq(3) a').contents().not($(row).find('td:eq(3) a').children()).text(),
		    				"description":$(row).find('td:eq(4) div').text(),
		    				"listings_num":$(row).find('td:eq(6) a').contents().not($(row).find('td:eq(6) a').children()).text()
		    			});
		    			
		    		})
		    		
		    		$.each(policies_from_app, function(app_pol_ind, app_policy){
		    			if (existing_policy=list_data.find(function(row){return app_policy[0]==row.name})) {	    	
		    				status=(existing_policy.description!==app_policy[1])?"changed":"not_changed";
		    				policies_from_app[app_pol_ind]={"name":app_policy[0], "description":app_policy[1],"status":status, "id":existing_policy.id};		    				
		    			} else {	    				
		    				policies_from_app[app_pol_ind]={"name":app_policy[0], "description":app_policy[1],"status":"new"};		    				
		    			}
		    		});

		    		if (option=="new" || option=="changed" || option=="not_changed") {
		    			policies_to_upload=policies_from_app.filter(pol=>{return pol.status==option});
		    		} else if (option=="changed_new") {
		    			policies_to_upload=policies_from_app.filter(pol=>{return (pol.status=="new" || pol.status=="changed")});
		    		} else {
		    			policies_to_upload=policies_from_app.filter(pol=>{return pol});
		    		}


		    		if (policies_to_upload.length) {
		    			chrome.runtime.sendMessage({"message": "list_is_ready", "list": policies_to_upload, "option": option, "full_list_from_app": policies_from_app})
		    		} else alert ("THERE'S NO POLICIES to UPLOAD or UPDATE!")		    		
		    });
		});
	}

	if( request.message === "processing" ) {        		
		if (request.policy.status=="changed" || request.policy.status=="not_changed") {
			policy_url="https://www.bizpolicy.ebay.com/businesspolicy/shipping?pageNumber=1&profileId="+request.policy.id+"&totalPages=1&source=manage&entriesPerPage=200"
	    	var myWindow = window.open(policy_url, "policy_win");      
		} else if (request.policy.status=="new") {			
			policy_url="https://www.bizpolicy.ebay.com/businesspolicy/shipping?pageNumber=1&profileId=176511671011&totalPages=3&source=manage&copyPolicy=true"
	    	var myWindow = window.open(policy_url, "policy_win");      
		}
    }

	if( request.message === "page_is_loaded" ) {        		
						
		d_s='.update_dashboard .domestic_section';
		i_s='.update_dashboard .international_section';
			
		is_new=(document.URL.indexOf("copyPolicy=true")!==-1);
			
		//------------domestic----------------------------------------------------
		$(document).on('change', d_s+' .services', function(){	
			$('#domesticShipping select[name="shipService1"]').val($(this).val());
			if (!is_new){
				if ($(d_s+' .services').val()==$(d_s+' .prev_services').attr("data-value")) {
					$(d_s+' .prev_services').css({"color": "green", "font-weight":"700"});
					$(d_s+' .prev_services').removeClass("fld_chng");
					$(d_s+' .prev_services').addClass("fld_not_chng");
				} else {
					$(d_s+' .prev_services').css({"color": "red", "font-weight":"700"});
					$(d_s+' .prev_services').removeClass("fld_not_chng");
					$(d_s+' .prev_services').addClass("fld_chng");
				}
			}
			chrome.runtime.sendMessage({"message": "domestic_services", "value": $(this).val()}); 				
		});
		
		$(document).on('change', d_s+' .handling_time', function(){
			$('#domesticShipping .dd-grp:eq(4)').val($(this).val());
			if (!is_new){
				if ($(d_s+' .handling_time').val()==$(d_s+' .prev_handling_time').attr("data-value")) {
					$(d_s+' .prev_handling_time').css({"color": "green", "font-weight":"700"});
					$(d_s+' .prev_handling_time').removeClass("fld_chng");
					$(d_s+' .prev_handling_time').addClass("fld_not_chng");
				} else {
					$(d_s+' .prev_handling_time').css({"color": "red", "font-weight":"700"});
					$(d_s+' .prev_handling_time').removeClass("fld_not_chng");
					$(d_s+' .prev_handling_time').addClass("fld_chng");
				}
			}
			chrome.runtime.sendMessage({"message": "domestic_handling", "value": $(this).val()}); 		
		});
		//------------domestic----------------------------------------------------


		//------------international-----------------------------------------------
		$(document).on('change', i_s+' .services', function(){	
			$('#intlShipping select[name="intlShipService1"]').val($(this).val());		
			if (!is_new){
				if ($(i_s+' .services').val()==$(i_s+' .prev_services').attr("data-value")) {
					$(i_s+' .prev_services').css({"color": "green", "font-weight":"700"});
					$(i_s+' .prev_services').removeClass("fld_chng");
					$(i_s+' .prev_services').addClass("fld_not_chng");
				} else {
					$(i_s+' .prev_services').css({"color": "red", "font-weight":"700"});
					$(i_s+' .prev_services').removeClass("fld_not_chng");
					$(i_s+' .prev_services').addClass("fld_chng");
				}
			}
			chrome.runtime.sendMessage({"message": "international_services", "value": $(this).val()}); 				
		});
		//------------international-----------------------------------------------

		$(document).on('click', '.update_dashboard .save_button', ()=>{ 
			chrome.runtime.sendMessage({"message": "run_mode", "value": false});
			$('#w1-13').trigger('click');
		});    

		$(document).on('click', '.update_dashboard .run_button', ()=>{
			chrome.runtime.sendMessage({"message": "run_mode", "value": true});
			$('#w1-13').trigger('click');
			$('#w1-17').trigger('click');
		});

		$('.page-title').append('\
			<div class="update_dashboard '+request.option+'">\
				<span class="process_indication">Processing: <small>'+(request.ind+1)+'</small> / '+request.length+'</span>\
				<div class="domestic_section">\
					<div class="sec">\
						<span class="prev_services" data-value="'+((!is_new)?($('#domesticShipping select[name="shipService1"]').val()):"")+'">'
							+((!is_new)?($('#domesticShipping select[name="shipService1"] option:selected').text()):"NEW")+
						'</span>\
						<span class="prev_handling_time" data-value="'+((!is_new)?($('#domesticShipping .dd-grp:eq(4)').val()):"")+'">'
							+((!is_new)?($('#domesticShipping .dd-grp:eq(4) option:selected').text()):"NEW")+
						'</span>\
					</div>\
					<div class="sec">\
						<select class="services"></select>\
						<select class="handling_time"></select>\
					</div>\
				</div>\
				<div class="international_section">\
					<div class="sec">\
						<span class="prev_services" data-value="'+((!is_new)?($('#intlShipping select[name="intlShipService1"]').val()):"")+'">'
							+((!is_new)?($('#intlShipping select[name="intlShipService1"] option:selected').text()):"NEW")+
						'</span>\
					</div>\
					<div class="sec">\
						<select class="services"></select>\
					</div>\
				</div>\
				<span class="save_button">S A V E</span>\
				<span class="run_button">>>R U N >></span>\
			</div>\
			');
		
		
		//------------domestic----------------------------------------------------
		$(d_s+" .services").append($('select[name="shipService1"] option').clone());
		$(d_s+" .services").val(request.domestic_services);
		$(d_s+" .services").trigger("change");

		$(d_s+" .handling_time").append($('select[name="shipsWithinDays"] option').clone());
		$(d_s+" .handling_time").val(request.domestic_handling);
		$(d_s+" .handling_time").trigger("change");				
		//------------domestic----------------------------------------------------


		//------------international-----------------------------------------------
		$(i_s+" .services").append($('select[name="intlShipService1"] option').clone());
		$(i_s+" .services").val(request.international_services);
		$(i_s+" .services").trigger("change");
		//------------international-----------------------------------------------
				
		//$.post("https://listva-aw.com/php_functions/products_get_shipment_core.php",
		$.post("https://listva-aw.com/php_functions/headers_wrap.php",
			{	include_module: "products_get_shipment_core",
				sh_core_name:request.name},
	    	function(resp) {	    		
	    		policy=JSON.parse(resp)[0];
	    		$('#profileName').val(policy[1]);
	    		$('#profileDesc').val(policy[2]);
	    			    		
	    		policy[0].selected_free=policy[0].selected_free.map(function(free_cnt){if (free_cnt=="UK") return "GB"; else return free_cnt;});


	    		//...Exclusion List ...........................................................
	    		$('#editExclusionlist').trigger('click');

	    		$('span:not(:has(*)):contains([ Show all countries ])').trigger('click'); //expanding all the collapsed lists.....

	    		$.each($('.continent'), function(ind, continent){	    			
	    			if ($(continent).prop('checked')){
	    				$(continent).trigger('click');
	    				$(continent).trigger('click');	    				
	    			} else {	    				
	    				$(continent).trigger('click');
	    			}
	    		})
	    		
	    		$.each($('input[name="intlexcludeShipToLocations"]').
	    			add($('input[name="addexcludeShipToLocations"]')).
	    			add($('input[name="domexcludeShipToLocations"]')).not('.continent'), function(ind, chk_bx){
	    				//if (all_selected_countries.find(function(cnt){return cnt==$(chk_bx).attr('value')})) {
	    				if (policy[0].selected_free.find(function(cnt){return cnt==$(chk_bx).attr('value')})) {
	    					if ($(this).prop('checked')) $(this).trigger('click');
	    				} else {
	    					if (!$(this).prop('checked')) $(this).trigger('click');	    					
	    				}
	    				$(this).trigger('changed');
	    			})
	    		$('#w1-11').trigger('click');	 
	    		//.............................................................................
	    		
    			if (us_paid=policy[0].selected_paid.find(function(elem){return elem.code=="US"})){
    				$('#domesticShipping [name="freeShipping"]').prop("checked", false);
    				$('#domesticShipping [name="freeShipping"]').trigger('change');
    				$('#domesticShipping [name="shipFee1"]').val(us_paid.cost);
    				$('#domesticShipping [name="shipFee1"]').trigger('change');
    			} else {
    				$('#domesticShipping [name="freeShipping"]').prop("checked", false);
    				$('#domesticShipping [name="freeShipping"]').trigger('change');
    				$('#domesticShipping [name="shipFee1"]').val(0);
    				$('#domesticShipping [name="shipFee1"]').trigger('change');
    			}

    			if (request.run_mode) {//here we will continue the loop - in case the 'run_mode' parameter is set to 'true'    			
    				$('#w1-13').trigger('click'); // click on SAVE button
    				$('#w1-17').trigger('click'); // click on CONFIRM button - this dialog appears when we're changing the existing policy that is already associated with some product...
    			}
	    });
	}
		 
return true;

});