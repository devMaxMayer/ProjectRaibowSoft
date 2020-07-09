define(function () {
    return {
        visibleBatch: "main",
        localId: "header",
        rows:
            [
                {
                    view: 'toolbar',
                    cols: [
                        {
                            view: "icon",
                            icon: "wxi-search",
                            click: function () {
                            }
                        }
                    ],
                },
                {
                    view: "toolbar",
                    batch: "search",
                    cols: [{view: "text", localId: "search"}, {
                        view: "icon",
                        icon: "wxi-close",
                        click: function () {
                            //return e.HideSearchHeader()
                        }
                    }]
                },

                {
                    view: 'datatable',
                    columns: [
                        {id: "name", header: "Название", width: 50},
                        {id: "author", header: "Автор", width: 200},
                        {id: "isbn", header: "ISBN", width: 80},
                        {id: "status", header: "Статус", width: 100}
                    ],
                    autoheight: true,
                    autowidth: true,
                    data: [
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1},
                        {id: 1, name: "testName 1", author: "testAuthor 1", isbn: 678790, status: 1}
                    ]
                }
            ]
    }
})