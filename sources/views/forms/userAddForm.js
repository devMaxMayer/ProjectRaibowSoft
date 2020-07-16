import {JetView} from "webix-jet";

export default class UserAddForm extends JetView{
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
					{ view:"text", name:"name", label:"ФИО" },
					{ view:"text", name:"email", label:"E-mail"},
					{ view:"text", name:"phone", label:"Телефон" },
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
										this.app.callEvent("users:save", [this.form.getValues()]);
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
	showUsersForm(){
		this.getRoot().show();
	}
	hideForm(){
		this.getRoot().hide();
		this.form.clear();
		this.form.clearValidation();
	}
}
