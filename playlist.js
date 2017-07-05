class Playlist {
	
	constructor(name=null, img_url=null, songs=null){
		this.name = name;
		this.img_url = img_url;
		this.songs = songs;
	}

	build(id, container_name){
		var pl_container = $("<div>", {class:"plasylist-container",
									   "data-id":id});
		var pl_header = $("<div>", {class:"curved-header",
									text:this.name})
									.appendTo(pl_container);
		var pl_img_container = $("<div>", {class:"pl-img-container"})
									.appendTo(pl_container);
		var pl_img = $("<img>", {src:this.img_url}).appendTo(pl_img_container);
		var pl_circle = $("<div>", {class:"circle"}).appendTo(pl_img_container);
		pl_container.appendTo(container_name);
	}

	static buildAll(){
		$('#main-container').empty();
		fetch("api/playlist").then((response)=>{return response.json()})
				 .then(function(data){
				 	for(var i=0; i<data.data.length; i++){
				 		var playlist = new Playlist(data.data[i].name, data.data[i].image, data.data[i].songs);
				 		playlist.build(data.data[i].id, '#main-container');
				 	}					 	
				 })
	}	
}

