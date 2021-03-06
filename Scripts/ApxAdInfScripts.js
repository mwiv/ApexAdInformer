var mobile = isMobile();
if(window.readyState = "loading"){
    if(mobile) toMobile();
}

//CHECK IF DEVICE IS MOBILE OR DESKTOP
window.addEventListener("load", function(){

    //CHECK VIEWPORT WIDTH
    console.log("?? DEVICE - " + navigator.platform);
    console.log("?? MOBILE - " + mobile);

    if(mobile){

    }
    else{

        //        MAKE HEADER OPAQUE ON SCROLL
        window.addEventListener("scroll", function(){
            var scroll_pos = (saf_body.scrollTop == 0) ? body.scrollTop: saf_body.scrollTop;
            //    console.log("SCROLL:: " + scroll_pos);
            if(scroll_pos > 15){
                makeOpaque();
            }
            else{
                makeSolid();
            }
        });
        //        ADJUST THUMBANIL MARGINS AND DESC TXTX NARGIN ON RESIZING
        window.addEventListener("resize", function() {
            if(objectHeightChanged("desk_head"))
                adjustMargin();
            if(objectHeightChanged("desk_mob_pdf_thumb"))
                adjustThumbSpanHeight();

            setOrgImgMargins();
        });

        //SET INITIAL VALUES, MARGINS AND HEIGHTS ON LOAD
        initial_header_height = parseInt(window.getComputedStyle(document.getElementById("desk_head")).height);
        initial_mob_thumb_height = parseInt(window.getComputedStyle(document.getElementById("desk_mob_pdf_thumb")).height);
        initial_desk_thumb_height = 0; //parseInt(window.getComputedStyle(document.getElementById("desk_desk_web_prev_thumb")).height);
        initial_org_img_cont_HGT = parseInt(window.getComputedStyle(document.getElementById("desk_ad")).height);

        console.log("INITIAL VALUES:: ");
        console.log("header-height: " + initial_header_height);
        console.log("mob-thumb-height: " + initial_mob_thumb_height);
        console.log("desk-thumb-height: " + initial_desk_thumb_height);

        adjustMargin();
        adjustThumbSpanHeight();
        setOrgImgMargins();
    }


    //SHOW ORIGINAL IMAGE IN VIEWER
    document.getElementById("desk_ad_prev_thumb").addEventListener("click", function() {showFile("desk_ad_prev_thumb")});
    //SHOW MOBILE PDF IN VIEWER
    document.getElementById("desk_mob_pdf_thumb").addEventListener("click", function() {showFile("desk_mob_pdf_thumb")});
    document.getElementById("desk_mob_ttl").addEventListener("click", function() {showFile("desk_mob_pdf_thumb")});
    //SHOW DESKTOP PDF IN VIEWER
    //document.getElementById("desk_desk_pdf_thumb").addEventListener("click", function() {showFile("desk_desk_pdf_thumb")});
    //document.getElementById("desk_desk_ttl").addEventListener("click", function() {showFile("desk_desk_pdf_thumb")});

    //CLOSE VIEWER
    document.getElementById("exit_view").addEventListener("click", function() {
        hideViewer();
        console.log("...Viewer Closed")
    });
});

//TELL IF DEVICE IS MOBILE 
function isMobile(){
    return (navigator.userAgent.match(/IPhone/i) ||
            navigator.userAgent.match(/IPad/i) ||
            navigator.userAgent.match(/Ipod/i) ||
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/webOS/i));
}

//CHNAGE SETTINGS FOR MOBILE DISPLAY
function toMobile(){
    //    DESKTOP COMPONENT
    var desk_comp_class = document.querySelectorAll('.desk_comp');
    desk_comp_class.forEach(function(item, index) {
        desk_comp_class[index].style.display = "block";
        desk_comp_class[index].style.width = "90%";

        desk_comp_class[index].style.marginTop = "0px";
        //        desk_comp_class[index].style.marginRight = "auto";
        desk_comp_class[index].style.marginBottom = "100px";
        //        desk_comp_class[index].style.marginLeft = "auto";

    });

    //    DESKTOP HEADING
    var desk_head_comp = document.getElementById('desk_head');
    desk_head_comp.style.position = "absolute";
    desk_head_comp.style.marginTop = "2vw";
    desk_head_comp.style.width = "75vw";

    //    CENTER HEADER
    console.log(window.getComputedStyle(desk_head_comp).marginRight);
    console.log(window.innerWidth);
    console.log(window.getComputedStyle(desk_head_comp).width);
    console.log((window.innerWidth - parseInt(window.getComputedStyle(desk_head_comp).width)) / 2);


    desk_head_comp.style.left = "0px";
    var new_margin = ((window.innerWidth - parseInt(window.getComputedStyle(desk_head_comp).width)) / 2) + "px";
    desk_head_comp.style.marginLeft = new_margin;
    desk_head_comp.style.marginRight = new_margin;

    //    FONT SIZES
    var desk_ttl_class = document.querySelectorAll('.desk_ttl');
    desk_ttl_class.forEach(function(item, index) {});

    var desc_box_comp = document.getElementById("desc_box");
    desc_box_comp.style.height = "auto";
    adjustMargin();

    adjustThumbSpanHeight();
    document.getElementById("desk_desk_web_prev").style.height = "auto";

}

