class BasePopup{
	constructor(url){
		this.url = url;
	}

	build(){
		this._build_popup_container();
		this._import_content();
	}

	_remove(){
		this.popup_container.remove();
	}

	_build_popup_container(){
		this.popup_container = $("<div>", {id: "popup-container", tabindex: 0}).appendTo('body');
		this.popup_main = $("<div>", {id: "popup-main"}).appendTo(this.popup_container);

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

	_import_content(){
		fetch(this.url).then((response)=>{return response.text()})
		.then((content)=>{this.popup_main.append(content)})
	}
}

class newPlaylistPopup extends BasePopup{
	constructor(){
		this.playlist = new Playlist();
	}
}

// test = new BasePopup();
// test.build();