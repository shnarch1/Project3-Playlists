class BasePopup{
	constructor(url, class_name){
		this.url = url;
		this.class_name = class_name;
	}

	build(){
		this._build_popup_container();
		this._import_content()
	}

	_remove(){
		this.popup_container.remove();
	}

	_build_popup_container(){
		this.popup_container = $("<div>", {id: "popup-container", tabindex: 1}).appendTo('body');
		this.popup_main = $("<div>", {id: "popup-main", class: this.class_name}).appendTo(this.popup_container);

		this.popup_container.click((event) => {
			if (event.target === event.currentTarget){
				this._remove();
			}
		});

		this.popup_container.keydown((event) => {
			if(event.keyCode === 27){
				this._remove();
			}
		});
	}

	// _import_content(){
	// 	var myHeaders = new Headers();
	// 	var myInit = { method: 'GET',
 //               		   headers: myHeaders};
	//     myHeaders.append("Content-Type", "text/html");
		
	// 	fetch(this.url).then((response)=>{return response.text()})
	// 	.then((content)=>{this.popup_main.append(content); console.dir(this);})
	// }

	_import_content(){
	
		// fetch(this.url).then((response)=>{return response.text()})
		// .then((content)=>{ return new Promise((resolve)=>{
		// 	this.popup_main.append(content);
		// 	resolve()})})
		// .then(()=>{return new Promise((resolve)=>{this._test(); resolve()})})

		fetch(this.url).then((response)=>{return response.text()})
		.then((content)=>{this.popup_main.append(content)})
	}

	static isSongUrlValid(user_input) {
    	var pattern = "^(https?://)(www\\.)?([-a-z0-9]{1,63}\\.?)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.?[a-z]{2,6}(/[-\\w@\\+\\.?~#\\?&/=%]*)?.mp3$";
    	var url = new RegExp(pattern,"i");
    	if (url.test(user_input)) {
        	return true;
    	}
    	return false;
	}

	static isImgUrlValid(user_input) {
    	var pattern = "^(https?://)(www\\.)?([-a-z0-9]{1,63}\\.?)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.?[a-z]{2,6}(/[-\\w@\\+\\.?~#\\?&/=%]*)?$";
    	var url = new RegExp(pattern,"i");
    	if (url.test(user_input)) {
        	return true;
    	}
    	return false;
	}

	static isNameValid(user_input){
		var pattern = "^([a-zA-Z0-9_-\\s]){1,15}$";
		var name = new RegExp(pattern,"i");
		if (name.test(user_input)) {
        	return true;
    	}
    	return false;
	}

	
}

class newPlaylistPopup extends BasePopup{
	constructor(url, class_name, pl_id=null, pl_name=null, pl_img_url=null, pl_songs=null){
		super(url, class_name);
		this.playlist = new Playlist(pl_id, pl_name, pl_img_url, pl_songs);
		this.name_is_valid = false;
		this.url_is_valid = false;
	}

	build(){
		this._build_popup_container();
		this._build_add_new_playlist();
	}

