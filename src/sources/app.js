import './styles/app.css';
import {JetApp} from 'webix-jet';

export default class MyApp extends JetApp {
    constructor(config) {
        super(webix.extend({
            id:ManagerBooks,
            version: 0.1,
            start:"/main",
            debug: !PRODUCTION,
        }, config, true));

    }
}
