import {JetView} from "webix-jet";

export default class BookAddForm extends JetView{
	config(){
		return {
			view:"window",
			head:false,
			position:"center",
			modal:true,
			body:{
				view:"form",
				paddingY:20,
				paddingX:30,
				width:500,
				elementsConfig:{ labelWidth:100 },
				elements:[
					{ view:"text", name:"isbn", label:"ISBN" },
					{ view:"text", name:"title", label:"Название"},
					{ view:"text", name:"author", label:"Количкство" },
					{ view:"text", name:"years", label:"Год издания" },
					{ view:"text", name:"genres", label:"Жанры" },
					{ view:"text", name:"quantity", label:"Колличество" },
					{
						margin:10,
						cols:[
							{},
							{
								view:"button",
								value:"<< Назад",
								align:"center",
								width:120,
								click:() => this.hideForm()
							},
							{
								view:"button",
								value:"Сохранить",
								type:"form",
								align:"center",
								width:120,
								click:() => {
									if (this.form.validate()) {
										//передача в таблицу
										this.app.callEvent("books:save", [this.form.getValues()]);
										this.hideForm();
									}
								}
							}
						]
					}
				],
				rules:{
					$all:webix.rules.isNotEmpty
				}
			}
		};
	}
	init(view){
		this.form = view.getBody();

		this.on(this.app, "form:fill", values => {
			view.show();
			this.form.setValues(values);
		});
	}
	addExtra(extra, pos){
		this.form.addView(extra, pos);
	}
	showForm(){
		this.getRoot().show();
	}
	hideForm(){
		this.getRoot().hide();
		this.form.clear();
		this.form.clearValidation();
	}
}
