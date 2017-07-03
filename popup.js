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

	
}

class newPlaylistPopup extends BasePopup{
	constructor(url, class_name){
		super(url, class_name);
		this.playlist = new Playlist();
	}

	build(){
		this._build_popup_container();
		this._build_content();
	}

	_build_content(){
		var header = $("<header>", {text: "Add New Plalist"})
						.appendTo(this.popup_main);

		var content = $("<div>", {class: "add-new-pl-content"})
						.appendTo(this.popup_main);

		var form = $("<form>").appendTo(content);

		var inputs = $("<div>").appendTo(form);

		var name_label = $("<label>", {text: "Playlist Name"})
						.appendTo(inputs);

		var name_input = $("<input>", {type: "text",
						 name:"pl_name",
						 placeholder: "e.g Blood Sugar Sex Magic"})
						.appendTo(name_label);
		name_input.focus();

		var url_label = $("<label>", {text: "Playlist URL"})
						.appendTo(inputs);

		var url_input = $("<input>", {type: "text",
						 name:"pl_url",
						 placeholder: "http://"})
						.appendTo(url_label);

		var buttons = $("<div>", {class: "add-new-pl-content-btns"})
						.appendTo(form);

		var next_btn = $("<input>", {id: "next",
						 type: "submit",
						 value:"Next"})
						.appendTo(buttons);

		var next_btn = $("<input>", {id: "next",
		 				 type: "reset",
		 				 value:"Reset Fields"})
						.appendTo(buttons);

		var image_preview = $("<div>", {class:"image-preview"})
						.appendTo(content)
						.append($("<span>", {text: "Preview"}));
	}

}


// test = new BasePopup('new_pl.html', 'add-new-pl');
// test.build();