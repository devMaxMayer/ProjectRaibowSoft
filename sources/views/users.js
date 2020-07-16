import {JetView} from "webix-jet";
import UsersDataView from "jet-views/tables/usersData";
import {users} from "../models/users";
import UserAddForm from "jet-views/forms/userAddForm";

export default class UsersView extends JetView {
	config(){
		return {
			rows:[
				{
					view:"toolbar",
					css:"subbar",
					padding:0,
					elements:[
						{
							css:"title",
							height:50,
							borderless:true,
							template: `<div class='header'>Читатели</div>
								<div class='details'>(список)</div>`
						},
						{
							view:"button",
							type:"form",
							label:"Добавить Читателя", width:200,
							click:() => this.form.showUsersForm()
						}
					]
				},
				{ $subview:UsersDataView }
			]
		};
	}
	init(){
		//добавть в модеть crud методы для обьекта
		this.form = this.ui(UserAddForm);

		this.on(this.app,"users:save", values => {
			values.id ? users.updateItem(values.id,values) : users.add(values);
		});

		this.on(this.app,"user:delete", id => users.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(users);
	}
}
