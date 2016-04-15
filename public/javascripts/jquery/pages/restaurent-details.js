/*//(function(){
	console.log(window.glResAddressLat1);	
	function initMap(){
			
		//var myLatLng = {lat: $resAddressLat, lng: $resAddressLng };
		var myLatLng = {lat: 0, lng: 0 };
		var	map = new google.maps.Map(document.getElementById('res_coord'),{			
			zoom: 8,
			center: myLatLng
		});
		var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: $resName || 0
		});
	}

	window.load = initMap();
//})(window);

*/