	_build_add_new_playlist(){
		var header = $("<header>", {text: "Add New Playlist"})
						.appendTo(this.popup_main);

		var content = $("<div>", {class: "add-new-pl-content"})
						.appendTo(this.popup_main);

		var form = $("<form>").appendTo(content);

		$(form).on('reset', (e) => { $('#popup-main').find('input').each((index, el) => {
				if($(el).hasClass('input-err')){
					$(el).removeClass('input-err')
				}			
			});
		})

		var inputs = $("<div>").appendTo(form);

		var name_label = $("<label>", {text: "Playlist Name"})
						.appendTo(inputs);

		var name_input = $("<input>", {id: "pl-name",
						 type: "text",
						 value: this.playlist.name,
						 name:"pl_name",
						 placeholder: "e.g Blood Sugar Sex Magic"})
						.appendTo(name_label);
		name_input.focus();

		$(name_input).on('input', (e) => {this._check_name(e)});

		var url_label = $("<label>", {text: "Playlist URL"})
						.appendTo(inputs);

		var url_input = $("<input>", {id: 'pl-url',
						 type: "text",
						 value: this.playlist.img_url,
						 name:"pl_url",
						 placeholder: "http://"})
						.appendTo(url_label);

		$(url_input).on('input', (e) => {this._update_preview(e)});

		var buttons = $("<div>", {class: "add-new-pl-content-btns"})
						.appendTo(form);

		var next_btn = $("<input>", {id: "next",
						 click: (e)=>{this._next(e)},
						 type: "submit",
						 value:"Next"})
						.appendTo(buttons);

		var reset_btn = $("<input>", {id: "next",
		 				 type: "reset",
		 				 value:"Reset Fields"})
						.appendTo(buttons);

		var image_preview_container = $("<div>", {class:"image-preview-container"})
						.appendTo(content);

		if(this.playlist.img_url == null) {
			var image_preview_template = $("<div>", {class:"image-preview-template"})
							.appendTo(image_preview_container)
							.append($("<span>", {text: "Preview"}));
		}
		else{
			var image_preview = $("<img>", {src: this.playlist.img_url})
							.appendTo(image_preview_container);
		}		

	}


	// _update_preview(e){
	// 	var img_url = e.target.value;
	// 	console.dir(img_url);
	// 	$(".image-preview-container").empty();
	// 	$("<img>", {src: img_url, error: (e) => {
	// 		$("<div>", {class:"image-preview-template"})
	// 					.appendTo($(".image-preview-container"))
	// 					.append($("<span>", {text: "Preview"}));
	// 	}}).appendTo($(".image-preview-container"));
	// }

	_check_name(e){
		var name = e.target.value;
		if (!BasePopup.isNameValid(name)){
			$(e.target).addClass('input-err')
			this.name_is_valid = false;
		}
		else{
			$(e.target).removeClass('input-err')
			this.name_is_valid = true;
		}
	}

	_update_preview(e){
		var img_url = e.target.value;

		if(BasePopup.isImgUrlValid(img_url)){
			this.url_is_valid = true;
			$(e.target).removeClass('input-err');
			this._check_image_url(img_url)
			.then(this._create_image_preview, this._create_image_preview_template);
		}

		else{
			this.url_is_valid = false;
			$(e.target).removeClass();
			$(e.target).addClass('input-err');
			this._create_image_preview_template();
			console.log("URL is not valid");
		}
		

	}

	_create_image_preview(img_url){
		
		$(".image-preview-container").empty();
		$("<img>", {src: img_url}).appendTo($(".image-preview-container"));
	}

	_create_image_preview_template(){
		$(".image-preview-container").empty();
		$("<div>", {class:"image-preview-template"})
						.appendTo(".image-preview-container")
						.append($("<span>", {text: "Preview"}));
	}

	_check_image_url(url){
		return new Promise((resolve, reject) => {
			var img = $("<img>", {src: url});
			$(img).on("load", () => {
				this.img_is_valid = true;
				console.dir("loaded");
				resolve(url);
			})

			$(img).on("error", () => {
				this.img_is_valid = false;
				console.dir("rejected");
				reject();
			})
		})
	}

