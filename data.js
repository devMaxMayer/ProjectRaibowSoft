var users = [
    {"id":87,
        "name":"Berni Mayou",
        "email":"bern.mayour@mail.com",
        "details":"",
        "visited":"2020-05-21T10:02:06Z",
        "registered":"2020-05-21T10:02:06Z",
        "avatar":"https://docs.webix.com/usermanager-backend/users/87/avatar/503723673.jpg",
        "status":0},
    {"id":97,"name":"August Dvorak","email":"dvor.august@gmail.com","details":"","visited":"2020-05-31T17:40:48Z","registered":"2020-05-31T17:40:48Z","avatar":"https://docs.webix.com/usermanager-backend/users/97/avatar/375515968.jpg","status":0},
    {"id":98,"name":"Elly Soyer","email":"elly.soyer@example","details":"","visited":"2020-05-31T17:42:34Z","registered":"2020-05-31T17:42:34Z","avatar":"https://docs.webix.com/usermanager-backend/users/98/avatar/909471384.jpg","status":1},
    {"id":101,"name":"Patrick Roland","email":"roll.and@gmail.com","details":"Farmer","visited":"2020-06-01T14:58:05Z","registered":"2020-06-01T14:58:05Z","avatar":"https://docs.webix.com/usermanager-backend/users/101/avatar/092352563.jpg","status":1},
    {"id":102,"name":"Petyr Baelish","email":"big.finger@gmail.com","details":"","visited":"2020-06-02T14:27:44Z","registered":"2020-06-02T14:27:44Z","avatar":"https://docs.webix.com/usermanager-backend/users/102/avatar/898151818.jpg","status":1},
    {"id":103,"name":"Ned Stark","email":"winterhell@gmail.com","details":"","visited":"2020-06-02T14:27:53Z","registered":"2020-06-02T14:27:53Z","avatar":"https://docs.webix.com/usermanager-backend/users/103/avatar/491902305.jpg","status":1},
    {"id":104,"name":"Lord Varys","email":"little.birds@gmail.com","details":"","visited":"2020-06-02T14:28:03Z","registered":"2020-06-02T14:28:03Z","avatar":"https://docs.webix.com/usermanager-backend/users/104/avatar/005471511.jpg","status":1},
    {"id":105,"name":"Daenerys Stormborn Targaryen","email":"breaker.of.chains@gm.com","details":"","visited":"2020-06-02T14:28:22Z","registered":"2020-06-02T14:28:22Z","avatar":"https://docs.webix.com/usermanager-backend/users/105/avatar/096793420.jpg","status":0},
    {"id":106,"name":"Francis Bacon","email":"","details":"","visited":"2020-06-02T14:28:39Z","registered":"2020-06-02T14:28:39Z","avatar":"https://docs.webix.com/usermanager-backend/users/106/avatar/865831461.jpg","status":0},
    {"id":107,"name":"Jon Snow","email":"lord.crow@wall.com","details":"","visited":"2020-06-02T14:33:28Z","registered":"2020-06-02T14:33:28Z","avatar":"https://docs.webix.com/usermanager-backend/users/107/avatar/268122171.jpg","status":1},
    {"id":108,"name":"Tyrion Lannister","email":"80.y.o.in.bed@casterly","details":"","visited":"2020-06-02T14:35:14Z","registered":"2020-06-02T14:35:14Z","avatar":"https://docs.webix.com/usermanager-backend/users/108/avatar/932427870.jpg","status":1}
    ];

var Book = []


var rules =[
{id: 1, name: "Admin", color: "#00a037", details: ""},
{id: 2, name: "Manager", color: "#e7a90b", details: ""},
{id: 3, name: "Team Lead", color: "#038cd9", details: ""},
{id: 4, name: "Reporting", color: "#ea77c0", details: ""},
{id: 5, name: "Guest", color: "#0bbed7", details: ""}
]



var roles = [
    {id: 1, short: "CanSeeUsers", long: "Can see user details and access levels"},
{id: 2, short: "CanEditUsers", long: "Can modify user details and access levels"},
{id: 3, short: "CanAdminProjects", long: "Can create projects"},
{id: 4, short: "CanAdminTasks", long: "Can create tasks"},
{id: 5, short: "CanSeeTasks", long: "Can see tasks"},
{id: 7, short: "CanSeeEmails", long: "Can see custom emails"},
{id: 6, short: "CanAdminEmails", long: "Can create custom emails"},
{id: 8, short: "CanCreateReports", long: "Can create reports"},
{id: 9, short: "CanSeeReports", long: "Can see reports"}
]