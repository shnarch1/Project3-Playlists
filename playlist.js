class Playlist {
	
	constructor(_id=null, name=null, img_url=null, container_name=null){
		this._id = _id;
		this.name = name;
		this.img_url = img_url;
		this.container_name = container_name;
	}

	build(){
		var pl_container = $("<div>", {class:"plasylist-container",
									   "data-id":this._id});
		var pl_header = $("<div>", {class:"curved-header",
									text:this.name})
									.appendTo(pl_container);
		var pl_img_container = $("<div>", {class:"pl-img-container"})
									.appendTo(pl_container);
		var pl_img = $("<img>", {src:this.img_url}).appendTo(pl_img_container);
		var pl_circle = $("<div>", {class:"circle"}).appendTo(pl_img_container);
		pl_container.appendTo(this.container_name);
	}	
}

