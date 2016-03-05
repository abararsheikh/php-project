/**
 * New node file
 */



//var pickup='';
	/*	function changePickUpTime(pickupt){
			$("#pickup-time").html(pickupt+'<span class="caret"></span>');
			pickup=pickupt;
		}*/
    	
    	var foodMap = {};
    	var foodArr = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
		"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ];
    	var foodTotal = 0;
    	function addFood(HOcode,price,desc,itemid){
    		
    		//ttype
    		var indexBlankFood = foodArr.indexOf(HOcode+itemid);		
    		if(indexBlankFood==-1){
    			indexBlankFood = foodArr.indexOf("");
    			foodArr[indexBlankFood] = HOcode+itemid;			
    		}
    		
    		//for ttype
    		var food = foodMap[HOcode+itemid];
    		var strPlusMinus="";
    		if(food!=null && food!=""){
    			var res = food.split("--");
    			var qty = parseInt(res[2]);
    			qty = qty+1;
    			foodMap[HOcode+itemid] = desc + "--" + itemid + "--"+qty + "--" + price+"--"+HOcode;
    			strPlusMinus='<a href="javascript:void(0);" class="fa fa-minus" onclick="removeFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>'
					+'<span class="numb-food">'+qty+'</span>'
					+'<a href="javascript:void(0);" class="fa fa-plus"  onclick="addFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>';
    		}
    		else{
    			foodMap[HOcode+itemid] = desc + "--" + itemid + "--1--" + price+"--"+HOcode;
    			strPlusMinus='<a href="javascript:void(0);" class="fa fa-minus" onclick="removeFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>'
				+'<span class="numb-food">'+1+'</span>'
				+'<a href="javascript:void(0);" class="fa fa-plus"  onclick="addFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>';
    		}
    		foodTotal += parseInt(price);
    		var id = "#xx_"+HOcode+'_'+itemid;
    		$(id).html(strPlusMinus);
    		$("#food_head").show();
//    		$(".total").remove();
    		$("#food_summary").html('');
    		$("#food_summary").append(getFoodsSelected());
           $("#food_summary").append('<tr class="total"><td  colspan="2">Total</td><td align="right"><span><i class="fa fa-inr"></i> '+numeral(foodTotal/100).format('0.00')+'</span></td></tr>'
        		   +'<tr class="total-add"><td colspan="2">GRAND TOTAL</td><td align="right"><span><i class="fa fa-inr"></i> '+numeral(foodTotal/100+totalPrice/100).format('0.00')+'</span></td></tr>');
//           
//            $(".scroller").getNiceScroll().resize();
    	}

    	function removeFood(HOcode,price,desc,itemid){
    		//for ttype
    		var food = foodMap[HOcode+itemid];
    		var strPlusMinus="";
    		if(food!=null){
    			var res = food.split("--");
    			var qty = parseInt(res[2]);
    			qty = qty-1;
    			if(qty==0){
    				foodMap[HOcode+itemid] = "";
    				//ttype
    				var indexBlankFood = foodArr.indexOf(HOcode+itemid);
    				if(indexBlankFood!=-1){
    					foodArr[indexBlankFood] = "";
    				}
    				strPlusMinus='<a href="javascript:void(0);" class="fa fa-minus disabled"></a>'
					+'<span class="numb-food">'+qty+'</span>'
					+'<a href="javascript:void(0);" class="fa fa-plus"  onclick="addFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>';
    			}
    			else{
    				foodMap[HOcode+itemid] = desc + "--" + itemid + "--"+qty + "--" + price+"--"+HOcode;
    				strPlusMinus='<a href="javascript:void(0);" class="fa fa-minus" onclick="removeFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>'
					+'<span class="numb-food">'+qty+'</span>'
					+'<a href="javascript:void(0);" class="fa fa-plus"  onclick="addFood(\''+HOcode+'\',\''+price+'\',\''+desc+'\',\''+itemid+'\')" ></a>';
    			}				
    		}
    		foodTotal -= parseInt(price);
    		var id = "#xx_"+HOcode+'_'+itemid;
    		$(id).html(strPlusMinus);
    		
    		$("#food_head").show();
    		$("#food_summary").html('');
    		$("#food_summary").append(getFoodsSelected());
    		$("#food_summary").append('<tr class="total"><td  colspan="2">Total</td><td align="right"><span><i class="fa fa-inr"></i> '+numeral(foodTotal/100).format('0.00')+'</span></td></tr>'
         		   +'<tr class="total-add"><td colspan="2">GRAND TOTAL</td><td align="right"><span><i class="fa fa-inr"></i> '+numeral(foodTotal/100+totalPrice/100).format('0.00')+'</span></td></tr>');  		   				
//            $(".scroller").getNiceScroll().resize();
    	}

		function getFoodsSelected(){
			var foodSelectstr = "";
    		for(var i=0;i<foodArr.length;i++){
    			if(foodArr[i]!=""){
    				var fods = foodMap[foodArr[i]].split("--");
					foodSelectstr +='<tr><td  colspan="2">'+fods[0]+' ('+fods[2]+' Qty)</td><td align="right"><i class="fa fa-inr"></i> '+numeral((fods[3]/100)*fods[2]).format('0.00')+'</td></tr>';
    				/*if(foodSelectstr==""){
    					var fods = foodMap[foodArr[i]].split("--");
    					foodSelectstr += fods[0] +' ('+fods[2]+' Qty)';
    				}
    				else{
    					var fods = foodMap[foodArr[i]].split("--");
    					foodSelectstr+="," + fods[0] +' ('+fods[2]+' Qty)';
    				}	*/			
    			}
    		}
    		return foodSelectstr;
		}
    	
    	function display(){
    		var foodstr = "";
    		for(var i=0;i<foodArr.length;i++){
    			if(foodArr[i]!=""){
    				if(foodstr==""){
    					foodstr+=foodMap[foodArr[i]];
    				}
    				else{
    					foodstr+=","+foodMap[foodArr[i]];
    				}				
    			}
    		}
    		return foodstr;
    	}
    
    	function toPayment(type,e){
    		/*if(userid=='' || userid==0){
    			openlogin(e);  
    			click_height = e.pageY;
    			return;
    		}*/
    		if(type=='FOOD'){
    			var pickup = $("#pickup-time").val();
				getFpayNow(foodTotal,display(),pickup);
			}
			else{
				getFpayNow(0,'','');
			}		
    	}
    	
    	
    	function getFpayNow(fb_totalprice,fb_itemStrDescription,pickuptime){    		
    		$("#please-wait").css("display","block");
    		$("body").css("overflow","hidden");
    		 dwrService.getFpayNow(cinemacode,transid,fb_totalprice,fb_itemStrDescription,pickuptime,{
			     callback : fpaynowSuccess,
			     errorHandler : fpaynowError})
		}
    	
    	function fpaynowSuccess(data) {
    		$("#please-wait").css("display","none");
    		$("body").css("overflow","auto");
    		
    		if(data.result=='success'){
    			gotoPage('/payment/'+data.output.payVO.bookingVO.moviename.toLowerCase().replace(/ /g,'-').replace(/\//g, '-'));
    		}
    		else{
    			$("#errordiv").css('display','block');
    			$("#errordiv").html('<span>'+data.msg+'</span>');    			
    		} 
    	}
    	
    	function fpaynowError() {
    		alert('System error');
    		$("#please-wait").css("display","block");
    		$("body").css("overflow","hidden");
    	} 
    	
    	