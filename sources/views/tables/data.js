import {JetView} from "webix-jet";

function toUserButton(){
	return "<div class='webix_el_button'><button class='webixtype_base'>Выдать</button></div>";

}

export default class DataView extends JetView {
	config() {
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				//поменять айдишники в таблице
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" },
				{ id:"toUser", header:"", width:75, template:toUserButton, click:() => this.form.showEventForm()},
				{ id:"isbn", header:["ISBN", {content:"textFilter"} ], sort:"text" },
				{ id:"title", header:["Название", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"author", header:["Автор", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"year", header:["Год", {content:"textFilter"} ], sort:"int"},
				{ id:"genre", header:["Жанр", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"quantity", header:"Количество", sort:"int"},
				{ id:"status", header:"Статус", sort:"int"}
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"Книга будет удалена. <br/> Вы уверены?",
						ok:"Да",
						cancel:"Назад",
						callback: res => {
							if (res)
								this.app.callEvent("book:delete",[id.row]);
						}
					});
				},
				"wxi-pencil":(e, id) => {
					//вызов формы
					const item = this.getRoot().getItem(id);
					this.app.callEvent("form:fill", [item]);
				},
			}
		};
	}
}