var web_view_height = (mobile)? "4700px": "210000px";

//SHOW FILE IN FILE VIEWER
function showFile(obj_id) {
    console.log("ID:: " + obj_id);
    console.log("SRC:: " + document.getElementById(obj_id).src);
    var output = "";
    //SET OUTPUT SRC TO IMG
    if(obj_id.indexOf("pdf") < 0) {
        output = document.getElementById("img_view_src");
        output.src = document.getElementById(obj_id).src;

        console.log(">>> IMG");
        console.log("SRC CHNGE:: " + document.getElementById("img_view_src"));
        output.style.display = "inline";
        output.style.height = "auto";
    }
    //SET OUTPUT SRC TO PDF
    else {
        var mob_src = "IMG_Files/ApxMobView.jpg";
        var desk_src = "";

        output = document.getElementById("pdf_view_src");
        console.log(">>> PDF");
        output.style.display = "inline";
        if(obj_id.indexOf("desk_desk") >= 0){
            output.src = desk_src;
            console.log("SRC CHNGE:: " + output);
        }
        else {
            output.src = mob_src;
            console.log("SRC CHNGE:: " + output.src);
        }
        output.style.height = web_view_height;
    }
    output.style.width = "70vw"; 
    output.style.height = "auto";


    //SHOW VIEWER
    document.getElementById("viewer_div").style.display = "inline";

    //LOCK SCROLLING OF BODY
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";


    console.log("...Showing Viewer");
}
//HIDE FILE VIEWER
function hideViewer(){
    //HIDE VIEWER
    document.getElementById("viewer_div").style.display = "none";

    //UNLOCK SCROLLING
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "auto";



    //CLEAR SOURCES
    document.getElementById("pdf_view_src").style.display = "none";
    document.getElementById("pdf_view_src").style.width = 0;
    document.getElementById("pdf_view_src").style.height = 0;
    document.getElementById("pdf_view_src").src = "";
    document.getElementById("img_view_src").style.display = "none";
    document.getElementById("img_view_src").style.height = 0;
    document.getElementById("img_view_src").style.width = 0;
}




//CHECK IF TH EHEIGHT OF AN OBJECT HAS CHANGED
function objectHeightChanged(object_id){
    var return_value = false;
    var which = "HMD";

    //HEADER OR MOPB/DESK THUMBNAIL
    switch(true){
        case object_id.indexOf("head") >= 0: 
            return_value = (parseInt(document.getElementById(object_id).style.height) != initial_header_height);
            which = "H";
            break;
        case object_id.indexOf("mob") >= 0: 
            return_value = (parseInt(document.getElementById(object_id).style.height)!= initial_mob_thumb_height);
            which = "M";
            break;
        case object_id.indexOf("org") >= 0:
            return_value = (parseInt(document.getElementByClassName(object_id)[0].style.height)!= initial_org_img_cont_HGT);
            which = "O";
    }

    //    console.log("HEIGHT CHANGE CHECK: " + return_value + " - " + which);

    if(return_value) {
        switch(which){
            case "H": initial_header_height = parseInt(document.getElementById("desk_head").style.height);
                break;
            case "M": initial_mob_thumb_height = parseInt(window.getComputedStyle(document.getElementById("desk_mob_pdf_thumb")).height);
                break;
        }
    }
    return return_value;
}

//ADJUST MARGIN TOP OF DESC TXT BOX BASED ON HEIGHT OF HEADER 
var prev_desc_box_removal = 0; 
var new_margin = 0;

