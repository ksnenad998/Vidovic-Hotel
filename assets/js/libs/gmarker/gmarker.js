function CustomMarker( latlng, map, args ) {
	this.latlng = latlng;	
	this.args   = args;	
	this.setMap(map);	
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
	
	var self = this;
	var div  = this.div;
	
	if (!div) {
	
		div = this.div = document.createElement('div');
		div.className = 'pin_container';

		var pinDiv = document.createElement('div');
			pinDiv.className = 'pin';
		var pulseDiv = document.createElement('div');
			pulseDiv.className = 'pulse';
			pinDiv.appendChild(pulseDiv);
			div.appendChild(pinDiv);
		
		if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}
		
		google.maps.event.addDomListener(div, "click", function(event) {
			alert('You clicked on a custom marker!');			
			google.maps.event.trigger(self, "click");
		});
		
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}
	
	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	
	if (point) {
		div.style.left = (point.x - 10) + 'px';
		div.style.top = (point.y - 20) + 'px';
	}
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}	
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;	
};	
