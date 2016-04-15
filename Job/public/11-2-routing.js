//LAB 11 - LOCATION OBJECT & ROUTING


//#### CONTENT FOR HOME PAGE ====
var contentHome = "公司荣誉";
contentHome += "dd";
//==== END OF CONTENT FOR HOME PAGE ####

//#### CONTENT FOR PRODUCTS PAGE ==== 
var contentProducts = "意见反馈";
contentProducts += "xxx";
//==== END OF CONTENT FOR PRODUCTS PAGE #### 

//#### CONTENT FOR ABOUT US PAGE ====
var contentAbout = "关于我们";
contentAbout += "vvv";

//==== END OF CONTENT FOR ABOUT US PAGE ####


var main = function(){
    console.log(window.location);

switch (window.location.search.trim()){
case "?home":
document.getElementById("output").innerHTML = contentHome;
            break;
case "?products":
document.getElementById("output").innerHTML = contentProducts;
            break;
case "?about":
document.getElementById("output").innerHTML = contentAbout;
            break;
default :
return;
    }
};

window.onload =main;