define(function () {
    return {
        type: "line",
        rows: [

            {
                view: "toolbar",
                id: "toolbar",
                elements: [
                    {
                        view: "icon", icon: "mdi mdi-menu",
                        click: function(){
                            if( $$("menu").config.hidden){
                                $$("menu").show();
                            }
                            else
                                $$("menu").hide();
                        }
                    },
                    {view: "label", label: "Меню"}
                ]
            },


            {
                type: "space",
                id: "grid",
                multiview:true,

                rows: [
                    {
                        cols: [
                            {

                                view: "list",
                                id: "menu",
                                multiview:true,
                                hidden: true,
                                borderless: true,
                                scroll: false,
                                template: "<span class='webix_icon fa-#icon#'></span> #value#",
                                data: [
                                    {id: 1, value: "Книги", icon: "user"},
                                    {id: 2, value: "Читатели", icon: "cube"},
                                    {id: 3, value: "События", icon: "line-chart"}
                                ],
                                select: true,
                                type: {
                                    height: 40
                                }
                                //}
                            },
                            {template: "column 2"},
                            {template: "column 3"}
                        ]
                    }

                ]
            },

        ]


    }

})

