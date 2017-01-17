var videoList = new Array(); //global variable holds list of all videos
var _currentId = ""; //hold ID of currently played video

$(document).ready(function() {
    //making ajax call to request available videos list
    $.ajax({
        url: '/video/list',
        method: 'GET',
        datatype: "JSON",
        data: {},
        success: function(data){
            
            console.log(data);
                if(data.success && data.data.length >= 1){
                //if list successfully retrieved
                renderVideosList(data);
            } else {
                var container = $("#mainNavContainer");
                $(container).append('<div align="center"><h4>'+data.message +'</h4></div>');
            }
        },
        
        error: function () {
            alert("Oops! something went wrong.");
        }
        
    });
});

function renderVideosList(data) {
    var data = data.data;
    //render video list
    for(var items in data){
        //pushing object from data array in global videoList variable
        videoList.push(data[items]);
        var container = $('#mainNavContainer');
        var video = document.createElement('video');
        $(video).width('100%');
        $(video).height('100%');
        $(video).attr('id',data[items]['_id']);
        $(video).attr('src',data[items]['url']);
        $(video).attr('type',data[items]['type']);
        $(video).attr('title',data[items]['title']);
        //on click function
        $(video).click(function(){
            _currentId = this.id;  //change the global _currentId variable
            playVideo(this); //this will contains all attributes of video
        });
        //appending this video to a tag
        var div = document.createElement('div');
        $(div).attr("class","col-sm-6");
        $(div).css({"width": '220',"height": '160'});
        $(div).append(video);
        //appending this tag to main container
        $(container).append(div);
    }
}


//This function will be run when someone clicks on the video. 
//It will update src attribute, show mainPlayerContainer and play the video
function playVideo(payloads){
	//getting video details from main list
	var _details = getVideoDetails(_currentId);
    console.log(_details);
	var container = $('#mainPlayerContainer');
	$('#videoTitle').text(payloads.title);
    //since we don't have details property inside payloads we need to get it from global videoList array
	$('#videoDescription').text(_details.description);
	var video = document.getElementById('mainPlayer');
	$(video).attr('controls');
	$(video).attr('src',payloads.src);
	$(video).attr('type',payloads.type);
	video.play(); //appending video element to main player container
	//changing styles of other container
	$('#premainNavContainer').css("width","25%");
	$(container).fadeIn(500); //displaying container
}

//Use _id of the clicked video and compare it with the _id of videos in gloabl array videoList
//If true break from the loop and return video information
function getVideoDetails(id){
	var temp = {};
	for(var items in videoList){
		if(videoList[items]['_id'] == id){
			temp = videoList[items];
			console.log(temp);
			break;
		}
	}
	return temp;
}
//This function is called from inside index.html
//It will show popup with more information about the video
function moreInfo(){
	//getting video details from from global videoList array
	var _details = getVideoDetails(_currentId);
	$('#modalTitle').text(_details.title);
	$('#modalBody').text(_details.description);
	$('#moreInfo').modal('show');
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    