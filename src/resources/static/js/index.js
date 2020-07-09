requirejs.config({
    baseUrl: '../static/js',
})

function buildRoute(view) {
    return function () {
        webix.ui({
            id: 'root',
            rows: [
                view
            ]
        }, $$("root"))
    }
}

function buildButton(label, route, icon) {
    return {
        view: 'button',
        value: label,
        type: "icon",
        icon: icon,
        click: function () {
            routie(route)
        }
    }
}

require(['src/resources/static/js/views/main', 'views/books'], function (main, books) {
    webix.ready(function () {
        webix.ui({
            container: "app",
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            row: [
                {
                    view: "toolbar",
                    padding: 3,
                    elements: [
                        {
                            view: "button", type: "icon", icon: "mdi mdi-menu",
                            width: 37, align: "left", css: "app_button", click: function () {
                                $$("$sidebar1").toggle();
                            }
                        },
                        {view: "label", label: "Менеджер Книг"},

                        {view: "button", type: "icon", width: 45, css: "app_button", icon: "mdi mdi-alarm", badge: 0}
                    ]
                },
                {
                    cols: [
                        {
                            view: "sidebar",
                            width: 130,
                            data: [
                                buildButton('Книги', 'books', "mdi mdi-book"),
                                {id: 2, value: "Читатели", icon: "mdi mdi-account-multiple"},
                                {id: 3, value: "События", icon: "mdi mdi-bell"}],
                        },
                    ]
                },
                {
                    id: 'root'
                }
            ]
        })
    })

    routie({
        '': buildRoute(main),
        'books': buildRoute(books)
    })
})










