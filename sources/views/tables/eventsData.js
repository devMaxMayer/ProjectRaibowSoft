import {JetView} from "webix-jet";


export default class UsersDataView extends JetView {
	config() {
		return {
			view: "datatable",
			select: true,
			scroll: "y",
			columns: [
				{id: "bookId", header: ["Книга", {content: "textFilter"}], sort: "text"},
				{
					id: "userId",
					header: ["Читатель", {content: "textFilter"}],
					sort: "text",
					fillspace: true,
					minWidth: 150
				},
				{id: "date", header: ["Дата", {content: "textFilter"}], sort: "text", fillspace: true, minWidth: 150},
				{id: "type", header: ["Собыие", {content: "textFilter"}], sort: "text", fillspace: true, minWidth: 150},
			],
		};
	}
}

