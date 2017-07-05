// fetch("api/playlist").then(function(response){return response.json()})
// 					 .then(function(data){
// 					 	for(i=0; i<data.data.length; i++){
// 					 		var playlist = new Playlist(data.data[i].name, data.data[i].image, data.data[i].songs);
// 					 		playlist.build(data.data[i].id, '#main-container');
// 					 	}					 	
// 					 })
 
 Playlist.buildAll();
 
 $(".btn-add-pl").click((e)=>{
 	var new_pl_popup = new newPlaylistPopup(null, 'add-new-pl');
 	new_pl_popup.build();
 });




// function curvedText(text, radius){
// 	var text = text.split("");
// 	var deg_offset = 100 / text.length;
// 	var deg_origin = 0;
// 	var class_index = document.getElementsByClassName("curved-header")[0];
// 	console.dir(class_index);

// 	text.forEach((ea) => {
//     	ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${deg_origin}deg);transform-origin:0 100%'>${ea}</p>`;
//     	class_index.innerHTML += ea;
//     	deg_origin += deg_offset;
//   });
// }
// curvedText("test", 110)