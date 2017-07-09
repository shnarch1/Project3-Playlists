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

		var del_edit_btns_container = $("<div>", {class: "del-edit-btns-container"})
									.appendTo(pl_img_container);

		var del_btn = $("<div>", {class: "del-btn", click: (e) => {this.delete(e)}})
									.append($("<button>")
										.append($("<sapn>", {class: "glyphicon glyphicon-remove"})))
									.appendTo(del_edit_btns_container);

		var edit_btn = $("<div>", {class: "edit-btn"})
									.append($("<button>")
										.append($("<sapn>", {class: "glyphicon glyphicon-pencil"})))
									.appendTo(del_edit_btns_container);

		var pl_circle = $("<div>", {class:"circle"}).appendTo(pl_img_container);

		var play_btn = $("<button>", {class: "play-pl"})
									.append($("<span>", {class: "glyphicon glyphicon-play"}))
									.appendTo(pl_circle);
		
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

	delete(e){
		var pl_container = e.target.closest('.plasylist-container');
		var pl_id = pl_container.dataset.id;
		Playlist.delete_playlist(pl_id)
		.then(() => {$(pl_container).remove()});
		// .then((res => {return res.json()}))
		// .then((status) => {console.dir(d);});
	}

	static delete_playlist(id){
	
		return new Promise((resolve) => {
			var myInit = {method: 'DELETE'};
			var route = "http://localhost/playlist/api/playlist/" + id;

			var test = fetch(route, myInit)
			.then((response) => {
				if(response.ok){
					resolve(response);
				}
				else{
					return Promise.reject(response.statusText)
				}
			}).catch((err) => {console.dir("DEBUG: delete_playlist() fetch error - " + " ' " + err + " '")});
			});
	}

}

