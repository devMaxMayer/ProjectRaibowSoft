import {JetView} from "webix-jet";

function toArchButton(){
	return "<div class='webix_el_button'><button class='webixtype_base'>Сдать</button></div>";
}

export default class UsersDataView extends JetView {
	config() {
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[

				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" },
				{ id:"toUser", header:"", width:75, template:toArchButton },
				{ id:"name", header:["ФИО", {content:"textFilter"} ], sort:"text" },
				{ id:"email", header:["Название", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"phone", header:["Телефон", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"book", header:["Книги", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"Читатель будет удален. <br/> Вы уверены?",
						ok:"Да",
						cancel:"Назад",
						callback: res => {
							if (res)
								this.app.callEvent("user:delete",[id.row]);
						}
					});
				},
				"wxi-pencil":(e, id) => {
					//вызов формы
					const item = this.getRoot().getItem(id);
					this.app.callEvent("form:fill", [item]);
				},
				"webix_el_button":(e, id) => {
					//функция вызова формы взврата книги
				},
			}
		};
	}
}