	_next(e){
		e.preventDefault();
		var name_input = this.popup_main.find('#pl-name');
		var url_input = this.popup_main.find('#pl-url');
		this.playlist.name = name_input.val();
		this.playlist.img_url = url_input.val();
		
		if(this.name_is_valid && this.img_is_valid){
			this._build_add_plsylist_songs();
		}
		else{
			if (!this.name_is_valid){
				name_input.addClass('input-err');
			}
			if (!this.img_is_valid){
				url_input.addClass('input-err');
			}
		} 
			

		// if ( BasePopup.isNameValid(this.playlist.name) &&
		// 	 BasePopup.isImgUrlValid(this.playlist.img_url) &&
		// 	 this.img_is_valid == true){
		// 		this._build_add_plsylist_songs();
		// }
		// else{
		// 	if (!BasePopup.isNameValid(this.playlist.name)){
		// 		name_input.removeClass();
		// 		name_input.addClass('input-err');
		// 	}
		// 	else{
		// 		name_input.removeClass('input-err');
		// 	}	
		// 	if(!BasePopup.isImgUrlValid(this.playlist.img_url)){
		// 		url_input.removeClass();
		// 		url_input.addClass('input-err');
		// 	}
		// 	else{
		// 		url_input.addClass('input-err');
		// 	}
		// 	if (!this.img_is_valid){
		// 		url_input.addClass('input-err');
		// 		if(!this.popup_container.find("#err-msg").length){
		// 			$("<p>", {id: "err-msg", text: "Image does not exist!"})
		// 				.appendTo('form > div:first-child');
		// 		}
				
		// 	}
		// }
	}

	_build_add_plsylist_songs(){
		this.popup_main.empty();
		this.popup_main.removeClass("add-new-pl");
		this.popup_main.addClass("add-pl-songs");

		var header = $("<header>", {text: "Add Playlist Songs"})
						.appendTo(this.popup_main);
		
		var form = $("<form>").appendTo(this.popup_main);

		var new_songs_inputs = $("<div>", {id: "new-songs-inputs"})
						.appendTo(form);

		//If songs exists (Edit Mode)
		if(this.playlist.songs != null){
			for(var i = 0; i<this.playlist.songs.length; i++){
				var new_song = $("<div>", {class: "new-song"});
				var song_url = $("<label>", {text: "Song URL"})
										.append($("<input>", {type: "text",
															  name:"song-url",
															  value: this.playlist.songs[i].url}))
										.appendTo(new_song);
				var song_name =$("<label>", {text: "Name:"})
										.append($("<input>", {type: "text",
															  name:"song-name", 
															  value: this.playlist.songs[i].name}))
										.appendTo(new_song);
				song_url.find('input').on('input', (e) => {this._check_song_url(e)});
				song_name.find('input').on('input', (e) => {this._check_song_name(e)});
				
				new_song.appendTo(this.popup_main.find("#new-songs-inputs"));
			}
		}
		
		var buttons = $("<div>", {id: "buttons"}).appendTo(form);

		var btn_add_song = $("<button>", {click: (e)=>{this._add_new_song_inputs(e)}})
							.append($("<span>", {class: "glyphicon glyphicon-plus-sign"}))
							.append($("<span>", {text: "Add another song"}))
							.appendTo(buttons);

		var submit = $("<input>", {type: "submit",
								   value: "FINISH & SAVE",
								   click: (e) => {this._finish_and_save(e)}})
							.appendTo(buttons);

	}

	_add_new_song_inputs(e){
		e.preventDefault();

		var new_song = $("<div>", {class: "new-song"})
						.append($("<label>", {text: "Song URL",
											  dblclick: (e) => {$(e.target).parent().remove();}})
									.append($("<input>", {class:"song-url-input", type: "text", name:"song-url"})))
						.append($("<label>", {text: "Name:"})
									.append($("<input>", {class:"song-name-input", type: "text", name:"song-name"})));
		
		new_song.find(".song-url-input").on('input', (e) => {this._check_song_url(e)});
		new_song.find(".song-name-input").on('input', (e) => {this._check_song_name(e)});
		
		new_song.appendTo(this.popup_main.find("#new-songs-inputs"));
	}

	_check_song_name(e){
		var name = e.target.value;
		if (!BasePopup.isNameValid(name)){
			if (!$(e.target).hasClass('input-err')){
				$(e.target).addClass('input-err');			
			}
			return false;
		}
		else{
			if ($(e.target).hasClass('input-err')){
				$(e.target).removeClass('input-err')
			}
			return true;
		}
	}

