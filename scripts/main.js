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