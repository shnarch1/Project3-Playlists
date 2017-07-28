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

 //TODO - Add 'playlist header' as data attribute on pl element in order to improve search performance
 $("#menu-container input[type=search]").keyup((e)=>{
 	var search_text = e.target.value;
 	console.dir(search_text);
 	$('#main-container .plasylist-container').each((index, el)=>{
 		var pl_header = $(el).find(".curved-header").text();
 		if(!pl_header.toLowerCase().includes(search_text.toLowerCase())){
 			$(el).hide();
 		}
 		else{
 			$(el).show();
 		}
 	});;
 });




// function curvedText(text, radius){
// 	var text = text.split("");
// 	var deg_offset = 100 / text.length;
// 	var deg_origin = deg_offset * (-1);
// 	var class_index = document.getElementsByClassName("curved-header")[0];
// 	$(class_index).empty();
// 	console.dir(class_index);

// 	text.forEach((ea) => {
//     	ea = `<span style='height:${radius}px;position:absolute; top:-28px; left: -7px; transform:rotate(${deg_origin}deg);transform-origin:0 100%'>${ea}</span>`;
//     	class_index.innerHTML += ea;
//     	deg_origin += deg_offset;
//   });
// }
// curvedText("test", 156)