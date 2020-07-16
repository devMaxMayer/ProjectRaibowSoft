import {JetView} from "webix-jet";
import EventsDataView from "jet-views/tables/eventsData";
import {events} from "../models/events";

export default class EventsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					css: "subbar",
					padding: 0,
					elements: [
						{
							css: "title",
							height: 50,
							borderless: true,
							template: `<div class='header'>События</div>
								<div class='details'>(список)</div>`
						},
					]
				},
				{$subview: EventsDataView}
			]
		};
	}
	init(){
		this.on(this.app,"events:save", values => {
			values.id ? events.updateItem(values.id,values) : events.add(values);
		});

		this.on(this.app,"user:delete", id => events.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(events);
	}
}