	_check_song_url(e){
		var url = e.target.value;
		if (!BasePopup.isSongUrlValid(url)){
			if (!$(e.target).hasClass('input-err')){
				$(e.target).addClass('input-err');			
			}
			return false;
		}
		else{
			if ($(e.target).hasClass('input-err')){
				$(e.target).removeClass('input-err')
			}
			return true;
		}
	}

	_finish_and_save(e){
		e.preventDefault();
		
		var songs  = [];
		var all_inputs_are_valid = true;
		$(".add-pl-songs").find(".new-song").each(function(index, el) {
			var inputs = $(el).find('input');
			var song_url = $(inputs[0]).val(); 
			var song_name = $(inputs[1]).val();

			all_inputs_are_valid = all_inputs_are_valid && BasePopup.isNameValid(song_name) && BasePopup.isSongUrlValid(song_url);
			
			if(song_url != "" && song_name !=""){
				songs.push({"name": song_name, "url": song_url});
			}
			else{
				if (song_url == ""){
					console.dir($(el));
					$(el).find(".song-url-input").addClass('input-err');
				}
				if (song_name == ""){
					$(el).find(".song-name-input").addClass('input-err');
				}
			}
			
		});
		
		if(all_inputs_are_valid){
			this.playlist.songs = songs;
		
			var formData = new FormData();
			formData.append("name", this.playlist.name);
			formData.append("image", this.playlist.img_url);
			for(var i = 0; i < this.playlist.songs.length; i++){
				formData.append("songs[" + i + "][name]",  this.playlist.songs[i].name);
				formData.append("songs[" + i + "][url]",  this.playlist.songs[i].url);
			}
			

			var myInit = {method: 'POST',
	    				  body:formData
	    				}
			fetch('http://localhost/playlist/api/playlist', myInit)
			.then((response)=>{return new Promise((resolve, reject)=>{
				if(response.status == 200){
					resolve(response.status);
				}
				else{
					reject(response.status);
				}
			})})
			.then((data)=>{this._remove(); Playlist.buildAll()})
			.catch((e)=> {$(this.popup_main)
							.append($("<p>", {class: "err-msg",
											  text:e + ": An error occurred. Please try again later."}))});
		}
	}

}

class editPlaylistPopup extends newPlaylistPopup{
	constructor(url, class_name, pl_id, pl_name, pl_img_url, pl_songs){
		super(url, class_name);
		this.playlist.id = pl_id;
		this.playlist.name = pl_name;
		this.playlist.img_url =  pl_img_url;
		this.playlist.songs = pl_songs;
	}

	build(){
		super.build();
		this.name_is_valid = true;
		this.img_is_valid = true;

		$('form').on('reset', (e) => { $('#popup-main').find('input').each((index, el) => {
				this.img_is_valid = true;
				if($(el).hasClass('input-err')){
					$(el).removeClass('input-err')
				}			
			});
		})
	}

	// build(){
	// 	this._build_popup_container();
	// 	this._build_edit_playlist();
	// }

	// _build_edit_playlist(){
	// 	var header = $("<header>", {text: "Edit Playlist"})
	// 					.appendTo(this.popup_main);

	// 	var content = $("<div>", {class: "add-new-pl-content"})
	// 					.appendTo(this.popup_main);

	// 	var form = $("<form>").appendTo(content);

	// 	var inputs = $("<div>").appendTo(form);

	// 	var name_label = $("<label>", {text: "Playlist Name"})
	// 					.appendTo(inputs);

	// 	var name_input = $("<input>", {id: "pl-name",
	// 					 type: "text",
	// 					 value: this.playlist.name,
	// 					 name:"pl_name",
	// 					 placeholder: "e.g Blood Sugar Sex Magic"})
	// 					.appendTo(name_label);
	// 	name_input.focus();

	// 	var url_label = $("<label>", {text: "Playlist URL"})
	// 					.appendTo(inputs);

	// 	var url_input = $("<input>", {id: 'pl-url',
	// 					 type: "text",
	// 					 value: this.playlist.img_url,
	// 					 name:"pl_url",
	// 					 placeholder: "http://"})
	// 					.appendTo(url_label);

