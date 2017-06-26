fetch("api/playlist").then(function(response){return response.json()})
					 .then(function(data){
					 	for(i=0; i<data.data.length; i++){
					 		var playlist = new Playlist(data.data[i].id, data.data[i].name, data.data[i].image, '#main-container');
					 		playlist.build();
					 	}
					 })