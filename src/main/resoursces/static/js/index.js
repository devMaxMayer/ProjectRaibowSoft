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

require(['views/main', 'views/books'], function (main, books) {
    webix.ready(function () {
        webix.ui({
            container: "app"
        })
    })

    routie({
        '': buildRoute(main),
        'books': buildRoute(books)
    })
})





