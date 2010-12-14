var _blippies = [];
var _lastStamp = "";

function setupBlippies(){
	for (i=0; i<5; i++){
		var img = $("<div class='blippy'>&nbsp;</div>");
		img.css("margin-top", i==0?10:-10);
		img.css("padding-left", Math.floor(Math.random()*660)+20);
		_blippies.push(img);
		$("#playground").append(img);
	}
}
	
function getBeer(){
	var twattie = document.createElement("script");
	twattie.type="text/javascript";
	twattie.src="http://search.twitter.com/search.json?q=beercamp&rpp=5&page=1&callback=bottomsUp&punk1=" + Math.floor(Math.random()*10000).toString() + "&punk2=" + Math.floor(Math.random()*10000).toString();
	$("head").append(twattie);
}

function bottomsUp(data){
	if (data.results.length>0){
		if (data.results[0]["created_at"] != _lastStamp){
			_lastStamp = data.results[0]["created_at"];
			for (i=0, ii=data.results.length; i<ii; i++){
				_blippies[i].slideUp().fadeOut().html("<p><a class='prof' href='http://twitter.com/"+data.results[i]["from_user"]+"'><img class='prof' src='" + data.results[i]["profile_image_url"] + "' /></a>"  + data.results[i]["text"] + "</p>").animate({"padding-left":Math.floor(Math.random()*680+20)}).fadeIn();
			}
		}
	}
}
$(document).ready(function(){
	setupBlippies();
	getBeer();
	setInterval(getBeer,2000);
});
