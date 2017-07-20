class Player{
	constructor(playlist, container_name = "#main-container"){
		this.container_name = container_name;
		this.playlist = playlist;
		this.song_containers_list = [];

	}

	build(){
		$(this.container_name).empty();
		var player_container = $("<div>", {id: "player-container"})
						.appendTo(this.container_name);

		this.img_container = $("<div>", {id: "player-img-container"})
								.appendTo(player_container);

		this.playlist.build(null, "#player-img-container");

		var controls_and_songs_container = $("<div>", {id: "controls-songs-container"})
								.appendTo(player_container);

		var controls = $("<audio>", {controls: true, autoplay: true})
								.appendTo(controls_and_songs_container);

		this.now_playing = $("<p>", {id: "now-playing", text:"NOW PLAYING: "})
								.append($("<span>", {id:"now-playing-name", text: ""}))
								.appendTo(controls_and_songs_container);

		var songs_container = $("<div>", {id: "songs-container"})
								.appendTo(controls_and_songs_container);
		$(this.playlist.songs).each((index, el) => {
			if (index == 0){
				$("<source>", {src: el.url, type:"audio/mp3"}).appendTo(controls);
			}
			this._build_song(el.name, index).appendTo('#songs-container')
		});

		$(controls).on("playing", (e) => {
			var song_container
			$(this.playlist.songs).each((index, el) =>{
				if (el.url === e.target.currentSrc){
					$(this.now_playing).find("#now-playing-name").text(el.name);
					$(this.song_containers_list[index]).attr('id', 'active-song')
					return false; //breaks the loop
				}
			});


			this.img_container.find('img').removeClass('pause-playlist-rotate')
			this.img_container.find('img').addClass('rotate-playlist')

			$('.circle').removeClass('glyphicon glyphicon-play');
			$('.circle').addClass('glyphicon glyphicon-pause');
		})

		$(controls).on("pause", (e) => {
			this.img_container.find('img').addClass('pause-playlist-rotate');

			$('.circle').removeClass('glyphicon glyphicon-pause');
			$('.circle').addClass('glyphicon glyphicon-play');

		})

		$(controls).on("ended", (e) => {
			console.dir("end");
			$(this.playlist.songs).each((index, el) =>{
				if (el.url === e.target.currentSrc){
					if(index != this.playlist.songs.length -1){
						$(this.song_containers_list[index]).attr('id', "");
						var next_song_index = index + 1;
						e.target.src = this.playlist.songs[next_song_index].url;
					}
					else{
						$(this.song_containers_list[index]).attr('id', "");
					}
					return false; //breaks the loop
				}
			});

		})


	}

	_build_song(name, index){
		var song_container = $("<div>", {class: "song-container"})
								.append($("<button>", {text: name, "data-song_index": index, click: (e) => {this._play_song(e)}}));
		this.song_containers_list.push(song_container);
		return song_container;
	}

	_play_song(e){
		var song_to_play_index = e.target.dataset.song_index;
		var current_song_url = $("audio")[0].currentSrc;
		var current_song_index = this._get_index_by_url(current_song_url);
		$(this.song_containers_list[current_song_index]).attr("id","");
		$("audio")[0].src = this.playlist.songs[song_to_play_index].url;
	}

	_get_index_by_url(url){
		var index = null;
		$(this.playlist.songs).each((i, el) => {
			if (el.url === url){
				index = i;
				return false; //breaks the loop
			}

		});
		return index;
	}
}