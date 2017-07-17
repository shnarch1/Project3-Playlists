class Playlist {
	
	constructor(id=null, name=null, img_url=null, songs=null){
		this.id =id;
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

		var edit_btn = $("<div>", {class: "edit-btn", click: (e) => {this.edit(e)}})
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
				 		var playlist = new Playlist(null, data.data[i].name, data.data[i].image, data.data[i].songs);
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

	static get(pl_id){
		return new Promise((resolve) => {
			var get_pl_route = "http://localhost/playlist/api/playlist/" + pl_id;
			fetch(get_pl_route)
			.then((response) => {return response.json()})
			.then((data) => {resolve(data)});
		})
		
	}

	static get_songs(pl_id){
		return new Promise((resolve) => {
			var get_songs_route = "http://localhost/playlist/api/playlist/" + pl_id + "/songs";
			fetch(get_songs_route)
			.then((response) => {return response.json()})
			.then((data) => {resolve(data)});
		})
	}

	edit(e){
		var pl_container = e.target.closest('.plasylist-container');
		var pl_id = pl_container.dataset.id;

		var promises = [];
		var pl = Playlist.get(pl_id);
		var songs  = Playlist.get_songs(pl_id);
		promises.push(pl);
		promises.push(songs);

		Promise.all(promises).then((data) => {
			if(!Array.isArray(data[0])){
				var id = data[0].data.id;
				var img_url = data[0].data.image;
				var name = data[0].data.name;

				var songs = data[1].data.songs;
			}
			else{
				var id = data[1].data.id;
				var img_url = data[1].data.image;
				var name = data[1].data.name;

				var songs = data[0].data.songs;
			}

			var edit_pl_popup = new editPlaylistPopup(null,'add-new-pl',
												id, name, img_url, songs);
			edit_pl_popup.build();
		})

		// var route = "http://localhost/playlist/api/playlist/" + pl_id; 
		// fetch(route).then((response)=>{return response.json()}).then((d)=>{console.dir(d);})

		// var pop = new editPlaylistPopup(null, 'add-new-pl', pl_id, "avi", "avi", [{'name': 'name_avi', 'url': 'avi_url'}]);
		// pop.build();
	}

}

class playerPlaylist extends Playlist{
	constructor (id=null, name=null, img_url=null, songs=null){
		super(id, name, img_url, songs);
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

		var play_btn = $("<button>", {class: "play-pl glyphicon glyphicon-play"})
									.appendTo(pl_circle);
		
		pl_container.appendTo(container_name);
	}
}