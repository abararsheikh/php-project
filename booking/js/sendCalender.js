/**
 * Created by ran on 4/12/2016.
 */
function init(){
    warningGoBack();
}

function warningGoBack(){
    window.onbeforeunload = function() { return "You work will be lost."; };
}

init();