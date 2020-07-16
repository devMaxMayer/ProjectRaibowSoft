import {JetView} from "webix-jet";
import DataView from "jet-views/tables/data";
import BookAddForm from "jet-views/forms/bookAddForm";
import {books} from "../models/books";

export default class BooksView extends JetView {
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
							template: `<div class='header'>Книги</div>
								<div class='details'>( архив )</div>`
						},
						{
							view:"button",
							type:"form",
							label:"Добавить книгу", width:140,
							click:() => this.form.showForm()
						}
					]
				},
				{ $subview:DataView }
			]
		};
	}
	init(){
		//добавть в модеть crud методы для обьекта
		this.form = this.ui(BookAddForm);

		this.on(this.app,"books:save", values => {
			values.id ? books.updateItem(values.id,values) : books.add(values);
		});

		this.on(this.app,"book:delete", id => books.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(books);
	}
}