	// 	var buttons = $("<div>", {class: "add-new-pl-content-btns"})
	// 					.appendTo(form);

	// 	var next_btn = $("<input>", {id: "next",
	// 					 click: (e)=>{this._next(e)},
	// 					 type: "submit",
	// 					 value:"Next"})
	// 					.appendTo(buttons);

	// 	var reset_btn = $("<input>", {id: "reset",
	// 	 				 type: "reset",
	// 	 				 value:"Reset Fields"})
	// 					.appendTo(buttons);

	// 	var image_preview = $("<div>", {class:"image-preview-container"})
	// 					.append($("<img>", {src: this.playlist.img_url}))
	// 					.appendTo(content);
	// }

	// _next(e){
	// 	e.preventDefault();
	// 	this.playlist.name = this.popup_main.find('#pl-name').val();
	// 	this.playlist.img_url = this.popup_main.find('#pl-url').val();
	// 	this._build_edit_plsylist_songs();
	// }

	// _build_edit_plsylist_songs(){
	// 	this.popup_main.empty();
	// 	this.popup_main.removeClass("add-new-pl");
	// 	this.popup_main.addClass("add-pl-songs");

	// 	var header = $("<header>", {text: "Edit Playlist Songs"})
	// 					.appendTo(this.popup_main);
		
	// 	var form = $("<form>").appendTo(this.popup_main);

	// 	var new_songs_inputs = $("<div>", {id: "new-songs-inputs"})
	// 					.appendTo(form);

	// 	// var new_song = $("<div>", {class: "new-song"})
	// 	// 				.append($("<label>", {text: "Song URL"})
	// 	// 							.append($("<input>", {type: "text", name:"song-url"})))
	// 	// 				.append($("<label>", {text: "Name:"})
	// 	// 							.append($("<input>", {type: "text", name:"song-name"})));

	// 	var buttons = $("<div>", {id: "buttons"}).appendTo(form);

	// 	for(var i = 0; i<this.playlist.songs.length; i++){
	// 		var new_song = $("<div>", {class: "new-song"})
	// 					.append($("<label>", {text: "Song URL"})
	// 								.append($("<input>", {type: "text", name:"song-url", value: this.playlist.songs[i].url})))
	// 					.append($("<label>", {text: "Name:"})
	// 								.append($("<input>", {type: "text", name:"song-name", value: this.playlist.songs[i].name})));
	// 		new_song.appendTo(this.popup_main.find("#new-songs-inputs"));
	// 	}

	// 	var btn_add_song = $("<button>", {click: (e)=>{this._add_new_song_inputs(e)}})
	// 						.append($("<span>", {class: "glyphicon glyphicon-plus-sign"}))
	// 						.append($("<span>", {text: "Add another song"}))
	// 						.appendTo(buttons);

	// 	var submit = $("<input>", {type: "submit",
	// 							   value: "FINISH & SAVE",
	// 							   click: (e) => {this._finish_and_save(e)}})
	// 						.appendTo(buttons);

	// }

	_update_playlist(){

		return new Promise((resolve) => {
			var formData = new FormData();
			formData.append("name", this.playlist.name);
			formData.append("image", this.playlist.img_url);

			var myInit = {method: 'POST',
    				  	  body:formData
    					}
    		var update_pl_route = 'http://localhost/playlist/api/playlist/' + this.playlist.id;

    		fetch(update_pl_route, myInit)
    		.then((response) => {
    			if(response.ok){
    				resolve(response)
    			}
    		})
		})
	}

