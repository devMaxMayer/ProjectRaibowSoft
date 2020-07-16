import {JetView} from "webix-jet";
import MenuView from "views/menu";

export default class TopView extends JetView {
	config(){
		return {
			rows:[
				//хедер
				{
					view: "toolbar", height:60,
					elements:[
						{ width:12 },
						{ css:"logo" },
						{}
					]
				},
				//меню
				{
					cols:[
						MenuView, { $subview:true }
					]
				},
				//футер
				{
					template:"<p class='title'>Информация...</p>",
					height:40, css:"footer"
				}
			]
		};
	}
}