function adjustMargin(){
    console.log("--- adjustMargin() --")
    //COMPUTED STYLES NOT SET
    var header_top = parseInt(window.getComputedStyle(document.getElementById("desk_head")).top);
    var header_margin_top = parseInt(window.getComputedStyle(document.getElementById("desk_head")).marginTop);
    var header_height = parseInt(window.getComputedStyle(document.getElementById("desk_head")).height);
    var container_top = parseInt(window.getComputedStyle(document.getElementsByClassName("desk_body")[0]).marginTop);
    var description_box_padding_top = parseInt(window.getComputedStyle(document.getElementById("desc_box")).paddingTop);

    var temp_marg = ((header_top + header_margin_top) + header_height - description_box_padding_top + 10);

    if(temp_marg != new_margin) {
        new_margin = temp_marg;

        document.getElementById("desc_box").style.marginTop = new_margin + "px"; //ADD TO TOP


        var curr_desc_bx_height = parseInt(window.getComputedStyle(document.getElementById("desc_box")).height) + prev_desc_box_removal; //ADD PREV REMOAVL (OUT OF ORIGINAL WHOLE)
        console.log("...DB height:: " + curr_desc_bx_height);

        document.getElementById("desc_box").style.height = (curr_desc_bx_height - new_margin) + "px";
        console.log("...NEW DB height:: " + document.getElementById("desc_box").style.height);
        prev_desc_box_removal = new_margin;
        //SUBTRACT FROM BOTTOM

        //        + "px";
        console.log("header-top: " + header_top);
        console.log("header-height: " + header_height);
        console.log("header-top-margin: " + header_margin_top);
        console.log("container-top: " + container_top);
        console.log("desc_box_pad-top: " + description_box_padding_top);

        console.log(">> NEW desc text top margin: " + new_margin);
        console.log(">> NEW desc text height: " + (curr_desc_bx_height - new_margin));
    }
}

//VERTICALLY CENTRE ORG IMG 
function setOrgImgMargins(){
    var desc_body_hgt = parseInt(window.getComputedStyle(document.getElementById("desc_box")).height);

    var desc_top_marg = parseInt(window.getComputedStyle(document.getElementById("desc_box")).marginTop);

    var desc_bot_marg = parseInt(window.getComputedStyle(document.getElementById("desc_box")).marginBottom);

    //        SET HEIGHT EQUAL TO DESC BODY HEIGHT
    var cont_HGT = desc_body_hgt + desc_top_marg + desc_bot_marg;
    //        window.getComputedStyle(document.getElementById("desk_ad"))

    console.log("CONTAINER HEIGHT - " + cont_HGT);

    var thumb_HGT = parseInt(window.getComputedStyle(document.getElementById("desk_ad_prev_thumb")).height);

    console.log("IMG HEIGHT - " + thumb_HGT);

    var new_org_marg = ((cont_HGT - thumb_HGT) / 2);

    document.getElementById("desk_ad_prev_thumb").style.marginTop = new_org_marg + "px";
    document.getElementById("desk_ad_prev_thumb").style.marginBottom = new_org_marg + "px";

    console.log(">> NEW org img margin top/bottom: " + new_org_marg);
    console.log("new height - " + document.getElementById("desk_ad").height)
}
//set onload
var initial_header_height = 0;
var initial_desk_thumb_height = 0;
var initial_mob_thumb_height = 0;
var initial_org_img_cont_HGT = 0;
//CONTROL HEIGHT OF THUMB SPAN
function adjustThumbSpanHeight(){
    //TITLE AREA
    var desk_ttl_ht = 0;//parseInt(window.getComputedStyle(document.getElementById("desk_desk_ttl")).height);
    var mob_ttl_ht = parseInt(window.getComputedStyle(document.getElementById("desk_mob_ttl")).height);

    var lg = (desk_ttl_ht > mob_ttl_ht) ? desk_ttl_ht: mob_ttl_ht;

    //    console.log("Larger: " + desk_ttl_ht)
    document.getElementById("desk_desk_ttl").style.height = lg + "px";
    document.getElementById("desk_mob_ttl").style.height = lg + "px";


    //THUMBNAIL AREA 
    var new_height = (initial_mob_thumb_height + (80));
    console.log(initial_mob_thumb_height);
    initial_mob_thumb_height = new_height;

    new_height+= "px";

    document.getElementById("desk_mob_web_prev").style.height = new_height;
    //    document.getElementById("desk_desk_web_prev").style.height = "auto";// new_height;

    console.log(">> NEW mobile/desktop viewer height: " + new_height);

}

// --- CHNAGE OPACITY OF HEADER AFTER SCROL POSITION ---
var saf_body = document.body;
var body = document.documentElement;

//MAKE HEADER OPAQUE
function makeOpaque(){
    var header_ref = document.getElementById("desk_head");
    header_ref.style.transition = "opacity 1s";
    header_ref.style.opacity = "50%";
    console.log(">> OPAQUE header")
}
//MAKE HEADER SOLID
function makeSolid(){
    var header_ref = document.getElementById("desk_head");
    //    header_ref.style.transition = "opacity 3s";
    header_ref.style.opacity = "100%";
    console.log(">> NOT OPAQUE header");
}