		_update_songs(){

		return new Promise((resolve) => {
			var songs  = [];
			$(".add-pl-songs").find(".new-song").each(function(index, el) {
				var inputs = $(el).find('input');
				var song_url = $(inputs[0]).val(); 
				var song_name = $(inputs[1]).val(); 
				if(song_url != "" && song_name !=""){
					songs.push({"name": song_name, "url": song_url});
				}
			});
			this.playlist.songs = songs;

			var formData = new FormData();
			for(var i = 0; i < this.playlist.songs.length; i++){
			formData.append("songs[" + i + "][name]",  this.playlist.songs[i].name);
			formData.append("songs[" + i + "][url]",  this.playlist.songs[i].url);
			}

			var myInit = {method: 'POST',
    				  	  body:formData
    					}

			var update_songs_route = 'http://localhost/playlist/api/playlist/'
									+ this.playlist.id + '/songs';

			fetch(update_songs_route, myInit)
    		.then((response) => {
    			if(response.ok){
    				resolve(response)
    			}
    		})
		})
	}



	_finish_and_save(e){
		e.preventDefault();
		var songs  = [];
		var all_inputs_are_valid = true;
		$(".add-pl-songs").find(".new-song").each(function(index, el) {
			var inputs = $(el).find('input');
			var song_url = $(inputs[0]).val(); 
			var song_name = $(inputs[1]).val();

			all_inputs_are_valid = all_inputs_are_valid && BasePopup.isNameValid(song_name) && BasePopup.isSongUrlValid(song_url);
			
			if(song_url != "" && song_name !=""){
				songs.push({"name": song_name, "url": song_url});
			}
			else{
				if (song_url == ""){
					console.dir($(el));
					$(el).find(".song-url-input").addClass('input-err');
				}
				if (song_name == ""){
					$(el).find(".song-name-input").addClass('input-err');
				}
			}
			
		});
		
		if(all_inputs_are_valid){

			var promises = [];
			var update_pl = this._update_playlist();
			var update_songs = this._update_songs();
			promises.push(update_pl);
			promises.push(update_songs);

			Promise.all(promises).then((data)=>{this._remove(); Playlist.buildAll()})
		}	
	}



	// _finish_and_save(e){
	// 	e.preventDefault();

	// 	var promises = [];
	// 	var update_pl = this._update_playlist();
	// 	var update_songs = this._update_songs();
	// 	promises.push(update_pl);
	// 	promises.push(update_songs);

	// 	Promise.all(promises).then((data)=>{this._remove(); Playlist.buildAll()})
	// }


}

// class playerPopup extends BasePopup{
// 	constructor(url, class_name){
// 		super(url, class_name);
// 		this.playlist = new playerPlaylist();
// 	}

// 	build(pl){
// 		this._build_popup_container();
// 		this._build_player(pl);
// 	}

// 	_build_popup_container(){
// 		super._build_popup_container();
// 		this.popup_container.attr("id", "player-popup-container")
// 		this.popup_main.removeClass();
// 		this.popup_main.attr("id","player-main");
// 		// this.songs_container = $("<div>", {id: "songs-container"})
// 								// .appendTo(this.popup_container);
// 	}

// 	_build_player(pl){ 
// 		var img_container = $("<div>", {id: "player-img-container"})
// 								.appendTo(this.popup_main);
// 		this.playlist.img_url = pl.img_url;
// 		this.playlist.build(null, "#player-img-container");
// 		var controls_and_songs_container = $("<div>", {id: "controls-songs-container"})
// 								.appendTo(this.popup_main)
// 		var controls = $("<audio>", {controls: true})
// 								.appendTo(controls_and_songs_container);

// 		var now_playing = $("<span>", {id: "now-playing", text:"Now Playing: " + pl.name})
// 								.appendTo(controls_and_songs_container);

// 		var songs_container = $("<ol>", {id: "songs-container"})
// 								.appendTo(controls_and_songs_container);
// 		$(pl.songs).each((index, el) => {
// 			$("<source>", {src: el.url, type:"audio/mp3"}).appendTo(controls);
// 			this._build_song(el.name).appendTo('#songs-container')
// 		});
// 	}

// 	_build_song(name){
// 		var song_container = $("<li>", {class: "song-container", text: name});	
// 		return song_container;
// 	}
// }

// test = new BasePopup('new_pl.html', 'add-new-pl');
// test.build();