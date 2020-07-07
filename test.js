(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).userManager = {})
})(this, (function (e) {
    "use strict";

    var t = function (e, i) {
        // Метод Object.setPrototypeOf() устанавливает прототип (то есть, внутреннее свойство [[Prototype]]) указанного объекта в другой объект или null.
        return (t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
        })(e, i)
    }; // работа с обьектом

    function i(e, i) {
        function r() {
            this.constructor = e
        }

        t(e, i), e.prototype = null === i ? Object.create(i) : (r.prototype = i.prototype, new r)
    }; //создание обьекта или прототипа

    var r = function () {
        // Функция Object.assign получает список объектов и копирует в первый target свойства из остальных.
        return (r = Object.assign || function (e) {
            for (var t, i = 1, r = arguments.length; i < r; i++) for (var n in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }).apply(this, arguments)
    };

    function n() {
        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
        var r = Array(e), n = 0;
        for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, n++) r[n] = o[s];
        return r
    }

    var o = function () {
    }, s = function () {
        function e(e, t) {
            this.webixJet = !0, this.webix = e, this._events = [], this._subs = {}, this._data = {}, t && t.params && e.extend(this._data, t.params)
        }

        return e.prototype.getRoot = function () {
            return this._root
        }, e.prototype.destructor = function () {
            this._detachEvents(), this._destroySubs(), this._events = this._container = this.app = this._parent = this._root = null
        }, e.prototype.setParam = function (e, t, i) {
            if (this._data[e] !== t && (this._data[e] = t, this._segment.update(e, t, 0), i)) return this.show(null)
        }, e.prototype.getParam = function (e, t) {
            var i = this._data[e];
            if (void 0 !== i || !t) return i;
            var r = this.getParentView();
            return r ? r.getParam(e, t) : void 0
        }, e.prototype.getUrl = function () {
            return this._segment.suburl()
        }, e.prototype.getUrlString = function () {
            return this._segment.toString()
        }, e.prototype.getParentView = function () {
            return this._parent
        }, e.prototype.$$ = function (e) {
            if ("string" == typeof e) {
                var t = this.getRoot();
                return t.queryView((function (i) {
                    return (i.config.id === e || i.config.localId === e) && i.$scope === t.$scope
                }), "self")
            }
            return e
        }, e.prototype.on = function (e, t, i) {
            var r = e.attachEvent(t, i);
            return this._events.push({obj: e, id: r}), r
        }, e.prototype.contains = function (e) {
            for (var t in this._subs) {
                var i = this._subs[t].view;
                if (i === e || i.contains(e)) return !0
            }
            return !1
        }, e.prototype.getSubView = function (e) {
            var t = this.getSubViewInfo(e);
            if (t) return t.subview.view
        }, e.prototype.getSubViewInfo = function (e) {
            var t = this._subs[e || "default"];
            return t ? {subview: t, parent: this} : "_top" === e ? (this._subs[e] = {
                url: "",
                id: null,
                popup: !0
            }, this.getSubViewInfo(e)) : this._parent ? this._parent.getSubViewInfo(e) : null
        }, e.prototype._detachEvents = function () {
            for (var e = this._events, t = e.length - 1; t >= 0; t--) e[t].obj.detachEvent(e[t].id)
        }, e.prototype._destroySubs = function () {
            for (var e in this._subs) {
                var t = this._subs[e].view;
                t && t.destructor()
            }
            this._subs = {}
        }, e.prototype._init_url_data = function () {
            var e = this._segment.current();
            this._data = {}, this.webix.extend(this._data, e.params, !0)
        }, e.prototype._getDefaultSub = function () {
            if (this._subs.default) return this._subs.default;
            for (var e in this._subs) {
                var t = this._subs[e];
                if (!t.branch && t.view && "_top" !== e) {
                    var i = t.view._getDefaultSub();
                    if (i) return i
                }
            }
        }, e.prototype._routed_view = function () {
            var e = this.getParentView();
            if (!e) return !0;
            var t = e._getDefaultSub();
            return !(!t && t !== this) && e._routed_view()
        }, e
    }();

    function a(e) {
        "/" === e[0] && (e = e.substr(1));
        for (var t = e.split("/"), i = [], r = 0; r < t.length; r++) {
            var n = t[r], o = {}, s = n.indexOf(":");
            if (-1 === s && (s = n.indexOf("?")), -1 !== s) for (var a = 0, l = n.substr(s + 1).split(/[\:\?\&]/g); a < l.length; a++) {
                var u = l[a].split("=");
                o[u[0]] = decodeURIComponent(u[1])
            }
            i[r] = {page: s > -1 ? n.substr(0, s) : n, params: o, isNew: !0}
        }
        return i
    }

    function l(e) {
        for (var t = [], i = 0, r = e; i < r.length; i++) {
            var n = r[i];
            t.push("/" + n.page);
            var o = u(n.params);
            o && t.push("?" + o)
        }
        return t.join("")
    }

    function u(e) {
        var t = [];
        for (var i in e) "object" != typeof e[i] && (t.length && t.push("&"), t.push(i + "=" + encodeURIComponent(e[i])));
        return t.join("")
    }

    var c = function () {
        function e(e, t) {
            this._next = 1, this.route = "string" == typeof e ? {url: a(e), path: e} : e, this.index = t
        }

        return e.prototype.current = function () {
            return this.route.url[this.index]
        }, e.prototype.next = function () {
            return this.route.url[this.index + this._next]
        }, e.prototype.suburl = function () {
            return this.route.url.slice(this.index)
        }, e.prototype.shift = function (t) {
            var i = new e(this.route, this.index + this._next);
            return i.setParams(i.route.url, t, i.index), i
        }, e.prototype.setParams = function (e, t, i) {
            if (t) {
                var r = e[i].params;
                for (var n in t) r[n] = t[n]
            }
        }, e.prototype.refresh = function () {
            for (var e = this.route.url, t = this.index + 1; t < e.length; t++) e[t].isNew = !0
        }, e.prototype.toString = function () {
            var e = l(this.suburl());
            return e ? e.substr(1) : ""
        }, e.prototype._join = function (e, t) {
            var i = this.route.url;
            if (null === e) return i;
            var r = this.route.url, n = !0;
            if (i = r.slice(0, this.index + (t ? this._next : 0)), e) {
                i = i.concat(a(e));
                for (var o = 0; o < i.length; o++) r[o] && (i[o].view = r[o].view), n && r[o] && i[o].page === r[o].page ? i[o].isNew = !1 : i[o].isNew && (n = !1)
            }
            return i
        }, e.prototype.append = function (e) {
            var t = this._join(e, !0);
            return this.route.path = l(t), this.route.url = t, this.route.path
        }, e.prototype.show = function (e, t, i) {
            var r = this, n = this._join(e.url, i);
            return this.setParams(n, e.params, this.index + (i ? this._next : 0)), new Promise((function (e, i) {
                var s = l(n), a = {url: n, redirect: s, confirm: Promise.resolve()}, u = t ? t.app : null;
                if (u && !u.callEvent("app:guard", [a.redirect, t, a])) return void i(new o);
                a.confirm.catch((function (e) {
                    return i(e)
                })).then((function () {
                    if (null !== a.redirect) {
                        if (a.redirect !== s) return u.show(a.redirect), void i(new o);
                        r.route.path = s, r.route.url = n, e()
                    } else i(new o)
                }))
            }))
        }, e.prototype.size = function (e) {
            this._next = e
        }, e.prototype.split = function () {
            var t = {url: this.route.url.slice(this.index + 1), path: ""};
            return t.url.length && (t.path = l(t.url)), new e(t, 0)
        }, e.prototype.update = function (e, t, i) {
            var r = this.route.url[this.index + (i || 0)];
            if (!r) return this.route.url.push({page: "", params: {}}), this.update(e, t, i);
            "" === e ? r.page = t : r.params[e] = t, this.route.path = l(this.route.url)
        }, e
    }(), h = function (e) {
        function t(t, i) {
            var r = e.call(this, t.webix) || this;
            return r.app = t, r._children = [], r
        }

        return i(t, e), t.prototype.ui = function (e, t) {
            var i = (t = t || {}).container || e.container, r = this.app.createView(e);
            return this._children.push(r), r.render(i, this._segment, this), "object" != typeof e || e instanceof s ? r : r.getRoot()
        }, t.prototype.show = function (e, t) {
            if (t = t || {}, "object" == typeof e) {
                for (var i in e) this.setParam(i, e[i]);
                e = null
            } else {
                if ("/" === e.substr(0, 1)) return this.app.show(e, t);
                if (0 === e.indexOf("./") && (e = e.substr(2)), 0 === e.indexOf("../")) {
                    var r = this.getParentView();
                    return r ? r.show(e.substr(3), t) : this.app.show("/" + e.substr(3))
                }
                var n = this.getSubViewInfo(t.target);
                if (n) {
                    if (n.parent !== this) return n.parent.show(e, t);
                    if (t.target && "default" !== t.target) return this._renderFrameLock(t.target, n.subview, {
                        url: e,
                        params: t.params
                    })
                } else if (e) return this.app.show("/" + e, t)
            }
            return this._show(this._segment, {url: e, params: t.params}, this)
        }, t.prototype._show = function (e, t, i) {
            var r = this;
            return e.show(t, i, !0).then((function () {
                return r._init_url_data(), r._urlChange()
            })).then((function () {
                e.route.linkRouter && (r.app.getRouter().set(e.route.path, {silent: !0}), r.app.callEvent("app:route", [e.route.path]))
            }))
        }, t.prototype.init = function (e, t) {
        }, t.prototype.ready = function (e, t) {
        }, t.prototype.config = function () {
            this.app.webix.message("View:Config is not implemented")
        }, t.prototype.urlChange = function (e, t) {
        }, t.prototype.destroy = function () {
        }, t.prototype.destructor = function () {
            this.destroy(), this._destroyKids(), this._root && (this._root.destructor(), e.prototype.destructor.call(this))
        }, t.prototype.use = function (e, t) {
            e(this.app, this, t)
        }, t.prototype.refresh = function () {
            this.getUrl();
            return this.destroy(), this._destroyKids(), this._destroySubs(), this._detachEvents(), this._container.tagName && this._root.destructor(), this._segment.refresh(), this._render(this._segment)
        }, t.prototype.render = function (e, t, i) {
            var r = this;
            "string" == typeof t && (t = new c(t, 0)), this._segment = t, this._parent = i, this._init_url_data();
            var n = "string" == typeof (e = e || document.body) ? this.webix.toNode(e) : e;
            return this._container !== n ? (this._container = n, this._render(t)) : this._urlChange().then((function () {
                return r.getRoot()
            }))
        }, t.prototype._render = function (e) {
            var t = this, i = this.config();
            return i.then ? i.then((function (i) {
                return t._render_final(i, e)
            })) : this._render_final(i, e)
        }, t.prototype._render_final = function (e, t) {
            var i, r = this, n = null, o = null, s = !1;
            if (this._container.tagName ? o = this._container : (n = this._container).popup ? (o = document.body, s = !0) : o = this.webix.$$(n.id), !this.app || !o) return Promise.reject(null);
            var a = this._segment.current(), l = {ui: {}};
            this.app.copyConfig(e, l.ui, this._subs), this.app.callEvent("app:render", [this, t, l]), l.ui.$scope = this, !n && a.isNew && a.view && a.view.destructor();
            try {
                if (n && !s) {
                    var u = o, c = u.getParentView();
                    c && "multiview" === c.name && !l.ui.id && (l.ui.id = u.config.id)
                }
                this._root = this.app.webix.ui(l.ui, o);
                var h = this._root;
                s && h.setPosition && !h.isVisible() && h.show(), n && (n.view && n.view !== this && n.view !== this.app && n.view.destructor(), n.id = this._root.config.id, this.getParentView() || !this.app.app ? n.view = this : n.view = this.app), a.isNew && (a.view = this, a.isNew = !1), i = Promise.resolve(this._init(this._root, t)).then((function () {
                    return r._urlChange().then((function () {
                        return r._initUrl = null, r.ready(r._root, t.suburl())
                    }))
                }))
            } catch (e) {
                i = Promise.reject(e)
            }
            return i.catch((function (e) {
                return r._initError(r, e)
            }))
        }, t.prototype._init = function (e, t) {
            return this.init(e, t.suburl())
        }, t.prototype._urlChange = function () {
            var e = this;
            this.app.callEvent("app:urlchange", [this, this._segment]);
            var t = [];
            for (var i in this._subs) {
                var r = this._subs[i], n = this._renderFrameLock(i, r, null);
                n && t.push(n)
            }
            return Promise.all(t).then((function () {
                return e.urlChange(e._root, e._segment.suburl())
            }))
        }, t.prototype._renderFrameLock = function (e, t, i) {
            if (!t.lock) {
                var r = this._renderFrame(e, t, i);
                r && (t.lock = r.then((function () {
                    return t.lock = null
                }), (function () {
                    return t.lock = null
                })))
            }
            return t.lock
        }, t.prototype._renderFrame = function (e, t, i) {
            var r = this;
            if ("default" === e) {
                if (this._segment.next()) {
                    var n = i ? i.params : null;
                    return t.params && (n = this.webix.extend(n || {}, t.params)), this._createSubView(t, this._segment.shift(n))
                }
                t.view && t.popup && (t.view.destructor(), t.view = null)
            }
            if (null !== i && (t.url = i.url, t.params && (i.params = this.webix.extend(i.params || {}, t.params))), t.route) {
                if (null !== i) return t.route.show(i, t.view).then((function () {
                    return r._createSubView(t, t.route)
                }));
                if (t.branch) return
            }
            var o = t.view;
            if (!o && t.url) {
                if ("string" == typeof t.url) return t.route = new c(t.url, 0), i && t.route.setParams(t.route.route.url, i.params, 0), t.params && t.route.setParams(t.route.route.url, t.params, 0), this._createSubView(t, t.route);
                "function" != typeof t.url || o instanceof t.url || (o = new (this.app._override(t.url))(this.app, "")), o || (o = t.url)
            }
            if (o) return o.render(t, t.route || this._segment, this)
        }, t.prototype._initError = function (e, t) {
            return this.app && this.app.error("app:error:initview", [t, e]), !0
        }, t.prototype._createSubView = function (e, t) {
            var i = this;
            return this.app.createFromURL(t.current()).then((function (r) {
                return r.render(e, t, i)
            }))
        }, t.prototype._destroyKids = function () {
            for (var e = this._children, t = e.length - 1; t >= 0; t--) e[t] && e[t].destructor && e[t].destructor();
            this._children = []
        }, t
    }(s), p = function (e) {
        function t(t, i) {
            var r = e.call(this, t, i) || this;
            return r._ui = i.ui, r
        }

        return i(t, e), t.prototype.config = function () {
            return this._ui
        }, t
    }(h), d = function () {
        function e(e, t, i) {
            this.path = "", this.app = i
        }

        return e.prototype.set = function (e, t) {
            this.path = e;
            var i = this.app;
            i.app.getRouter().set(i._segment.append(this.path), {silent: !0})
        }, e.prototype.get = function () {
            return this.path
        }, e
    }(), f = !0, m = function (e) {
        function t(t) {
            var i = this, r = (t || {}).webix || window.webix;
            return t = r.extend({
                name: "App",
                version: "1.0",
                start: "/home"
            }, t, !0), (i = e.call(this, r, t) || this).config = t, i.app = i.config.app, i.ready = Promise.resolve(), i._services = {}, i.webix.extend(i, i.webix.EventSystem), i
        }

        return i(t, e), t.prototype.getUrl = function () {
            return this._subSegment.suburl()
        }, t.prototype.getUrlString = function () {
            return this._subSegment.toString()
        }, t.prototype.getService = function (e) {
            var t = this._services[e];
            return "function" == typeof t && (t = this._services[e] = t(this)), t
        }, t.prototype.setService = function (e, t) {
            this._services[e] = t
        }, t.prototype.destructor = function () {
            this.getSubView().destructor(), e.prototype.destructor.call(this)
        }, t.prototype.copyConfig = function (e, t, i) {
            if ((e instanceof s || "function" == typeof e && e.prototype instanceof s) && (e = {$subview: e}), void 0 !== e.$subview) return this.addSubView(e, t, i);
            var r = e instanceof Array;
            for (var n in t = t || (r ? [] : {}), e) {
                var o = e[n];
                if ("function" == typeof o && o.prototype instanceof s && (o = {$subview: o}), !o || "object" != typeof o || o instanceof this.webix.DataCollection || o instanceof RegExp) t[n] = o; else if (o instanceof Date) t[n] = new Date(o); else {
                    var a = this.copyConfig(o, o instanceof Array ? [] : {}, i);
                    null !== a && (r ? t.push(a) : t[n] = a)
                }
            }
            return t
        }, t.prototype.getRouter = function () {
            return this.$router
        }, t.prototype.clickHandler = function (e, t) {
            if (e && (t = t || e.target || e.srcElement) && t.getAttribute) {
                var i = t.getAttribute("trigger");
                if (i) return this._forView(t, (function (e) {
                    return e.app.trigger(i)
                })), e.cancelBubble = !0, e.preventDefault();
                var r = t.getAttribute("route");
                if (r) return this._forView(t, (function (e) {
                    return e.show(r)
                })), e.cancelBubble = !0, e.preventDefault()
            }
            var n = t.parentNode;
            n && this.clickHandler(e, n)
        }, t.prototype.getRoot = function () {
            return this.getSubView().getRoot()
        }, t.prototype.refresh = function () {
            var e = this;
            return this._subSegment ? this.getSubView().refresh().then((function (t) {
                return e.callEvent("app:route", [e.getUrl()]), t
            })) : Promise.resolve(null)
        }, t.prototype.loadView = function (e) {
            var t = this, i = this.config.views, r = null;
            if ("" === e) return Promise.resolve(this._loadError("", new Error("Webix Jet: Empty url segment")));
            try {
                i && "string" == typeof (r = "function" == typeof i ? i(e) : i[e]) && (e = r, r = null), r || ("_blank" === e ? r = {} : (e = e.replace(/\./g, "/"), r = this.require("jet-views", e)))
            } catch (t) {
                r = this._loadError(e, t)
            }
            return r.then || (r = Promise.resolve(r)), r = r.then((function (e) {
                return e.__esModule ? e.default : e
            })).catch((function (i) {
                return t._loadError(e, i)
            }))
        }, t.prototype._forView = function (e, t) {
            var i = this.webix.$$(e);
            i && t(i.$scope)
        }, t.prototype._loadViewDynamic = function (e) {
            return null
        }, t.prototype.createFromURL = function (e) {
            var t = this;
            return e.isNew || !e.view ? this.loadView(e.page).then((function (i) {
                return t.createView(i, name, e.params)
            })) : Promise.resolve(e.view)
        }, t.prototype._override = function (e) {
            var t = this.config.override;
            return t && (e = t.get(e) || e), e
        }, t.prototype.createView = function (e, i, r) {
            if ("function" == typeof (e = this._override(e))) {
                if (e.prototype instanceof t) return new e({app: this, name: i, params: r, router: d});
                if (e.prototype instanceof s) return new e(this, {name: i, params: r});
                e = e(this)
            }
            return e instanceof s ? e : new p(this, {name: i, ui: e})
        }, t.prototype.show = function (e, t) {
            return e && this.app && 0 == e.indexOf("//") ? this.app.show(e.substr(1), t) : this.render(this._container, e || this.config.start, t)
        }, t.prototype.trigger = function (e) {
            for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            this.apply(e, t)
        }, t.prototype.apply = function (e, t) {
            this.callEvent(e, t)
        }, t.prototype.action = function (e) {
            return this.webix.bind((function () {
                for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
                this.apply(e, t)
            }), this)
        }, t.prototype.on = function (e, t) {
            this.attachEvent(e, t)
        }, t.prototype.use = function (e, t) {
            e(this, null, t)
        }, t.prototype.error = function (e, t) {
            if (this.callEvent(e, t), this.callEvent("app:error", t), this.config.debug) for (var i = 0; i < t.length; i++) if (console.error(t[i]), t[i] instanceof Error) {
                var r = t[i].message;
                0 === r.indexOf("Module build failed") ? (r = r.replace(/\x1b\[[0-9;]*m/g, ""), document.body.innerHTML = "<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>" + r + "</pre>") : (r += "<br><br>Check console for more details", this.webix.message({
                    type: "error",
                    text: r,
                    expire: -1
                }))
            }
        }, t.prototype.render = function (e, t, i) {
            var r = this;
            this._container = "string" == typeof e ? this.webix.toNode(e) : e || document.body;
            var n = null;
            !this.$router ? (f && "tagName" in this._container && (this.webix.event(document.body, "click", (function (e) {
                return r.clickHandler(e)
            })), f = !1), "string" == typeof t && (t = new c(t, 0)), this._subSegment = this._first_start(t), this._subSegment.route.linkRouter = !0) : n = "string" == typeof t ? t : this.app ? t.split().route.path || this.config.start : t.toString();
            var o = i ? i.params : this.config.params || null, s = this.getSubView(), a = this._subSegment,
                l = a.show({url: n, params: o}, s).then((function () {
                    return r.createFromURL(a.current())
                })).then((function (t) {
                    return t.render(e, a)
                })).then((function (e) {
                    return r.$router.set(a.route.path, {silent: !0}), r.callEvent("app:route", [r.getUrl()]), e
                }));
            return this.ready = this.ready.then((function () {
                return l
            })), l
        }, t.prototype.getSubView = function () {
            if (this._subSegment) {
                var e = this._subSegment.current().view;
                if (e) return e
            }
            return new h(this, {})
        }, t.prototype.require = function (e, t) {
            return null
        }, t.prototype._first_start = function (e) {
            var t = this;
            this._segment = e;
            if (this.$router = new this.config.router((function (e) {
                return setTimeout((function () {
                    t.show(e).catch((function (e) {
                        if (!(e instanceof o)) throw e
                    }))
                }), 1)
            }), this.config, this), this._container === document.body && !1 !== this.config.animation) {
                var i = this._container;
                this.webix.html.addCss(i, "webixappstart"), setTimeout((function () {
                    t.webix.html.removeCss(i, "webixappstart"), t.webix.html.addCss(i, "webixapp")
                }), 10)
            }
            if (e) {
                if (this.app) {
                    var r = e.current().view;
                    e.current().view = this, e.next() ? (e.refresh(), e = e.split()) : e = new c(this.config.start, 0), e.current().view = r
                }
            } else {
                var n = this.$router.get();
                n || (n = this.config.start, this.$router.set(n, {silent: !0})), e = new c(n, 0)
            }
            return e
        }, t.prototype._loadError = function (e, t) {
            return this.error("app:error:resolve", [t, e]), {template: " "}
        }, t.prototype.addSubView = function (e, t, i) {
            var r = !0 !== e.$subview ? e.$subview : null, n = e.name || (r ? this.webix.uid() : "default");
            return t.id = e.id || "s" + this.webix.uid(), (i[n] = {
                id: t.id,
                url: r,
                branch: e.branch,
                popup: e.popup,
                params: e.params
            }).popup ? null : t
        }, t
    }(s), g = function () {
        function e(e, t) {
            var i = this;
            this.config = t || {}, this._detectPrefix(), this.cb = e, window.onpopstate = function () {
                return i.cb(i.get())
            }
        }

        return e.prototype.set = function (e, t) {
            var i = this;
            if (this.config.routes) {
                var r = e.split("?", 2);
                for (var n in this.config.routes) if (this.config.routes[n] === r[0]) {
                    e = n + (r.length > 1 ? "?" + r[1] : "");
                    break
                }
            }
            this.get() !== e && window.history.pushState(null, null, this.prefix + this.sufix + e), t && t.silent || setTimeout((function () {
                return i.cb(e)
            }), 1)
        }, e.prototype.get = function () {
            var e = this._getRaw().replace(this.prefix, "").replace(this.sufix, "");
            if (e = "/" !== e && "#" !== e ? e : "", this.config.routes) {
                var t = e.split("?", 2), i = this.config.routes[t[0]];
                i && (e = i + (t.length > 1 ? "?" + t[1] : ""))
            }
            return e
        }, e.prototype._detectPrefix = function () {
            var e = this.config.routerPrefix;
            this.sufix = "#" + (void 0 === e ? "!" : e), this.prefix = document.location.href.split("#", 2)[0]
        }, e.prototype._getRaw = function () {
            return document.location.href
        }, e
    }(), v = !1;

    function w(e) {
        if (!v && e) {
            v = !0;
            var t = window;
            t.Promise || (t.Promise = e.promise);
            var i = e.version.split(".");
            10 * i[0] + 1 * i[1] < 53 && (e.ui.freeze = function (t) {
                var i = t();
                return i && i.then ? i.then((function (t) {
                    return e.ui.$freeze = !1, e.ui.resize(), t
                })) : (e.ui.$freeze = !1, e.ui.resize()), i
            });
            var r = e.ui.baselayout.prototype.addView, n = e.ui.baselayout.prototype.removeView, o = {
                addView: function (e, t) {
                    if (this.$scope && this.$scope.webixJet && !e.queryView) {
                        var i = this.$scope, n = {};
                        e = i.app.copyConfig(e, {}, n), r.apply(this, [e, t]);
                        var o = function (e) {
                            i._renderFrame(e, n[e], null).then((function () {
                                i._subs[e] = n[e]
                            }))
                        };
                        for (var s in n) o(s);
                        return e.id
                    }
                    return r.apply(this, arguments)
                }, removeView: function () {
                    if (n.apply(this, arguments), this.$scope && this.$scope.webixJet) {
                        var t = this.$scope._subs;
                        for (var i in t) {
                            var r = t[i];
                            e.$$(r.id) || (r.view.destructor(), delete t[i])
                        }
                    }
                }
            };
            e.extend(e.ui.layout.prototype, o, !0), e.extend(e.ui.baselayout.prototype, o, !0), e.protoUI({
                name: "jetapp",
                $init: function (t) {
                    this.$app = new this.app(t);
                    var i = e.uid().toString();
                    t.body = {id: i}, this.$ready.push((function () {
                        this.callEvent("onInit", [this.$app]), this.$app.render({id: i})
                    }))
                }
            }, e.ui.proxy, e.EventSystem)
        }
    }

    var b = function (e) {
        function t(t) {
            var i;
            return t.router = t.router || g, w((i = e.call(this, t) || this).webix), i
        }

        return i(t, e), t.prototype.require = function (e, t) {
            return require(e + "/" + t)
        }, t
    }(m), _ = (function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        i(t, e), t.prototype._detectPrefix = function () {
            this.prefix = "", this.sufix = this.config.routerPrefix || ""
        }, t.prototype._getRaw = function () {
            return document.location.pathname + (document.location.search || "")
        }
    }(g), function () {
        function e(e, t) {
            this.path = "", this.cb = e
        }

        return e.prototype.set = function (e, t) {
            var i = this;
            this.path = e, t && t.silent || setTimeout((function () {
                return i.cb(e)
            }), 1)
        }, e.prototype.get = function () {
            return this.path
        }, e
    }());

    function y(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function x(e, t, i) {
        for (var r in e) y(e, r) && t.call(i || e, e[r], r, e)
    }

    function S(e) {
        e = "Warning: " + e, "undefined" != typeof console && console.error(e);
        try {
            throw new Error(e)
        } catch (e) {
        }
    }

    var $ = String.prototype.replace, k = String.prototype.split, I = function (e) {
        var t = e % 10;
        return 11 !== e && 1 === t ? 0 : 2 <= t && t <= 4 && !(e >= 12 && e <= 14) ? 1 : 2
    }, R = {
        arabic: function (e) {
            if (e < 3) return e;
            var t = e % 100;
            return t >= 3 && t <= 10 ? 3 : t >= 11 ? 4 : 5
        }, bosnian_serbian: I, chinese: function () {
            return 0
        }, croatian: I, french: function (e) {
            return e > 1 ? 1 : 0
        }, german: function (e) {
            return 1 !== e ? 1 : 0
        }, russian: I, lithuanian: function (e) {
            return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 9 && (e % 100 < 11 || e % 100 > 19) ? 1 : 2
        }, czech: function (e) {
            return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
        }, polish: function (e) {
            if (1 === e) return 0;
            var t = e % 10;
            return 2 <= t && t <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
        }, icelandic: function (e) {
            return e % 10 != 1 || e % 100 == 11 ? 1 : 0
        }, slovenian: function (e) {
            var t = e % 100;
            return 1 === t ? 0 : 2 === t ? 1 : 3 === t || 4 === t ? 2 : 3
        }
    }, C = {
        arabic: ["ar"],
        bosnian_serbian: ["bs-Latn-BA", "bs-Cyrl-BA", "srl-RS", "sr-RS"],
        chinese: ["id", "id-ID", "ja", "ko", "ko-KR", "lo", "ms", "th", "th-TH", "zh"],
        croatian: ["hr", "hr-HR"],
        german: ["fa", "da", "de", "en", "es", "fi", "el", "he", "hi-IN", "hu", "hu-HU", "it", "nl", "no", "pt", "sv", "tr"],
        french: ["fr", "tl", "pt-br"],
        russian: ["ru", "ru-RU"],
        lithuanian: ["lt"],
        czech: ["cs", "cs-CZ", "sk"],
        polish: ["pl"],
        icelandic: ["is"],
        slovenian: ["sl-SL"]
    };

    function D(e) {
        var t, i = (t = {}, x(C, (function (e, i) {
            x(e, (function (e) {
                t[e] = i
            }))
        })), t);
        return i[e] || i[k.call(e, /-/, 1)[0]] || i.en
    }

    function P(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }

    var T = /\$/g, A = /%\{(.*?)\}/g;

    function U(e, t, i, r) {
        if ("string" != typeof e) throw new TypeError("Polyglot.transformPhrase expects argument #1 to be string");
        if (null == t) return e;
        var n = e, o = r || A, s = "number" == typeof t ? {smart_count: t} : t;
        if (null != s.smart_count && n) {
            var a = k.call(n, "||||");
            n = (a[function (e, t) {
                return R[D(e)](t)
            }(i || "en", s.smart_count)] || a[0]).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }
        return n = $.call(n, o, (function (e, t) {
            return y(s, t) && null != s[t] ? $.call(s[t], T, "$$") : e
        }))
    }

    function E(e) {
        var t = e || {};
        this.phrases = {}, this.extend(t.phrases || {}), this.currentLocale = t.locale || "en";
        var i = t.allowMissing ? U : null;
        this.onMissingKey = "function" == typeof t.onMissingKey ? t.onMissingKey : i, this.warn = t.warn || S, this.tokenRegex = function (e) {
            var t = e && e.prefix || "%{", i = e && e.suffix || "}";
            if ("||||" === t || "||||" === i) throw new RangeError('"||||" token is reserved for pluralization');
            return new RegExp(P(t) + "(.*?)" + P(i), "g")
        }(t.interpolation)
    }

    E.prototype.locale = function (e) {
        return e && (this.currentLocale = e), this.currentLocale
    }, E.prototype.extend = function (e, t) {
        x(e, (function (e, i) {
            var r = t ? t + "." + i : i;
            "object" == typeof e ? this.extend(e, r) : this.phrases[r] = e
        }), this)
    }, E.prototype.unset = function (e, t) {
        "string" == typeof e ? delete this.phrases[e] : x(e, (function (e, i) {
            var r = t ? t + "." + i : i;
            "object" == typeof e ? this.unset(e, r) : delete this.phrases[r]
        }), this)
    }, E.prototype.clear = function () {
        this.phrases = {}
    }, E.prototype.replace = function (e) {
        this.clear(), this.extend(e)
    }, E.prototype.t = function (e, t) {
        var i, r, n = null == t ? {} : t;
        if ("string" == typeof this.phrases[e]) i = this.phrases[e]; else if ("string" == typeof n._) i = n._; else if (this.onMissingKey) {
            r = (0, this.onMissingKey)(e, n, this.currentLocale, this.tokenRegex)
        } else this.warn('Missing translation for key: "' + e + '"'), r = e;
        return "string" == typeof i && (r = U(i, n, this.currentLocale, this.tokenRegex)), r
    }, E.prototype.has = function (e) {
        return y(this.phrases, e)
    }, E.transformPhrase = function (e, t, i) {
        return U(e, t, i)
    };
    var V = E;
    var M = window.webix;
    M && w(M);
    var L = function (e, t, i) {
        var r = (i = i || {}).storage, n = r ? r.get("lang") || "en" : i.lang || "en";

        function o(t, o, s) {
            o.__esModule && (o = o.default);
            var l = {phrases: o};
            i.polyglot && e.webix.extend(l, i.polyglot);
            var u = a.polyglot = new V(l);
            if (u.locale(t), a._ = e.webix.bind(u.t, u), n = t, r && r.put("lang", n), i.webix) {
                var c = i.webix[t];
                c && e.webix.i18n.setLocale(c)
            }
            return s ? Promise.resolve() : e.refresh()
        }

        function s(t, r) {
            if (!1 !== i.path) {
                var n = (i.path ? i.path + "/" : "") + t;
                o(t, e.require("jet-locales", n), r)
            }
        }

        var a = {
            getLang: function () {
                return n
            }, setLang: s, setLangData: o, _: null, polyglot: null
        };
        e.setService("locale", a), s(n, !0)
    }, H = window;
    H.Promise || (H.Promise = H.webix.promise);
    var G = 1;

    function O(e, t, i) {
        Object.defineProperty(t, i, {
            get: function () {
                return e[i]
            }, set: function (t) {
                return e[i] = t
            }
        })
    }

    function N(e, t) {
        t = t || {};
        var i = {}, r = {}, n = function (e, t) {
            var n = G++;
            return i[n] = {mask: e, handler: t}, t("*" === e ? r : r[e], void 0, e), n
        }, o = [], s = !1, a = function (e, t, r, n) {
            if (s) o.push([e, t, r, n]); else for (var a = Object.keys(i), l = 0; l < a.length; l++) {
                var u = i[a[l]];
                u && ("*" !== u.mask && u.mask !== e || u.handler(r, t, e, n))
            }
        };
        for (var l in e) if (e.hasOwnProperty(l)) {
            var u = e[l];
            t.nested && "object" == typeof u && u ? r[l] = N(u, t) : F(r, u, l, a)
        }
        return Object.defineProperty(r, "$changes", {
            value: {
                attachEvent: n, detachEvent: function (e) {
                    delete i[e]
                }
            }, enumerable: !1, configurable: !1
        }), Object.defineProperty(r, "$observe", {
            value: n,
            enumerable: !1,
            configurable: !1
        }), Object.defineProperty(r, "$batch", {
            value: function (e) {
                if ("function" != typeof e) {
                    var t = e;
                    e = function () {
                        for (var e in t) r[e] = t[e]
                    }
                }
                for (s = !0, e(r), s = !1; o.length;) {
                    var i = o.shift();
                    a.apply(this, i)
                }
            }, enumerable: !1, configurable: !1
        }), r
    }

    function F(e, t, i, r) {
        Object.defineProperty(e, i, {
            get: function () {
                return t
            }, set: function (e) {
                if (null === t || null === e ? t !== e : t.valueOf() != e.valueOf()) {
                    var n = t;
                    t = e, r(i, n, e, null)
                }
            }, enumerable: !0, configurable: !1
        })
    }

    var j = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            return {hidden: !0}
        }, t
    }(h), W = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            this.WithRoles = this.app.config.roles;
            var i = [{id: "user", value: t("Новую книгу")}];
            return this.WithRoles && i.push({id: "role", value: t("Нового читателя")}), {
                view: "popup",
                width: 176,
                padding: 0,
                point: 0,
                borderless: !0,
                css: "webix_um_add_new_menu",
                body: {
                    view: "menu", autoheight: !0, layout: "y", data: i, on: {
                        onMenuItemClick: function (t) {
                            e.AddNew(t), e.getRoot().hide()
                        }
                    }
                }
            }
        }, t.prototype.AddNew = function (e) {
            var t = this, i = this.app.getService("locale")._, r = this.app.getService("prompt");
            "role" == e ? r.show(i("Введите имя читателя")).then((function (e) {
                return t.app.getService("operations").addRole({name: e})
            })).then((function (e) {
                return t.ShowDetails("roles", e.id)
            })) : "user" == e && r.show(i("Введите название книги")).then((function (e) {
                return t.app.getService("operations").addUser({name: e})
            })).then((function (e) {
                return t.ShowDetails("users", e.id)
            }))
        }, t.prototype.ShowDetails = function (e, t) {
            this.app.callEvent("details:item-click", [e, t])
        }, t.prototype.Show = function (e) {
            this.getRoot().show(e, {x: 2})
        }, t
    }(h), B = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            this.WithRoles = this.app.config.roles;
            var i = {
                view: "button",
                localId: "add-button",
                css: "webix_primary",
                type: "icon",
                icon: "wxi-plus",
                label: t("Добавить"),
                click: function () {
                    this.$scope.Menu.Show(this.$view)
                }
            }, r = [{id: "users", value: t("Книги"), icon: "umi-users"}, {
                id: "roles",
                value: t("Читатели"),
                icon: "umi-roles"
            }, {id: "rules", value: t("Событие"), icon: "umi-rules"}];
            return this.WithRoles || r.splice(1, 1), {
                css: "webix_um_sidebar",
                type: "clean",
                rows: [{paddingX: 15, paddingY: 15, type: "form", rows: [i]}, {
                    select: !0,
                    width: 210,
                    view: "list",
                    css: "webix_um_sidebar_menu",
                    localId: "menu",
                    click: function (t) {
                        return e.ShowPage(t)
                    },
                    type: {height: webix.skin.$active.listItemHeight + 8},
                    data: r,
                    template: "<span class='webix_icon #icon#'></span>#value#"
                }]
            }
        }, t.prototype.init = function () {
            var e = this;
            this.Menu = this.ui(W), this.on(this.app, "onAddButtonClick", (function (t) {
                return e.Menu.Show(t)
            }))
        }, t.prototype.urlChange = function () {
            var e = this.getUrl()[1].page.split(".")[0];
            this.$$("menu").select(e)
        }, t.prototype.ShowPage = function (e) {
            this.show("./" + e)
        }, t
    }(h), z = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this;
            return {
                view: "sidemenu", width: 300, position: "left", state: function (t) {
                    t.left = e.Parent.left, t.top = e.Parent.top, t.height = e.Parent.height
                }, body: B
            }
        }, t.prototype.init = function () {
            var e = this;
            this.on(this.app, "top:navigation", (function () {
                e.getRoot().hide()
            }))
        }, t.prototype.Show = function (e) {
            var t = this;
            this.getRoot().isVisible() || (this.Parent = e, this.webix.delay((function () {
                return t.getRoot().show()
            })))
        }, t
    }(h);

    function K(e) {
        var t = "";
        return e.forEach((function (e) {
            t += "<div class='webix_um_infolist_header'>", e.icon && (t += "<span class='webix_icon " + e.icon + "'></span>"), t += e.title + " (" + e.data.length + ")</div>", t += "<ul class='webix_um_infolist'>", e.data.forEach((function (i) {
                t += "<li class='webix_um_infolist_" + e.name + "_item' data-id='" + i.id + "'>", t += "<span class='webix_um_infolist_name webix_um_infolist_" + e.name + "_name'>" + i[e.key] + "</span>", e.deleteIcon && (t += "<span class='webix_um_infolist_" + e.name + "_delete webix_icon wxi-close'></span>"), t += "</li>"
            })), t += "</ul>"
        })), t
    }

    function q(e, t) {
        return e.replace(new RegExp("(" + t + ")", "ig"), "<span class='webix_um_search_mark'>$1</span>")
    }

    function J(e) {
        return function (t, i, r) {
            var n = e.EscapedSearchText;
            return n && (r = q(r, n)), r
        }
    }

    function Y(e) {
        return function (t) {
            var i = e.EscapedSearchText, r = t.short, n = t.long;
            return i && (r = q(r, i), n = q(n, i)), r + "<div class='webix_um_details_row'>" + n + "</div>"
        }
    }

    function X(e, t) {
        return '\n\t\t<div class="webix_um_badge_container">\n\t\t\t<span class="webix_um_status_badge webix_um_' + (e ? "active" : "not_active") + '">' + t(e ? "Архив" : "Читатель") + "</span>\n\t\t</div>"
    }

    function Z(e, t) {
        return "<div class='" + ("string" == typeof t ? t : "webix_um_role_avatar") + "' style='background-color: " + (e.color ? e.color : "") + "'>" + (e.name ? e.name.charAt(0).toUpperCase() : "") + "</div>"
    }

    function Q(e, t) {
        var i = "string" == typeof t ? t : "webix_um_member_avatar";
        return e.avatar ? '<img class="' + i + '" src="' + e.avatar + '"/>' : "<div class='" + i + " " + (e.name ? function (e) {
            return " webix_um_avatar_" + (e.charCodeAt(1) + e.length % 10) % 10
        }(e.name) : "webix_um_no_name") + "'>" + (e.name ? e.name.charAt(0).toUpperCase() : "") + "</div>"
    }

    var ee = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this;
                return {
                    localId: "layout",
                    maxWidth: 350,
                    rows: [{
                        view: "toolbar",
                        padding: {left: 10},
                        cols: [{view: "label", label: "Role information"}, {
                            view: "icon",
                            icon: "wxi-pencil",
                            click: function () {
                                return e.Edit(e.ID)
                            }
                        }]
                    }, {
                        type: "clean",
                        rows: [{
                            view: "template",
                            localId: "title",
                            autoheight: !0,
                            template: this.TitleTemplate
                        }, {
                            localId: "info",
                            template: " ",
                            scroll: !0,
                            onClick: {
                                webix_um_infolist_users_name: function (t) {
                                    var i = webix.html.locate(t, "data-id");
                                    e.app.callEvent("details:item-click", ["users", i])
                                }, webix_um_infolist_rules_name: function (t) {
                                    var i = webix.html.locate(t, "data-id");
                                    e.app.callEvent("details:item-click", ["rules", i])
                                }
                            }
                        }]
                    }]
                }
            }, t.prototype.urlChange = function () {
                this.Compact || this.SetValues()
            }, t.prototype.SetValues = function () {
                var e = this;
                this.ID = this.getParam("id", !0);
                var t = this.app.getService("local"), i = t.roles(!0);
                i.waitData.then((function () {
                    var r = i.getItem(e.ID);
                    e.SetTitle(r), Promise.all([t.rules(), t.users()]).then((function (t) {
                        e.SetDetails(r, t[0], t[1])
                    }))
                }))
            }, t.prototype.SetTitle = function (e) {
                this.$$("title").setValues({color: e.color, name: e.name})
            }, t.prototype.TitleTemplate = function (e) {
                return Z(e, "webix_um_avatarbox_roles") + "<div class='webix_um_title'>" + (e.name ? e.name : "") + "</div>"
            }, t.prototype.SetDetails = function (e, t, i) {
                this.$$("info").setHTML(this.GetDetailsHTML(e, t, i))
            }, t.prototype.GetDetailsHTML = function (e, t, i) {
                return this.GetListsHTML(e, t, i)
            }, t.prototype.GetListsHTML = function (e, t, i) {
                var r = this.app.getService("locale")._, n = this.GetAssignments(e, t, i);
                return K([{
                    name: "rules",
                    data: n.rules,
                    key: "long",
                    title: r("Event assigned"),
                    icon: "umi-rules"
                }, {name: "users", data: n.users, key: "name", title: r("Members assigned"), icon: "umi-users"}])
            }, t.prototype.GetAssignments = function (e, t, i) {
                var r = {};
                return r.rules = this.GetRoleRules(e, t), r.users = this.GetRoleMembers(e, i), r
            }, t.prototype.GetRoleRules = function (e, t) {
                var i = e.rules || [], r = [];
                return i.forEach((function (e) {
                    r.push(t.getItem(e))
                })), r
            }, t.prototype.GetRoleMembers = function (e, t) {
                var i = [];
                return t.data.each((function (t) {
                    t.roles && t.roles.indexOf(e.id) > -1 && i.push(t)
                })), i
            }, t.prototype.Edit = function (e) {
                this.show("../../roles?id=" + e + "/roles.editor")
            }, t
        }(h), te = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this, t = this.app.getService("locale")._;
                return {
                    rows: [{
                        view: "toolbar",
                        padding: {left: 2, right: 0, top: 0, bottom: 0},
                        cols: [{
                            view: "icon", icon: "umi-back", click: function () {
                                return e.app.callEvent("details.back:click", ["roles", e.getParam("id", !0)])
                            }
                        }, {
                            view: "tabbar",
                            localId: "tabbar",
                            tabMinWidth: 80,
                            css: "webix_um_editor_tabbar",
                            height: webix.skin.$active.barHeight - 2,
                            type: "bottom",
                            borderless: !0,
                            options: [{id: "roles.form", value: t("General")}, {
                                id: "roles.rules",
                                value: t("Event")
                            }, {id: "roles.members", value: t("Members")}],
                            on: {
                                onChange: function (t) {
                                    return e.SetMode(t)
                                }
                            }
                        }]
                    }, {$subview: !0}]
                }
            }, t.prototype.init = function () {
                this.getUrl().length < 2 ? this.show("./roles.form") : this.$$("tabbar").setValue(this.getUrl()[1].page)
            }, t.prototype.SetMode = function (e) {
                this.show(e)
            }, t
        }(h),
        ie = [["#00a037", "#13a1aa", "#df282f", "#fd772c", "#6d4bce", "#b26bd3", "#c87095", "#90564d"], ["#eb2f89", "#ea77c0", "#777676", "#a9a8a8", "#9bb402", "#e7a90b", "#0bbed7", "#038cd9"]],
        re = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this, t = this.app.getService("locale")._;
                return {
                    view: "form",
                    localId: "form",
                    scroll: "auto",
                    margin: 20,
                    css: "webix_um_edit_form",
                    elementsConfig: {labelWidth: 130, labelAlign: "right"},
                    rows: [{
                        margin: 10, cols: [{}, {
                            view: "button", width: 120, label: t("Delete"), click: function () {
                                return e.Delete()
                            }
                        }, {
                            width: 120, value: t("Сохранить"), view: "button", css: "webix_primary", click: function () {
                                return e.Save()
                            }
                        }]
                    }, {
                        view: "text",
                        label: t("Name"),
                        name: "name",
                        localId: "focus",
                        inputWidth: 370
                    }, {
                        view: "colorpicker",
                        label: t("Color"),
                        name: "color",
                        inputWidth: 370,
                        suggest: {
                            type: "colorboard",
                            padding: 3,
                            body: {view: "colorboard", palette: ie, width: 232, height: 58}
                        }
                    }, {}]
                }
            }, t.prototype.urlChange = function () {
                var e = this;
                if (webix.delay((function () {
                    return e.$$("focus").focus()
                })), this.ID = this.getParam("id", !0), this.ID) {
                    var t = this.app.getService("local").roles(!0);
                    t.waitData.then((function () {
                        var i = t.getItem(e.ID);
                        e.$$("form").setValues(i)
                    }))
                }
            }, t.prototype.Save = function () {
                if (this.ID) {
                    var e = this.$$("form").getValues();
                    this.app.getService("operations").updateRole(this.ID, e)
                }
            }, t.prototype.Delete = function () {
                var e = this, t = this.app.getService("locale")._;
                webix.confirm({
                    title: t("Delete"),
                    ok: t("Delete"),
                    cancel: t("Cancel"),
                    text: t("Are you sure to delete this role ?")
                }).then((function () {
                    e.app.getService("operations").deleteRole(e.ID), e.app.show("/top/roles/_hidden")
                }))
            }, t
        }(h), ne = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this;
                return {
                    view: "datatable",
                    localId: "table",
                    rowHeight: webix.skin.$active.rowHeight,
                    headerRowHeight: webix.skin.$active.barHeight - 2 * webix.skin.$active.borderWidth,
                    select: !0,
                    on: {
                        onAfterSelect: function (t) {
                            return e.ShowDetails(t)
                        }
                    },
                    columns: []
                }
            }, t.prototype.ShowDetails = function () {
            }, t.prototype.InitSelf = function (e, t) {
                var i = this, r = this.$$("table");
                (e.waitData || r.waitData).then((function () {
                    t && i.$$("table").select(t), i.on(i.getParam("state", !0).$changes, "search", (function (e) {
                        return i.Find(e)
                    })), i.Table = r
                })), r.parse(e)
            }, t.prototype.urlChange = function () {
                var e = this.Table, t = this.getParam("id", !0);
                e && t && e.select && e.getSelectedId() != t && e.select(t)
            }, t.prototype.EscapeRegExp = function (e) {
                return e.replace(/[[\]{}()*+?.\\^$|]/g, "\\$&")
            }, t.prototype.Find = function (e) {
                var t = this, i = this.$$("table");
                this.EscapedSearchText = this.EscapeRegExp(e || ""), e ? (e = e.toLowerCase(), i.filter((function (i) {
                    return t.SearchCompare(e, i)
                }))) : i.filter()
            }, t
        }(h), oe = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var t = this.app.getService("locale")._, i = e.prototype.config.call(this);
                return webix.extend(i, {
                    rowHeight: webix.skin.$active.rowHeight + 10,
                    headerRowHeight: webix.skin.$active.barHeight + 10
                }, !0), i.columns = [{
                    id: "color",
                    header: "",
                    width: 60,
                    css: "webix_um_center_column ",
                    template: Z
                }, {id: "name", header: t("Name"), fillspace: 2, sort: "string", template: J(this)}], i
            }, t.prototype.init = function () {
                var e = this.app.getService("local").roles(!0);
                this.InitSelf(e, this.getParam("id", !0))
            }, t.prototype.ShowDetails = function (e) {
                this.getParentView().ShowDetails(e)
            }, t.prototype.SearchCompare = function (e, t) {
                return t.name.toLowerCase().indexOf(e) > -1
            }, t
        }(ne), se = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this, t = this.app.getService("locale")._, i = {left: 10, right: 10};
                return {
                    visibleBatch: "main",
                    localId: "header",
                    rows: [{
                        view: "toolbar",
                        padding: i,
                        batch: "main",
                        cols: [{view: "label", label: this.getParam("state").name}, {}, {
                            view: "icon",
                            icon: "wxi-search",
                            click: function () {
                                return e.ShowSearchHeader()
                            }
                        }]
                    }, {
                        view: "toolbar",
                        padding: i,
                        batch: "search",
                        cols: [{view: "text", localId: "search", placeholder: t("Search")}, {
                            view: "icon",
                            icon: "wxi-close",
                            click: function () {
                                return e.HideSearchHeader()
                            }
                        }]
                    }]
                }
            }, t.prototype.init = function () {
                var e = this;
                this.State = this.getParam("state", !0), this.$$("search").attachEvent("onTimedKeyPress", (function () {
                    e.State.search = e.$$("search").getValue()
                }))
            }, t.prototype.ShowSearchHeader = function () {
                this.$$("header").showBatch("search"), this.$$("search").focus()
            }, t.prototype.HideSearchHeader = function () {
                this.$$("search").setValue(""), this.$$("header").showBatch("main"), this.State.search = ""
            }, t
        }(h), ae = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var t = this, i = this.app.getService("locale")._, r = this.getParam("state"),
                    n = e.prototype.config.call(this);
                return n.rows[0].cols.push({
                    view: "toggle",
                    width: 150,
                    type: "icon",
                    icon: "umi-matrix",
                    label: i("Парам"),
                    on: {
                        onChange: function (e) {
                            return t.ToggleVisible(e, r)
                        }
                    }
                }), n
            }, t.prototype.ToggleVisible = function (e, t) {
                t.mode = e ? "matrix" : "grid"
            }, t
        }(se), le = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this.app.getService("locale")._;
                return this.Compact = this.getParam("compact", !0), this.setParam("state", N({
                    mode: "grid",
                    name: e("Читатели"),
                    search: ""
                })), {
                    margin: 10,
                    padding: 10,
                    css: "webix_um_tableview",
                    cols: [{localId: "list", rows: [ae, {$subview: !0, name: "center"}]}, {
                        $subview: "_hidden",
                        name: "default"
                    }]
                }
            }, t.prototype.init = function () {
                var e = this;
                this.on(this.getParam("state").$changes, "mode", (function (t) {
                    e.show("roles." + t, {target: "center"}), "matrix" === t && (e.setParam("id", null), e.show("./_hidden"))
                })), this.on(this.app, "roles.back:click", (function () {
                    return e.HideEditor()
                }))
            }, t.prototype.ShowDetails = function (e) {
                var t = this.getParam("id"), i = e.toString();
                this.getParam("compact", !0) || !t ? this.app.callEvent("details:item-click", ["roles", i]) : t !== i && this.setParam("id", i, !0)
            }, t.prototype.ToggleVisible = function (e) {
                e ? (this.show("_hidden", {target: "default"}), this.show("roles.matrix", {target: "center"}), this.$$("toolbar").showBatch("matrix")) : (this.show("roles.grid", {target: "center"}), this.$$("toolbar").showBatch("default"))
            }, t
        }(h), ue = "<span class='webix_icon wxi-checkbox-marked'></span>",
        ce = "<span class='webix_icon wxi-checkbox-blank'></span>", he = "<span class='webix_icon wxi-check'></span>",
        pe = "<span class='webix_icon wxi-minus '></span>", de = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var t = this, i = this.app.getService("locale")._;
                this.Sorting = {column: "", dir: ""};
                var r = e.prototype.config.call(this);
                return webix.extend(r, {
                    css: "webix_um_matrix",
                    headerRowHeight: 56,
                    rowHeight: 62,
                    rowLineHeight: 29,
                    leftSplit: 1,
                    select: !1,
                    on: {
                        onItemClick: function (e) {
                            return t.Toggle(e)
                        }, onHeaderClick: function (e) {
                            return t.ToggleColumnSorting(e.column)
                        }
                    }
                }, !0), this.GetRoleColumns().then((function (e) {
                    return r.columns = n([{
                        id: "short",
                        header: i("Event"),
                        width: 220,
                        css: "webix_um_column_name",
                        sort: "string",
                        template: Y(t)
                    }], e), r
                }))
            }, t.prototype.init = function () {
                return this.GetData()
            }, t.prototype.GetData = function () {
                var e = this, t = this.app.getService("local");
                return Promise.all([t.roles(), t.rules()]).then((function (t) {
                    var i = e.CreateMatrix(t[0], t[1]);
                    e.InitSelf(i)
                }))
            }, t.prototype.SearchCompare = function (e, t) {
                return t.short.toLowerCase().indexOf(e) > -1 || t.long.toLowerCase().indexOf(e) > -1
            }, t.prototype.Save = function (e) {
                var t = e.column, i = this.app.getService("local").roles(!0).getItem(t);
                i.rules = [], this.$$("table").data.each((function (e) {
                    e[t] && i.rules.push(e.id)
                })), this.app.getService("operations").updateRole(t, i)
            }, t.prototype.Toggle = function (e) {
                var t = this.$$("table").getItem(e), i = e.column;
                "short" != i && (t[i] = !t[i], t.selected = !t.selected, this.$$("table").updateItem(e, t), this.Save(e))
            }, t.prototype.GetRoleColumns = function () {
                return this.app.getService("local").roles().then((function (e) {
                    var t = [];
                    return e.data.each((function (e) {
                        t.push({
                            id: e.id,
                            header: {text: "<span>" + e.name + "</span>", css: "webix_um_center_column webix_um_names"},
                            minWidth: 100,
                            fillspace: 1,
                            css: "webix_um_center_column",
                            template: function (t) {
                                return t[e.id] ? he : pe
                            }
                        })
                    })), t
                }))
            }, t.prototype.CreateMatrix = function (e, t) {
                return t.serialize().map((function (t) {
                    var i = t.id, n = t.short, o = t.long, s = {};
                    return e.data.each((function (e) {
                        s[e.id] = !!e.rules && e.rules.indexOf(i) > -1
                    })), r({id: i, short: n, long: o}, s)
                }))
            }, t.prototype.ToggleColumnSorting = function (e) {
                if ("short" != e) {
                    var t = this.Sorting.column == e && "desc" == this.Sorting.dir ? "asc" : "desc";
                    this.$$("table").sort({
                        by: e,
                        dir: t,
                        as: "string"
                    }), this.$$("table").markSorting(e, t), this.Sorting.dir = t
                }
                this.Sorting.column = e
            }, t
        }(ne), fe = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t.prototype.config = function () {
                var e = this, t = this.app.getService("locale")._;
                return {
                    type: "clean",
                    rows: [{
                        view: "form",
                        rows: [{
                            rows: [{
                                view: "template",
                                localId: "title",
                                borderless: !0,
                                height: 25,
                                css: "webix_um_details_title",
                                template: "#name#",
                                data: {name: ""}
                            }, {
                                cols: [{
                                    view: "template",
                                    localId: "number",
                                    borderless: !0,
                                    height: 40,
                                    css: "webix_um_details_title_description",
                                    template: function (e) {
                                        var i = e.number ? e.number : 0;
                                        return '<div class="webix_um_details_title_description">' + (i ? t("Members assigned") + " (" + i + ")" : t("No members")) + "</div>"
                                    },
                                    data: {name: ""}
                                }, {
                                    rows: [{
                                        view: "toggle",
                                        localId: "toggle",
                                        offLabel: t("Modify"),
                                        onLabel: t("Done"),
                                        width: 160,
                                        on: {
                                            onChange: function (t) {
                                                return e.ToggleVisible(t)
                                            }
                                        }
                                    }, {}]
                                }]
                            }]
                        }]
                    }, {
                        view: "datatable",
                        localId: "users",
                        css: "webix_um_details_table",
                        rowHeight: webix.skin.$active.rowHeight + 10,
                        columns: [{
                            id: "selected", hidden: !0, header: "", width: 45, cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            }, template: function (e) {
                                return e.selected ? ue : ce
                            }
                        }, {
                            id: "name", header: {content: "textFilter", placeholder: t("Search")}, template: function (e) {
                                return Q(e) + e.name
                            }, fillspace: 2, cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            }
                        }],
                        checkboxRefresh: !0,
                        on: {
                            onItemClick: function (t) {
                                return e.Toggle(1 * t.row)
                            }
                        }
                    }]
                }
            }, t.prototype.urlChange = function () {
                this.ID = 1 * this.getParam("id", !0), this.ID && this.GetData()
            }, t.prototype.GetData = function () {
                var e = this, t = this.app.getService("local");
                return this.ShowAll = !1, this.$$("users").registerFilter(this.$$("toggle"), {
                    compare: function (e, t, i) {
                        return i.selected
                    }
                }, {
                    getValue: function (e) {
                        return !e.getValue() || ""
                    }
                }), Promise.all([t.roles(), t.users()]).then((function (t) {
                    e.Role = webix.copy(t[0].getItem(e.ID)), e.Role.number = 0;
                    var i = t[1].serialize().map((function (t) {
                        var i = t.id, r = t.avatar, n = t.name, o = t.roles, s = o && -1 !== o.indexOf(e.ID);
                        return s && e.Role.number++, {id: i, avatar: r, name: n, selected: s}
                    }));
                    e.$$("users").parse(i), e.$$("title").setValues(e.Role), e.ShowNumber(), e.Filter()
                }))
            }, t.prototype.ShowNumber = function () {
                this.$$("number").setValues(this.Role)
            }, t.prototype.Save = function (e) {
                var t = this.app.getService("local").users(!0).getItem(e);
                this.$$("users").getItem(e).selected ? (this.Role.number++, t.roles || (t.roles = []), t.roles.indexOf(this.ID) < 0 && (t.roles[t.roles.length] = this.ID)) : t.roles && t.roles.indexOf(this.ID) >= 0 && (t.roles.splice(t.roles.indexOf(this.ID), 1), this.Role.number--), this.ShowNumber(), this.app.getService("operations").updateUser(e, t)
            }, t.prototype.ToggleVisible = function () {
                this.ShowAll = !this.ShowAll, this.ShowAll ? this.$$("users").showColumn("selected") : this.$$("users").hideColumn("selected"), this.Filter()
            }, t.prototype.Toggle = function (e) {
                if (this.ShowAll) {
                    var t = this.$$("users").getItem(e);
                    this.$$("users").updateItem(e, {selected: !t.selected}), this.Save(e)
                }
            }, t.prototype.Filter = function () {
                this.$$("users").filterByAll(), this.$$("users").sort((function (e, t) {
                    return e.selected == t.selected ? e.name > t.name ? 1 : -1 : e.selected ? -1 : 1
                }))
            }, t
        }(h);
    webix.ui.datafilter.umMasterCheckox = webix.extend({
        refresh: function (e, t, i) {
            t.onclick = function () {
                i.checked = !i.checked, t.querySelector(".webix_icon").className = "webix_icon wxi-checkbox-" + (i.checked ? "marked" : "blank"), e.data.each((function (e) {
                    return e[i.columnId] = i.checked
                })), e.refresh(), e.callEvent("onCustomSave", [])
            }
        }, render: function (e, t) {
            return t.checked ? ue : ce
        }
    }, webix.ui.datafilter.masterCheckbox);
    var me = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return {
                type: "clean", rows: [{
                    rows: [{
                        view: "form",
                        rows: [{
                            rows: [{
                                view: "template",
                                localId: "title",
                                borderless: !0,
                                height: 25,
                                css: "webix_um_details_title",
                                template: "#name#",
                                data: {name: ""}
                            }, {
                                cols: [{
                                    view: "template",
                                    localId: "number",
                                    borderless: !0,
                                    height: 40,
                                    css: "webix_um_details_title_description",
                                    template: function (e) {
                                        var i = e.rules ? e.rules.length : 0;
                                        return '<div class="webix_um_details_title_description">' + (i ? t("Rules assigned") + " (" + i + ")" : t("No rules")) + "</div>"
                                    },
                                    data: {name: ""}
                                }, {
                                    rows: [{
                                        view: "toggle",
                                        localId: "toggle",
                                        offLabel: t("Modify"),
                                        onLabel: t("Done"),
                                        width: 160,
                                        on: {
                                            onChange: function (t) {
                                                return e.ToggleVisible(t)
                                            }
                                        }
                                    }, {}]
                                }]
                            }]
                        }]
                    }, {
                        view: "datatable",
                        localId: "rules",
                        rowHeight: webix.skin.$active.rowHeight > 30 ? 60 : 52,
                        rowLineHeight: 28,
                        css: "webix_um_details_table webix_um_details_table_rules",
                        columns: [{
                            id: "selected",
                            hidden: !0,
                            header: {content: "umMasterCheckox", contentId: "ch"},
                            width: 45,
                            css: "webix_um_checkbox_column",
                            cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            },
                            template: function (e) {
                                return e.selected ? ue : ce
                            }
                        }, {
                            id: "name",
                            header: {
                                content: "textFilter", compare: this.GetCompare(), prepare: function (e) {
                                    return e.toLowerCase()
                                }, placeholder: t("Search")
                            },
                            fillspace: 2,
                            cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            },
                            template: function (e) {
                                return e.short + "<div class='webix_um_details_row'>" + e.long + "</div>"
                            }
                        }],
                        on: {
                            onItemClick: function (t) {
                                return e.Toggle(1 * t.row)
                            }, onCustomSave: function () {
                                return e.Save()
                            }
                        }
                    }]
                }]
            }
        }, t.prototype.urlChange = function () {
            this.ID = this.getParam("id", !0), this.ID && this.GetData()
        }, t.prototype.GetData = function () {
            var e = this, t = this.app.getService("local");
            return this.ShowAll = !1, this.$$("rules").registerFilter(this.$$("toggle"), {
                compare: function (e, t, i) {
                    return i.selected
                }
            }, {
                getValue: function (e) {
                    return !e.getValue() || ""
                }
            }), Promise.all([t.roles(), t.rules()]).then((function (t) {
                e.Role = webix.copy(t[0].getItem(e.ID)), e.Role.rules = e.Role.rules || [];
                var i = t[1].serialize().map((function (t) {
                    var i = t.id;
                    return {id: i, short: t.short, long: t.long, selected: -1 !== e.Role.rules.indexOf(i)}
                }));
                e.$$("rules").parse(i), e.$$("title").setValues(e.Role), e.ShowNumber(), e.Filter()
            }))
        }, t.prototype.Save = function () {
            var e = this;
            this.Role.rules = [], this.$$("rules").data.each((function (t) {
                t.selected && e.Role.rules.push(t.id)
            }), this, !0), this.ShowNumber(), this.app.getService("operations").updateRole(this.Role.id, this.Role)
        }, t.prototype.ShowNumber = function () {
            this.$$("number").setValues(this.Role)
        }, t.prototype.ToggleVisible = function () {
            this.ShowAll = !this.ShowAll, this.ShowAll ? this.$$("rules").showColumn("selected") : this.$$("rules").hideColumn("selected"), this.Filter()
        }, t.prototype.Toggle = function (e) {
            if (this.ShowAll) {
                var t = this.$$("rules").getItem(e);
                this.$$("rules").updateItem(e, {selected: !t.selected}), this.Save()
            }
        }, t.prototype.Filter = function () {
            this.$$("rules").filterByAll(), this.$$("rules").sort((function (e, t) {
                return e.selected == t.selected ? e.short > t.short ? 1 : -1 : e.selected ? -1 : 1
            }))
        }, t.prototype.GetCompare = function () {
            return function (e, t, i) {
                return i.short.toLowerCase().indexOf(t) > -1 || i.long.toLowerCase().indexOf(t) > -1
            }
        }, t
    }(h), ge = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this;
            this.WithRoles = this.app.config.roles, this.Compact = this.getParam("compact", !0);
            var t = {
                view: "toolbar", padding: {left: 10}, cols: [{
                    view: "icon", icon: "umi-back", click: function () {
                        return e.app.callEvent("details.back:click", ["rules", e.getParam("id", !0)])
                    }, hidden: !this.Compact
                }, {view: "label", label: "Rule information"}, {}]
            }, i = {view: "template", localId: "title", autoheight: !0, template: this.TitleTemplate}, r = {
                view: "template",
                localId: "info",
                scroll: !0,
                onClick: {
                    webix_um_infolist_users_name: function (t) {
                        var i = webix.html.locate(t, "data-id");
                        e.app.callEvent("details:item-click", ["users", i])
                    }, webix_um_infolist_roles_name: function (t) {
                        var i = webix.html.locate(t, "data-id");
                        e.app.callEvent("details:item-click", ["roles", i])
                    }
                }
            };
            return {maxWidth: this.Compact ? 1e4 : 350, rows: [t, {type: "clean", rows: [i, r]}]}
        }, t.prototype.urlChange = function () {
            var e = this;
            this.ID = 1 * this.getParam("id", !0);
            var t = this.app.getService("local"), i = [t.users()];
            this.WithRoles && i.push(t.roles());
            var r = t.rules(!0);
            r.waitData.then((function () {
                if (e.getRoot()) {
                    var t = r.getItem(e.ID);
                    e.SetTitle(t), Promise.all(i).then((function (i) {
                        e.SetDetails(t, i[0], i[1] || null)
                    }))
                }
            }))
        }, t.prototype.SetTitle = function (e) {
            this.$$("title").setValues(e)
        }, t.prototype.SetDetails = function (e, t, i) {
            this.$$("info").setHTML(this.GetDetailsHTML(e, t, i))
        }, t.prototype.GetDetailsHTML = function (e, t, i) {
            return this.GetListsHTML(e, t, i)
        }, t.prototype.TitleTemplate = function (e) {
            return "<div class='webix_um_title'>" + (e.short || "") + "</div><div class='webix_um_description'>" + (e.long || "") + "</div>"
        }, t.prototype.GetRoles = function (e, t) {
            var i = [];
            return t && t.data.each((function (t) {
                t.rules && t.rules.indexOf(e) >= 0 && i.push(t)
            })), i
        }, t.prototype.GetUsers = function (e, t, i) {
            var r = this, n = [];
            return t.data.each((function (t) {
                if (t.rules && t.rules.indexOf(e) >= 0) n.push(t); else if (i && r.WithRoles && t.roles) for (var o = 0; o < t.roles.length; o++) {
                    var s = i.getItem(t.roles[o]);
                    if (s.rules && s.rules.indexOf(e) >= 0) {
                        n.push(t);
                        break
                    }
                }
            })), n
        }, t.prototype.GetAssignments = function (e, t, i) {
            var r = {};
            return r.roles = this.GetRoles(e.id, i), r.users = this.GetUsers(e.id, t, i), r
        }, t.prototype.GetListsHTML = function (e, t, i) {
            var r = this.app.getService("locale")._, n = [], o = this.GetAssignments(e, t, i);
            return this.WithRoles && n.push({
                name: "roles",
                data: o.roles,
                key: "name",
                title: r("Roles"),
                icon: "umi-roles"
            }), K(n.concat({name: "users", data: o.users, key: "name", title: r("Users"), icon: "umi-users"}))
        }, t
    }(h), ve = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var t = this.app.getService("locale")._;
            this.setParam("state", N({name: t("Rules"), search: ""})), this.Compact = this.getParam("compact", !0);
            var i = e.prototype.config.call(this);
            return webix.extend(i, {
                rowHeight: webix.skin.$active.rowHeight + 10,
                headerRowHeight: webix.skin.$active.barHeight + 10
            }, !0), i.columns = [{
                id: "short",
                header: t("Читатель"),
                fillspace: 2,
                sort: "string",
                template: J(this)
            }, {id: "long", header: t("Событие"), fillspace: 2, sort: "string", template: J(this)}], {
                margin: 10,
                padding: 10,
                css: "webix_um_tableview",
                cols: [{rows: [se, i]}, {$subview: "_hidden", name: "default"}]
            }
        }, t.prototype.init = function () {
            var e = this, t = this.app.getService("local").rules(!0);
            this.InitSelf(t, this.getParam("id")), this.on(this.app, "rules.back:click", (function () {
                return e.HideDetails()
            }))
        }, t.prototype.ShowDetails = function (e) {
            this.app.callEvent("details:item-click", ["rules", e.toString()])
        }, t.prototype.SearchCompare = function (e, t) {
            return t.short.toLowerCase().indexOf(e) > -1 || t.long.toLowerCase().indexOf(e) > -1
        }, t
    }(ne), we = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return this.Compact = this.getParam("compact"), {
                view: "toolbar",
                paddingY: 9,
                paddingX: 12,
                css: "webix_um_toolbar",
                visibleBatch: "def",
                cols: [{
                    view: "icon", icon: "webix_icon umi-menu", click: function () {
                        return e.app.callEvent("menu:click", [])
                    }, hidden: !this.Compact
                }, {view: "label", label: t("Менеджер книг")}, {}, {
                    batch: "saving",
                    view: "label",
                    width: 30,
                    label: "<span class='webix_icon webix_um_saving_icon umi-sync webix_spin'></span>"
                }, {
                    batch: "saved",
                    cols: [{
                        view: "label",
                        label: t("Done"),
                        width: 130,
                        align: "right",
                        css: "webix_um_saved_label"
                    }, {
                        view: "label",
                        width: 30,
                        label: "<span class='webix_icon umi-check-circle webix_um_saved_icon'></span>"
                    }]
                }]
            }
        }, t.prototype.init = function () {
            this.app.getService("progress").handle(this.getRoot())
        }, t
    }(h);
    webix.protoUI({
        name: "r-layout", sizeTrigger: function (e, t, i) {
            this._compactValue = i, this._compactWidth = e, this._compactHandler = t, this._checkTrigger(this.$view.width, i)
        }, _checkTrigger: function (e, t) {
            return !this._compactWidth || !(e <= this._compactWidth && !t || e > this._compactWidth && t) || (this._compactWidth = null, this._compactHandler(!t), !1)
        }, $setSize: function (e, t) {
            if (this._checkTrigger(e, this._compactValue)) return webix.ui.layout.prototype.$setSize.call(this, e, t)
        }
    }, webix.ui.layout);
    var be = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this.getParam("forceCompact"), t = void 0 !== e;
            t && this.setParam("compact", e), this.Compact = this.getParam("compact");
            var i = this.Compact ? [{$subview: !0}] : [B, {$subview: !0}];
            return {
                borderless: !0,
                view: t ? "layout" : "r-layout",
                rows: [we, {localId: "main", borderless: !0, cols: i}]
            }
        }, t.prototype.init = function () {
            var e = this, t = this.getRoot();
            t.sizeTrigger && t.sizeTrigger(this.app.config.compactWidth, (function (t) {
                return e.SetCompactMode(t)
            }), !!this.Compact), this.on(this.app, "menu:click", (function () {
                return e.ShowSideMenu()
            })), this.on(this.app, "details:item-click", (function (t, i) {
                return e.ShowDetails(t, i)
            })), this.on(this.app, "details.back:click", (function (t, i) {
                return e.ShowList(t, i)
            }))
        }, t.prototype.urlChange = function () {
            this.app.callEvent("top:navigation")
        }, t.prototype.SetCompactMode = function (e) {
            var t = this;
            webix.delay((function () {
                t.setParam("compact", e), t.refresh()
            }))
        }, t.prototype.ShowSideMenu = function () {
            this.SideMenu && this.SideMenu.getRoot() || (this.SideMenu = this.ui(z));
            var e = this.$$("main").$view.getBoundingClientRect();
            this.SideMenu.Show(e)
        }, t.prototype.ShowDetails = function (e, t) {
            var i = this.Compact && "rules" !== e ? "editor" : "details";
            this.Compact ? this.show("./" + e + "." + i + "?id=" + t) : this.show("./" + e + "?id=" + t + "/" + e + "." + i)
        }, t.prototype.ShowList = function (e, t) {
            this.Compact ? this.show("./" + e) : this.show("./" + e + "?id=" + t + "/" + e + ".details")
        }, t
    }(h), _e = webix.Date.dateToStr("%M %d, %Y %H:%i:%s"), ye = function (e) {
        return new Date(e)
    }, xe = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            this.Type = "login";
            var i = {
                view: "form",
                rows: [{
                    rows: [{
                        view: "template",
                        localId: "title",
                        borderless: !0,
                        height: 30,
                        css: "webix_um_details_title",
                        template: "#name#",
                        data: {name: ""}
                    }, {
                        view: "radio",
                        localId: "type",
                        value: this.Type,
                        options: [{id: "login", value: t("logins")}, {
                            id: "user",
                            value: t("changes to")
                        }, {id: "by-user", value: t("changes by")}],
                        on: {
                            onChange: function (t) {
                                return e.ShowLogTable(t)
                            }
                        }
                    }]
                }]
            };
            return this.InitColumns(t), {
                type: "clean",
                rows: [{
                    rows: [i, {
                        view: "datatable",
                        localId: "audit",
                        rowHeight: Math.max(webix.skin.$active.rowHeight, 34),
                        columns: this.GetColumns("login"),
                        on: {
                            onItemClick: function (t) {
                                return e.ShowTarget(t)
                            }
                        }
                    }]
                }]
            }
        }, t.prototype.init = function () {
        }, t.prototype.urlChange = function () {
            var e = this;
            if (this.$$("type").setValue(this.Type), this.ID = this.getParam("id", !0), this.ID) {
                var t = this.app.getService("local");
                Promise.all([t.users(), t.roles(), t.logsMeta()]).then((function (t) {
                    var i = t[0].getItem(e.ID);
                    e.$$("title").setValues(i), e.ShowLogTable(e.Type)
                }))
            }
        }, t.prototype.InitColumns = function (e) {
            var t = this, i = this.app.getService("local"), r = {
                id: "date", header: e("When"), fillspace: !0, format: function (e) {
                    return _e(ye(e))
                }
            }, n = {
                id: "user_id", header: e("Who"), fillspace: !0, template: function (t) {
                    var r = i.users(!0).getItem(t.user_id);
                    return r ? '<span class="webix_um_cell_clickable">' + r.name + "</span>" : '<span class="webix_um_deleted_user"> ' + e("Deleted") + "</span>"
                }
            }, o = {
                id: "target_id", header: e("Target"), fillspace: !0, template: function (i) {
                    var r = t.GetTarget(i).item;
                    return r ? '<span class="webix_um_cell_clickable">' + r.name + "</span>" : '<span class="webix_um_deleted_user"> ' + e("Deleted") + "</span>"
                }
            }, s = {
                id: "type", header: e("Operation"), template: function (e) {
                    var t = i.logsMeta(!0)[e.type];
                    return t ? t.name : e.type
                }, fillspace: !0
            }, a = {id: "details", fillspace: !0, header: e("Details")};
            this.ColumnBatches = {login: [r, a], user: [r, n, s, a], "by-user": [r, o, s, a]}
        }, t.prototype.ShowLogTable = function (e) {
            var t = this.app.getService("backend").logs(e, this.ID), i = this.$$("audit");
            i.clearAll(), i.refreshColumns(this.GetColumns(e)), t.then((function (e) {
                i.parse(e)
            }))
        }, t.prototype.GetColumns = function (e) {
            return webix.copy(this.ColumnBatches[e])
        }, t.prototype.ShowTarget = function (e) {
            var t = e.column;
            if ("target_id" == t || "user_id" == t) {
                var i = this.$$("audit").getItem(e), r = void 0, n = "users";
                if ("target_id" == t) {
                    var o = this.GetTarget(i);
                    r = o.item, "role" == o.type && (n = "roles")
                } else r = this.app.getService("local").users(!0).getItem(i.user_id);
                r && this.app.callEvent("details:item-click", [n, r.id])
            }
        }, t.prototype.GetTarget = function (e) {
            var t = this.app.getService("local"), i = t.logsMeta(!0)[e.type];
            return {item: (i && "role" == i.target ? t.roles(!0) : t.users(!0)).getItem(e.target_id), type: i.target}
        }, t
    }(h), Se = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return {
                view: "window",
                modal: !0,
                move: !0,
                width: 300,
                height: 300,
                head: {
                    view: "toolbar",
                    padding: {left: 20, right: 9},
                    borderless: !0,
                    elements: [{view: "label", label: t("New password")}, {
                        view: "icon",
                        icon: "wxi-close",
                        hotkey: "esc",
                        click: function () {
                            return e.getRoot().close()
                        }
                    }]
                },
                position: "center",
                body: {
                    view: "form",
                    localId: "form",
                    padding: {top: 20, left: 20, right: 20, bottom: 20},
                    margin: 2,
                    elements: [{
                        view: "button", label: t("Generate password"), click: function () {
                            return e.GeneratePassword()
                        }
                    }, {
                        borderless: !0,
                        height: 20,
                        cols: [{}, {
                            template: "<div class='webix_um_divider_line'/>",
                            css: "webix_um_divider",
                            borderless: !0,
                            width: 40
                        }, {}]
                    }, {
                        margin: 10,
                        rows: [{
                            labelPosition: "top",
                            css: "webix_um_passw_label",
                            label: t("Enter password"),
                            view: "text",
                            name: "password",
                            validate: "isNotEmpty",
                            type: "password"
                        }, {
                            view: "button", css: "webix_primary", label: t("Reset password"), click: function () {
                                return e.ResetPassword()
                            }
                        }]
                    }]
                },
                on: {
                    onShow: function () {
                        this.getBody().elements.password.getInputNode().focus()
                    }
                }
            }
        }, t.prototype.Show = function (e) {
            this.getRoot().show(), this.ID = 1 * this.getParam("id", !0), this.credID = e
        }, t.prototype.GeneratePassword = function () {
            this.app.getService("backend").resetPassword(this.ID, {id: this.credID}), this.getRoot().close()
        }, t.prototype.ResetPassword = function () {
            if (this.$$("form").validate()) {
                var e = this.$$("form").getValues().password;
                this.app.getService("backend").resetPassword(this.ID, {
                    id: this.credID,
                    record: e
                }), this.getRoot().close()
            }
        }, t
    }(h), $e = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this;
            this.WithRoles = this.app.config.roles;
            return {
                maxWidth: 350,
                rows: [{
                    view: "toolbar",
                    padding: {left: 10},
                    cols: [{view: "label", label: "Информация о книге", width: 125}, {
                        view: "template",
                        css: "webix_um_transparent",
                        localId: "statusBadge",
                        borderless: !0
                    }, {
                        view: "icon", icon: "wxi-pencil", click: function () {
                            return e.Edit(e.ID)
                        }
                    }]
                }, {
                    type: "clean",
                    rows: [{localId: "title", template: " ", autoheight: !0}, {
                        localId: "info",
                        template: " ",
                        scroll: "auto",
                        onClick: {
                            webix_um_infolist_rules_name: function (t) {
                                var i = webix.html.locate(t, "data-id");
                                e.app.callEvent("details:item-click", ["rules", i])
                            }, webix_um_infolist_roles_name: function (t) {
                                var i = webix.html.locate(t, "data-id");
                                e.app.callEvent("details:item-click", ["roles", i])
                            }
                        }
                    }]
                }]
            }
        }, t.prototype.init = function () {
            this._ = this.app.getService("locale")._
        }, t.prototype.urlChange = function () {
            var e = this;
            this.ID = this.getParam("id", !0);
            var t = this.app.getService("local"), i = [t.rules()];
            this.WithRoles && i.push(t.roles());
            var r = t.users(!0);
            r.waitData.then((function () {
                if (e.getRoot()) {
                    var t = r.getItem(e.ID);
                    e.SetTitle(t), Promise.all(i).then((function (i) {
                        e.SetDetails(t, i[0], i[1])
                    }))
                }
            }))
        }, t.prototype.SetTitle = function (e) {
            this.$$("statusBadge").setHTML(X(e.status, this._)), this.$$("title").setHTML(this.TitleTemplate(e))
        }, t.prototype.SetDetails = function (e, t, i) {
            this.$$("info").setHTML(this.GetDetailsHTML(e, i, t))
        }, t.prototype.GetDetailsHTML = function (e, t, i) {
            var r = "";
            return r += this.InfoTemplate(e.email, this._("ISBN"), "umi-email"), r += this.InfoTemplate(this.FormatDate(e.visited), this._("Последнее событие"), "umi-clock"), r += this.GetListsHTML(e, t, i)
        }, t.prototype.GetListsHTML = function (e, t, i) {
            var r = this.app.getService("locale")._, n = this.GetAssignments(e, t, i), o = [];
            return this.WithRoles && o.push({
                name: "roles",
                data: n.roles,
                key: "name",
                title: r("Читатель"),
                icon: "umi-roles"
            }), K(o.concat({name: "rules", data: n.rules, key: "long", title: r("Всего событий"), icon: "umi-rules"}))
        }, t.prototype.GetAssignments = function (e, t, i) {
            var r = {roles: [], rules: []};
            this.WithRoles && e.roles && t.data.each((function (t) {
                e.roles.indexOf(t.id) >= 0 && r.roles.push(t)
            }));
            var n = {};
            return e.rules && i.data.each((function (t) {
                e.rules.indexOf(t.id) >= 0 && !n[t.id] && (n[t.id] = !0, r.rules.push(t))
            })), this.WithRoles && r.roles.forEach((function (e) {
                e.rules && i.data.each((function (t) {
                    e.rules.indexOf(t.id) >= 0 && !n[t.id] && (n[t.id] = !0, r.rules.push(t))
                }))
            })), r
        }, t.prototype.TitleTemplate = function (e) {
            return "\n\t\t\t" + Q(e, "webix_um_avatarbox") + '\n\t\t\t<div class="webix_um_title">' + (e.name || this._("Unknown user")) + "</div>"
        }, t.prototype.InfoTemplate = function (e, t, i) {
            return "\n\t\t\t<div class='webix_um_infolist_header'><span class='webix_icon " + i + "'></span> " + (t || this._("Unknown")) + ":</div>\n\t\t\t<div class='webix_um_infolist_details'>" + (e || this._("Unknown")) + "</div>\n\t\t"
        }, t.prototype.FormatDate = function (e) {
            return e && (e = ye(e), e = _e(e)), e || ""
        }, t.prototype.Edit = function () {
            this.show("../users.editor")
        }, t
    }(h), ke = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._, i = [{id: "users.form", value: t("General")}, {
                id: "users.rules",
                value: t("Rules")
            }, {id: "users.audit", value: t("Audit")}];
            return this.app.config.roles && i.splice(2, 0, {
                id: "users.roles",
                value: t("Roles")
            }), {
                rows: [{
                    view: "toolbar",
                    padding: {left: 2, right: 0, top: 0, bottom: 0},
                    cols: [{
                        view: "icon", icon: "umi-back", click: function () {
                            return e.app.callEvent("details.back:click", ["users", e.getParam("id", !0)])
                        }
                    }, {
                        view: "tabbar",
                        localId: "tabbar",
                        css: "webix_um_editor_tabbar",
                        height: webix.skin.$active.barHeight - 2,
                        type: "bottom",
                        options: i,
                        borderless: !0,
                        on: {
                            onChange: function (t) {
                                return e.SetMode(t)
                            }
                        }
                    }]
                }, {$subview: !0}]
            }
        }, t.prototype.init = function () {
            this.getUrl().length < 2 ? this.show("./users.form") : this.$$("tabbar").setValue(this.getUrl()[1].page)
        }, t.prototype.SetMode = function (e) {
            this.show(e)
        }, t
    }(h), Ie = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return {
                type: "clean",
                rows: [{
                    view: "form",
                    margin: 10,
                    cols: [{}, {
                        width: 120, value: t("Delete"), view: "button", click: function () {
                            return e.Delete()
                        }
                    }, {
                        width: 120, value: t("Сохранить"), view: "button", css: "webix_primary", click: function () {
                            return e.Save()
                        }
                    }]
                }, {
                    view: "form",
                    localId: "form",
                    margin: 20,
                    css: "webix_um_edit_form",
                    scroll: "auto",
                    elementsConfig: {labelAlign: "right", labelWidth: 130},
                    rows: [{
                        cols: [{
                            view: "text",
                            label: t("Название"),
                            localId: "focus",
                            name: "name",
                            gravity: 2,
                            maxWidth: 550,
                            minWidth: 420
                        }, {}]
                    }, {
                        cols: [{
                            view: "text",
                            label: t("ISBN"),
                            name: "email",
                            gravity: 2,
                            maxWidth: 550,
                            minWidth: 420
                        }, {}]
                    }, {
                        cols: [{
                            view: "forminput",
                            label: t("Avatar"),
                            body: {
                                localId: "avatar",
                                css: "webix_um_form_avatar",
                                width: 95,
                                height: 95,
                                borderless: !0,
                                template: function (e) {
                                    return "" + Q(e, "webix_um_avatarbox")
                                }
                            }
                        }, {
                            rows: [{}, {
                                view: "uploader",
                                localId: "avatarUpl",
                                accept: "image/*",
                                autowidth: !0,
                                autosend: !0,
                                label: t("Upload new photo"),
                                type: "icon",
                                icon: "umi-upload",
                                css: "webix_transparent webix_um_uploader",
                                on: {
                                    onAfterFileAdd: function (t) {
                                        return e.UpdateAvatar(t)
                                    }, onUploadComplete: function (t) {
                                        return e.UpdateAvatar(t)
                                    }
                                }
                            }]
                        }, {}]
                    }, {
                        view: "switch",
                        name: "status",
                        localId: "status",
                        label: t("Status"),
                        css: "webix_um_status_switch",
                        on: {
                            onChange: function (t) {
                                return e.UpdateBadge(t)
                            }
                        }
                    }, {
                        view: "forminput",
                        label: t("Жанр"),
                        body: {view: "label", localId: "registeredDate", css: "webix_um_text_normal"}
                    }, {
                        view: "forminput",
                        label: t("Last visited"),
                        body: {view: "label", localId: "visitedDate", css: "webix_um_text_normal"}
                    }, {
                        visibleBatch: "def",
                        localId: "credentials",
                        css: "webix_um_credentials",
                        cols: [{
                            view: "label",
                            label: t("Credentials"),
                            width: 130,
                            css: "webix_um_form_label"
                        }, {batch: "def"}, {
                            batch: "no-credentials",
                            cols: [{
                                view: "button", label: t("Add credentials"), width: 160, click: function () {
                                    return e.AddCredentials()
                                }
                            }, {}]
                        }, {
                            batch: "credentials",
                            margin: 5,
                            cols: [{
                                view: "button",
                                css: "webix_transparent",
                                label: t("Reset password"),
                                width: 140,
                                click: function () {
                                    return e.ResetPassword()
                                }
                            }, {
                                view: "button",
                                css: "webix_transparent",
                                label: t("Delete credentials"),
                                width: 150,
                                click: function () {
                                    return e.DeleteCredentials()
                                }
                            }, {}]
                        }]
                    }, {
                        cols: [{
                            view: "textarea",
                            name: "details",
                            label: t("Details"),
                            height: 128,
                            gravity: 2,
                            maxWidth: 550,
                            minWidth: 420
                        }, {}]
                    }, {}]
                }]
            }
        }, t.prototype.urlChange = function () {
            var e = this;
            this.ID = 1 * this.getParam("id", !0), this.ShowCredentials(), this.$$("avatarUpl").config.upload = this.app.getService("backend").avatar(this.ID), this.app.getService("local").users().then((function (t) {
                var i = t.getItem(e.ID);
                e.$$("form").setValues(i), e.$$("focus").focus(), e.$$("registeredDate").setValue(e.FormatDate(i.registered)), e.$$("visitedDate").setValue(e.FormatDate(i.visited)), e.$$("avatar").setValues(i)
            }))
        }, t.prototype.Save = function () {
            var e = this.$$("form");
            this.app.getService("operations").updateUser(this.ID, e.getValues())
        }, t.prototype.Delete = function () {
            var e = this, t = this.app.getService("locale")._;
            webix.confirm({
                title: t("Delete"),
                ok: t("Delete"),
                cancel: t("Cancel"),
                text: t("Are you sure to delete this user?")
            }).then((function () {
                e.app.getService("operations").deleteUser(e.ID), e.app.show("/top/users/_hidden")
            }))
        }, t.prototype.UpdateBadge = function (e) {
            var t = this.app.getService("locale")._, i = this.$$("status"), r = X(e, t);
            i.config.labelRight = r, i.refresh()
        }, t.prototype.UpdateAvatar = function (e) {
            var t = this;
            if ("client" === e.status && e.file) {
                var i = new FileReader;
                i.onload = function () {
                    t.SetLocalAvatar(i.result)
                }, i.readAsDataURL(e.file)
            } else if ("server" === e.status) {
                var r = e.value;
                this.$$("form").setValues({avatar: r}, !0), this.SetLocalAvatar(r)
            }
        }, t.prototype.SetLocalAvatar = function (e) {
            var t = this;
            this.$$("avatar").setValues({avatar: e}), this.app.getService("local").users().then((function (i) {
                i.updateItem(t.ID, {avatar: e})
            }))
        }, t.prototype.FormatDate = function (e) {
            return e && (e = ye(e), e = _e(e)), e || ""
        }, t.prototype.ShowCredentials = function () {
            var e = this;
            this.app.getService("backend").credentials(this.ID).then((function (t) {
                var i = t.length ? "credentials" : "no-credentials";
                e.credID = t.length ? t[0].id : null, e.$$("credentials").showBatch(i)
            }))
        }, t.prototype.AddCredentials = function () {
            var e = this, t = this.app.getService("locale")._;
            if (!this.CheckEmail()) return webix.alert({
                type: "alert-error",
                title: t("Error: no email"),
                text: t("Please submit an email first!")
            });
            var i = {user_id: this.ID, source: 1, record: "test"};
            this.app.getService("backend").addCredentials(this.ID, i).then((function (t) {
                t.id && (e.credID = t.id, e.$$("credentials").showBatch("credentials"))
            }))
        }, t.prototype.CheckEmail = function () {
            return this.app.getService("local").users(!0).getItem(this.ID).email
        }, t.prototype.ResetPassword = function () {
            this.ui(Se).Show(this.credID)
        }, t.prototype.DeleteCredentials = function () {
            var e = this, t = this.app.getService("locale")._;
            webix.confirm({
                title: t("Delete"),
                ok: t("Delete"),
                cancel: t("Cancel"),
                text: t("Are you sure to delete credentials?")
            }).then((function () {
                e.app.getService("backend").deleteCredentials(e.ID, e.credID).then((function (t) {
                    t.id && e.ShowCredentials()
                }))
            }))
        }, t
    }(h), Re = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var t = this.app.getService("locale")._, i = e.prototype.config.call(this);
            return webix.extend(i, {
                rowHeight: Math.max(webix.skin.$active.rowHeight + Math.round(.55 * webix.skin.$active.rowHeight), 40),
                headerRowHeight: webix.skin.$active.barHeight + 10
            }, !0), i.columns = [{
                id: "avatar",
                header: "",
                width: 70,
                css: "webix_um_center_column ",
                template: function (e) {
                    return Q(e, "webix_um_member_avatar webix_um_member_avatar_big")
                }
            }, {id: "name", header: t("Название"), fillspace: 2, sort: "string", template: J(this)}, {
                id: "status",
                header: t("Статус"),
                width: 150,
                template: function (e, i, r) {
                    return X(r, t)
                }
            }, {id: "email", header: t("ISBN"), fillspace: 2, sort: "string", template: J(this)}], i
        }, t.prototype.init = function () {
            var e = this.app.getService("local").users(!0);
            this.InitSelf(e, this.getParam("id", !0))
        }, t.prototype.ShowDetails = function (e) {
            this.getParentView().ShowDetails(e)
        }, t.prototype.SearchCompare = function (e, t) {
            return t.name.toLowerCase().indexOf(e) > -1 || t.email.toLowerCase().indexOf(e) > -1
        }, t
    }(ne), Ce = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var t = this, i = this.app.getService("locale")._, r = this.getParam("state"),
                n = e.prototype.config.call(this);
            return n.rows[0].cols.push({
                view: "toggle",
                width: 150,
                type: "icon",
                icon: "umi-matrix",
                label: this.app.config.roles ? i("Параметры") : i("Rule Matrix"),
                // on: {
                //     onChange: function (e) {
                //         return t.ToggleVisible(e, r)
                //     }
                //}
            }), n
        }, t.prototype.ToggleVisible = function (e, t) {
            t.mode = e ? "matrix" : "grid"
        }, t
    }(se), De = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this.app.getService("locale")._;
            return this.Compact = this.getParam("compact", !0), this.setParam("state", N({
                mode: "grid",
                name: e("Книги"),
                search: ""
            })), {
                margin: 10,
                padding: 10,
                css: "webix_um_tableview",
                cols: [{rows: [Ce, {$subview: !0, name: "center"}]}, {$subview: "_hidden", name: "default"}]
            }
        }, t.prototype.init = function () {
            var e = this;
            this.on(this.getParam("state").$changes, "mode", (function (t) {
                var i = "users." + t;
                "matrix" !== t || e.app.config.roles || (i = "users.rulematrix"), e.show(i, {target: "center"}), "matrix" === t && (e.setParam("id", null), e.show("./_hidden"))
            }))
        }, t.prototype.ShowDetails = function (e) {
            var t = this.getParam("id"), i = e.toString();
            this.getParam("compact", !0) || !t ? this.app.callEvent("details:item-click", ["users", i]) : t !== i && this.setParam("id", i, !0)
        }, t.prototype.HideEditor = function () {
            this.Compact ? this.show("../users/_hidden") : this.show("users.details")
        }, t
    }(h), Pe = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var t = this, i = e.prototype.config.call(this);
            return this.Sorting = {column: "", dir: ""}, webix.extend(i, {
                css: "webix_um_matrix",
                rowHeight: 56,
                headerRowHeight: 56,
                leftSplit: 1,
                select: !1,
                on: {
                    onItemClick: function (e) {
                        return t.Toggle(e)
                    }, onHeaderClick: function (e) {
                        return t.ToggleColumnSorting(e.column)
                    }
                }
            }, !0), this.GetRoleColumns().then((function (e) {
                return i.columns = n([{
                    id: "name",
                    header: "",
                    width: 220,
                    css: "webix_um_column_name",
                    sort: "string",
                    template: J(t)
                }], e), i
            }))
        }, t.prototype.init = function () {
            return this.GetData()
        }, t.prototype.GetData = function () {
            var e = this, t = this.app.getService("local");
            return Promise.all([t.roles(), t.users()]).then((function (t) {
                var i = e.CreateMatrix(t[0], t[1]);
                e.InitSelf(i)
            }))
        }, t.prototype.SearchCompare = function (e, t) {
            return t.name.toLowerCase().indexOf(e) > -1
        }, t.prototype.Save = function (e) {
            var t = this.app.getService("local").users(!0).getItem(e), i = this.$$("table").getItem(e);
            t.roles = [], this.app.getService("local").roles(!0).data.each((function (e) {
                i[e.id] && t.roles.push(e.id)
            })), this.app.getService("operations").updateUser(e, t)
        }, t.prototype.Toggle = function (e) {
            var t = this.$$("table").getItem(e), i = e.column;
            "name" != i && (t[i] = !t[i], t.selected = !t.selected, this.$$("table").updateItem(e, t), this.Save(e))
        }, t.prototype.GetRoleColumns = function () {
            return this.app.getService("local").roles().then((function (e) {
                var t = [];
                return e.data.each((function (e) {
                    t.push({
                        id: e.id,
                        header: {text: "<span>" + e.name + "</span>", css: "webix_um_center_column webix_um_names"},
                        minWidth: 100,
                        fillspace: 1,
                        css: "webix_um_center_column",
                        template: function (t) {
                            return t[e.id] ? he : pe
                        }
                    })
                })), t
            }))
        }, t.prototype.CreateMatrix = function (e, t) {
            var i = 0;
            return t.serialize().map((function (t) {
                var n = t.id, o = t.name, s = t.roles, a = {};
                return e.data.each((function (e) {
                    a[e.id] = !!s && s.indexOf(e.id) > -1
                })), r({id: n, name: o, $index: i++}, a)
            }))
        }, t.prototype.ToggleColumnSorting = function (e) {
            if ("name" != e) {
                var t = this.Sorting.column == e && "desc" == this.Sorting.dir ? "asc" : "desc";
                this.$$("table").sort({
                    by: e,
                    dir: t,
                    as: "string"
                }), this.$$("table").markSorting(e, t), this.Sorting.dir = t
            }
            this.Sorting.column = e
        }, t
    }(ne), Te = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return {
                type: "clean", rows: [{
                    rows: [{
                        view: "form",
                        rows: [{
                            rows: [{
                                view: "template",
                                localId: "title",
                                borderless: !0,
                                height: 30,
                                css: "webix_um_details_title",
                                template: "#name#",
                                data: {name: ""}
                            }, {
                                cols: [{
                                    view: "template",
                                    localId: "number",
                                    borderless: !0,
                                    css: "webix_um_details_title_description",
                                    template: function (e) {
                                        var i = e.roles ? e.roles.length : 0;
                                        return '<div class="webix_um_details_title_description">' + (i ? t("Roles assigned") + " (" + i + ")" : t("No roles")) + "</div>"
                                    },
                                    data: {name: ""}
                                }, {
                                    view: "toggle",
                                    localId: "toggle",
                                    offLabel: t("Modify"),
                                    onLabel: t("Done"),
                                    width: 160,
                                    on: {
                                        onChange: function (t) {
                                            return e.ToggleVisible(t)
                                        }
                                    }
                                }]
                            }]
                        }]
                    }, {
                        view: "datatable",
                        localId: "roles",
                        css: "webix_um_details_table",
                        rowHeight: webix.skin.$active.rowHeight + 10,
                        columns: [{
                            id: "selected", hidden: !0, header: "", width: 45, cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            }, template: function (e) {
                                return e.selected ? ue : ce
                            }
                        }, {
                            id: "name",
                            header: {
                                content: "textFilter", placeholder: t("Search"), prepare: function (e) {
                                    return e.toLowerCase()
                                }
                            },
                            fillspace: 2,
                            cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            },
                            template: function (e) {
                                return Z(e) + e.name
                            }
                        }],
                        on: {
                            onItemClick: function (t) {
                                return e.Toggle(1 * t.row)
                            }
                        }
                    }]
                }]
            }
        }, t.prototype.init = function () {
            this.$$("roles").registerFilter(this.$$("toggle"), {
                compare: function (e, t, i) {
                    return i.selected
                }
            }, {
                getValue: function (e) {
                    return !e.getValue() || ""
                }
            })
        }, t.prototype.urlChange = function () {
            this.GetData()
        }, t.prototype.GetData = function () {
            var e = this, t = this.app.getService("local"), i = this.getParam("id", !0);
            return this.ShowAll = !1, Promise.all([t.users(), t.roles()]).then((function (t) {
                e.User = webix.copy(t[0].getItem(i)), e.User.roles = e.User.roles || [];
                var r = t[1].serialize().map((function (t) {
                    var i = t.id, r = t.name;
                    return {id: i, color: t.color, name: r, selected: -1 !== e.User.roles.indexOf(i)}
                }));
                e.$$("roles").parse(r), e.$$("title").setValues(e.User), e.ShowNumber(), e.Filter()
            }))
        }, t.prototype.Save = function () {
            var e = this;
            this.User.roles = [], this.$$("roles").data.each((function (t) {
                t.selected && e.User.roles.push(t.id)
            }), this, !0), this.ShowNumber(), this.app.getService("operations").updateUser(this.User.id, this.User)
        }, t.prototype.ShowNumber = function () {
            this.$$("number").setValues(this.User)
        }, t.prototype.ToggleVisible = function () {
            this.ShowAll = !this.ShowAll, this.ShowAll ? this.$$("roles").showColumn("selected") : this.$$("roles").hideColumn("selected"), this.Filter()
        }, t.prototype.Toggle = function (e) {
            if (this.ShowAll) {
                var t = this.$$("roles").getItem(e);
                this.$$("roles").updateItem(e, {selected: !t.selected}), this.Save()
            }
        }, t.prototype.Filter = function () {
            this.$$("roles").filterByAll(), this.$$("roles").sort((function (e, t) {
                return e.selected == t.selected ? e.name > t.name ? 1 : -1 : e.selected ? -1 : 1
            }))
        }, t
    }(h), Ae = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var t = this;
            this.Sorting = {column: "", dir: ""};
            var i = e.prototype.config.call(this);
            return webix.extend(i, {
                css: "webix_um_matrix",
                headerRowHeight: 56,
                rowHeight: 62,
                rowLineHeight: 29,
                leftSplit: 1,
                select: !1,
                on: {
                    onItemClick: function (e) {
                        return t.Toggle(e)
                    }, onHeaderClick: function (e) {
                        return t.ToggleColumnSorting(e.column)
                    }
                }
            }, !0), this.GetUserColumns().then((function (e) {
                return i.columns = n([{
                    id: "short",
                    header: "",
                    width: 220,
                    css: "webix_um_column_name",
                    sort: "string",
                    template: Y(t)
                }], e), i
            }))
        }, t.prototype.init = function () {
            return this.GetData()
        }, t.prototype.GetData = function () {
            var e = this, t = this.app.getService("local");
            return Promise.all([t.users(), t.rules()]).then((function (t) {
                var i = e.CreateMatrix(t[0], t[1]);
                e.InitSelf(i)
            }))
        }, t.prototype.SearchCompare = function (e, t) {
            return t.short.toLowerCase().indexOf(e) > -1 || t.long.toLowerCase().indexOf(e) > -1
        }, t.prototype.Save = function (e) {
            var t = e.column, i = this.app.getService("local").users(!0).getItem(t);
            i.rules = [], this.$$("table").data.each((function (e) {
                e[t] && i.rules.push(e.id)
            })), this.app.getService("operations").updateUser(t, i)
        }, t.prototype.Toggle = function (e) {
            var t = this.$$("table").getItem(e), i = e.column;
            "short" !== i && (t[i] = !t[i], t.selected = !t.selected, this.$$("table").updateItem(e, t), this.Save(e))
        }, t.prototype.GetUserColumns = function () {
            return this.app.getService("local").users().then((function (e) {
                var t = [];
                return e.data.each((function (e) {
                    t.push({
                        id: e.id,
                        header: {text: "<span>" + e.name + "</span>", css: "webix_um_center_column webix_um_names"},
                        minWidth: 100,
                        fillspace: 1,
                        css: "webix_um_center_column",
                        template: function (t) {
                            return t[e.id] ? he : pe
                        }
                    })
                })), t
            }))
        }, t.prototype.CreateMatrix = function (e, t) {
            return t.serialize().map((function (t) {
                var i = t.id, n = t.short, o = t.long, s = {};
                return e.data.each((function (e) {
                    s[e.id] = !!e.rules && e.rules.indexOf(i) > -1
                })), r({id: i, short: n, long: o}, s)
            }))
        }, t.prototype.ToggleColumnSorting = function (e) {
            if ("short" !== e) {
                var t = this.Sorting.column == e && "desc" == this.Sorting.dir ? "asc" : "desc";
                this.$$("table").sort({
                    by: e,
                    dir: t,
                    as: "string"
                }), this.$$("table").markSorting(e, t), this.Sorting.dir = t
            }
            this.Sorting.column = e
        }, t
    }(ne);
    var Ue = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }

        return i(t, e), t.prototype.config = function () {
            var e = this, t = this.app.getService("locale")._;
            return this.WithRoles = this.app.config.roles, this.State = "direct", this.Options = [{
                id: "direct",
                value: t("Assigned directly")
            }, {id: "all", value: t("All assignments")}], {
                type: "clean", rows: [{
                    rows: [{
                        view: "form",
                        rows: [{
                            rows: [{
                                view: "template",
                                localId: "title",
                                borderless: !0,
                                height: 30,
                                css: "webix_um_details_title",
                                template: "#name#",
                                data: {name: ""}
                            }, {
                                cols: [{
                                    view: "radio",
                                    localId: "radio",
                                    value: this.State,
                                    vertical: !0,
                                    options: this.Options,
                                    on: {
                                        onChange: function (t) {
                                            return e.ToggleTable(t)
                                        }
                                    },
                                    hidden: !this.WithRoles
                                }, {
                                    view: "template",
                                    localId: "number",
                                    height: 38,
                                    borderless: !0,
                                    css: "webix_um_details_title_description",
                                    template: function (e) {
                                        var i = e.rules ? e.rules.length : 0;
                                        return '<div class="webix_um_details_title_description">' + (i ? t("Rules assigned") + " (" + i + ")" : t("No rules")) + "</div>"
                                    },
                                    data: {name: ""},
                                    hidden: this.WithRoles
                                }, {
                                    rows: [{
                                        view: "toggle",
                                        localId: "toggle",
                                        offLabel: t("Modify"),
                                        onLabel: t("Done"),
                                        width: 160,
                                        on: {
                                            onChange: function (t) {
                                                return e.ToggleVisible(t)
                                            }
                                        }
                                    }, {}]
                                }]
                            }]
                        }]
                    }, {
                        view: "datatable",
                        localId: "rules",
                        rowHeight: webix.skin.$active.rowHeight > 30 ? 60 : 52,
                        rowLineHeight: webix.skin.$active.rowHeight > 30 ? 28 : 26,
                        css: "webix_um_details_table webix_um_details_table_rules",
                        fixedRowHeight: !1,
                        columns: [{
                            id: "selected",
                            hidden: !0,
                            header: "",
                            width: 45,
                            css: "webix_um_checkbox_column",
                            cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            },
                            template: function (e) {
                                return e.selected ? ue : ce
                            }
                        }, {
                            id: "name",
                            header: {
                                contentId: "filter",
                                content: "textFilter",
                                compare: this.GetCompare(),
                                prepare: function (e) {
                                    return e.toLowerCase()
                                },
                                placeholder: t("Search")
                            },
                            fillspace: 2,
                            cssFormat: function (e, t) {
                                return t.selected ? "webix_um_row_select" : ""
                            },
                            template: function (t) {
                                return "direct" === e.State ? t.short + "<div class='webix_um_details_row'>" + t.long + "</div>" : "<div class='webix_um_assignments_description'><div><span class=\"webix_um_assignments_rule_name\">" + t.short + "</span>: " + t.long + "</div>" + (i = t.source, r = "<ul class='webix_um_roleslist'>", i.forEach((function (e) {
                                    e.direct ? r += "<li class='webix_um_roleslist_item webix_um_roleslist_item_direct'>" : (r += "<li class='webix_um_roleslist_item' data-id='" + e.id + "'>", r += "<span class='webix_um_roleslist_item_marker webix_icon umi-roles' style='color: " + (e.color ? e.color : "") + "'></span>"), r += e.name + "</li>"
                                })), r += "</ul>") + "</div>";
                                var i, r
                            }
                        }],
                        on: {
                            onItemClick: function (t) {
                                return e.Toggle(1 * t.row)
                            }, onResize: function () {
                                this.adjustRowHeight("name")
                            }
                        },
                        onClick: {
                            webix_um_roleslist_item: function (t) {
                                var i = webix.html.locate(t, "data-id");
                                e.app.callEvent("details:item-click", ["roles", i])
                            }
                        }
                    }]
                }]
            }
        }, t.prototype.init = function () {
            var e = this;
            this.$$("rules").registerFilter(this.$$("toggle"), {
                compare: function (e, t, i) {
                    return i.selected
                }
            }, {
                getValue: function (t) {
                    return !t.getValue() && "direct" === e.State || ""
                }
            })
        }, t.prototype.urlChange = function () {
            this.ID = this.getParam("id", !0), this.User = null, this.ShowAll = !1, "direct" === this.State ? this.ShowDirectRules() : this.ShowAllAssignments()
        }, t.prototype.ToggleTable = function (e) {
            this.State = e, this.$$("rules").clearAll(), this.$$("rules").getHeaderContent("filter").setValue(""), "direct" === e ? (this.ShowDirectRules(), this.$$("toggle").enable()) : (this.ShowAll && this.$$("toggle").setValue(!1), this.ShowAllAssignments(), this.$$("toggle").disable())
        }, t.prototype.SetUser = function (e, t) {
            this.User || (this.User = webix.copy(e), this.$$("title").setValues(this.User), this.User.rules = this.User.rules || [], this.User.RulesRoles = this.GetRulesRoles(t))
        }, t.prototype.ShowDirectRules = function () {
            var e = this, t = this.app.getService("local");
            Promise.all([t.users(), t.rules(), t.roles()]).then((function (t) {
                e.SetUser(t[0].getItem(e.ID), t[2]);
                var i = t[1].serialize().map((function (t) {
                    var i = t.id;
                    return {id: i, short: t.short, long: t.long, selected: -1 !== e.User.rules.indexOf(i)}
                }));
                e.$$("rules").parse(i), e.ShowNumber(), e.Filter()
            }))
        }, t.prototype.ShowAllAssignments = function () {
            var e = this, t = this.app.getService("locale")._, i = this.app.getService("local");
            Promise.all([i.users(), i.rules(), i.roles()]).then((function (i) {
                e.SetUser(i[0].getItem(e.ID), i[2]);
                var n = e.GetAllAssignedRules(), o = [];
                n.forEach((function (n) {
                    var s = i[1].getItem(n), a = [];
                    e.User.rules.indexOf(n) > -1 && a.push({
                        name: t("Assigned directly"),
                        direct: !0
                    }), e.User.RulesRoles[n] && e.User.RulesRoles[n].forEach((function (e) {
                        var t = i[2].getItem(e);
                        a.push({id: t.id, name: t.name, color: t.color})
                    })), o.push(r(r({}, s), {source: a}))
                })), e.$$("rules").parse(o), e.$$("rules").adjustRowHeight("name")
            }))
        }, t.prototype.Save = function () {
            var e = this;
            this.User.rules = [], this.$$("rules").data.each((function (t) {
                t.selected && e.User.rules.push(t.id)
            }), this, !0), this.ShowNumber(), this.app.getService("operations").updateUser(this.User.id, this.User)
        }, t.prototype.ShowNumber = function () {
            if (this.WithRoles) {
                var e = this.$$("radio").config.options;
                e[0].value = this.Options[0].value + " (" + this.User.rules.length + ")", e[1].value = this.Options[1].value + " (" + this.GetAllAssignedRules().length + ")", this.$$("radio").refresh()
            } else this.$$("number").setValues(this.User)
        }, t.prototype.GetAllAssignedRules = function () {
            var e = n(this.User.rules), t = this.User.RulesRoles;
            for (var i in t) e.indexOf(i) < 0 && e.push(1 * i);
            return e
        }, t.prototype.GetRulesRoles = function (e) {
            var t = {};
            return (this.User.roles || []).forEach((function (i) {
                var r = e.getItem(i);
                r && (r.rules || []).forEach((function (e) {
                    t[e] ? t[e].push(i) : t[e] = [i]
                }))
            })), t
        }, t.prototype.ToggleVisible = function () {
            this.ShowAll = !this.ShowAll, this.ShowAll ? this.$$("rules").showColumn("selected") : this.$$("rules").hideColumn("selected"), this.Filter()
        }, t.prototype.Toggle = function (e) {
            if (this.ShowAll && "direct" === this.State) {
                var t = this.$$("rules").getItem(e);
                this.$$("rules").updateItem(e, {selected: !t.selected}), this.Save()
            }
        }, t.prototype.Filter = function () {
            this.$$("rules").filterByAll(), this.$$("rules").sort((function (e, t) {
                return e.selected == t.selected ? e.short > t.short ? 1 : -1 : e.selected ? -1 : 1
            }))
        }, t.prototype.GetCompare = function () {
            return function (e, t, i) {
                return i.short.toLowerCase().indexOf(t) > -1 || i.long.toLowerCase().indexOf(t) > -1
            }
        }, t
    }(h), Ee = {JetView: h};
    Ee._hidden = j, Ee.addmenu = W, Ee["compact/sidemenu"] = z, Ee["roles/details"] = ee, Ee["roles/editor"] = te, Ee["roles/form"] = re, Ee["roles/grid"] = oe, Ee.roles = le, Ee["roles/matrix"] = de, Ee["roles/members"] = fe, Ee["roles/rules"] = me, Ee["roles/toolbar"] = ae, Ee["rules/details"] = ge, Ee.rules = ve, Ee["sections/toolbar"] = se, Ee["sections/view"] = ne, Ee.sidebar = B, Ee.top = be, Ee.topbar = we, Ee["users/audit"] = xe, Ee["users/credentials"] = Se, Ee["users/details"] = $e, Ee["users/editor"] = ke, Ee["users/form"] = Ie, Ee["users/grid"] = Re, Ee.users = De, Ee["users/matrix"] = Pe, Ee["users/roles"] = Te, Ee["users/rulematrix"] = Ae, Ee["users/rules"] = Ue, Ee["users/toolbar"] = Ce;
    var Ve = function () {
        function e(e, t) {
            this._url = t
        }

        return e.prototype.get = function (e) {
            return webix.ajax(this._url + e).then((function (e) {
                return e.json()
            }))
        }, e.prototype.save = function (e, t, i) {
            var r = webix.ajax().headers({"Content-type": "application/json"});
            return 0 == i && (r = r.post(this._url + e, t)), 1 == i && (r = r.del(this._url + e, t)), 2 == i && (r = r.put(this._url + e, t)), r.then((function (e) {
                return e.json()
            }))
        }, e.prototype.users = function () {
            return this.get("users")
        }, e.prototype.addUser = function (e) {
            return this.save("users", e, 0)
        }, e.prototype.deleteUser = function (e) {
            return this.save("users/" + e, {}, 1)
        }, e.prototype.updateUser = function (e, t) {
            return this.save("users/" + e, t, 2)
        }, e.prototype.roles = function () {
            return this.get("roles")
        }, e.prototype.addRole = function (e) {
            return this.save("roles", e, 0)
        }, e.prototype.deleteRole = function (e) {
            return this.save("roles/" + e, {}, 1)
        }, e.prototype.updateRole = function (e, t) {
            return this.save("roles/" + e, t, 2)
        }, e.prototype.rules = function () {
            return this.get("rules")
        }, e.prototype.meta = function () {
            return this.get("meta")
        }, e.prototype.avatar = function (e) {
            return this._url + "users/" + e + "/avatar"
        }, e.prototype.credentials = function (e) {
            return this.get("user/" + e + "/credentials")
        }, e.prototype.addCredentials = function (e, t) {
            return this.save("user/" + e + "/credentials", t, 0)
        }, e.prototype.resetPassword = function (e, t) {
            return this.save("user/" + e + "/credentials", t, 2)
        }, e.prototype.deleteCredentials = function (e, t) {
            return this.save("user/" + e + "/credentials/" + t, {}, 1)
        }, e.prototype.logs = function (e, t) {
            return this.get("logs/" + e + "/" + t)
        }, e.prototype.logsMeta = function () {
            return this.get("logs/meta")
        }, e
    }(), Me = function () {
        function e(e) {
            this._back = e.getService("backend"), this._data = new Map
        }

        return e.prototype.rules = function (e) {
            var t = this;
            return Le(this._data, 1, (function () {
                return t._back.rules()
            }), e)
        }, e.prototype.users = function (e) {
            var t = this, i = this.meta();
            return Le(this._data, 2, (function () {
                return t._back.users()
            }), e, (function (e) {
                return i.then((function (t) {
                    return t.UserRule.forEach((function (t) {
                        var i = e.getItem(t[0]);
                        i && (i.rules || (i.rules = []), i.rules.push(t[1]))
                    })), t.UserRole.forEach((function (t) {
                        var i = e.getItem(t[0]);
                        i && (i.roles || (i.roles = []), i.roles.push(t[1]))
                    })), e
                }))
            }))
        }, e.prototype.roles = function (e) {
            var t = this, i = this.meta();
            return Le(this._data, 3, (function () {
                return t._back.roles()
            }), e, (function (e) {
                return i.then((function (t) {
                    return t.RoleRule.forEach((function (t) {
                        var i = e.getItem(t[0]);
                        i && (i.rules || (i.rules = []), i.rules.push(t[1]))
                    })), e
                }))
            }))
        }, e.prototype.meta = function (e) {
            var t = this;
            return He(this._data, 4, (function () {
                return t._back.meta()
            }), e)
        }, e.prototype.logsMeta = function (e) {
            var t = this;
            return He(this._data, 5, (function () {
                return t._back.logsMeta()
            }), e)
        }, e
    }();

    function Le(e, t, i, r, n) {
        if (!e.has(t)) {
            var o = {
                promise: i().then((function (e) {
                    return o.obj.parse(e), o.obj
                })), obj: new webix.DataCollection({})
            };
            n && (o.promise = o.promise.then(n)), e.set(t, o)
        }
        var s = e.get(t);
        return r ? s.obj : s.promise
    }

    function He(e, t, i, r) {
        if (!e.has(t)) {
            var n = {
                promise: i().then((function (e) {
                    return n.obj = e
                })), obj: null
            };
            e.set(t, n)
        }
        var o = e.get(t);
        return r ? o.obj : o.promise
    }

    var Ge = function () {
        function e(e) {
            this._back = e.getService("backend"), this._local = e.getService("local"), this._app = e
        }

        return e.prototype.progressStart = function () {
            this._app.getService("progress").start()
        }, e.prototype.progressEnd = function () {
            this._app.getService("progress").end()
        }, e.prototype.addRole = function (e) {
            var t = this;
            return this.progressStart(), Promise.all([this._back.addRole(e), this._local.roles()]).then((function (i) {
                return t.progressEnd(), e.id = i[0].id, i[1].add(e), e
            }))
        }, e.prototype.addUser = function (e) {
            var t = this;
            return this.progressStart(), Promise.all([this._back.addUser(e), this._local.users()]).then((function (i) {
                return t.progressEnd(), e.id = i[0].id, i[1].add(e), e
            }))
        }, e.prototype.updateUser = function (e, t) {
            var i = this;
            return this.progressStart(), Promise.all([this._back.updateUser(e, t), this._local.users()]).then((function (r) {
                return i.progressEnd(), r[1].updateItem(e, t), t
            }))
        }, e.prototype.deleteUser = function (e) {
            var t = this;
            return this.progressStart(), Promise.all([this._back.deleteUser(e), this._local.users()]).then((function (i) {
                return t.progressEnd(), i[1].remove(e), e
            }))
        }, e.prototype.updateRole = function (e, t) {
            var i = this;
            return this.progressStart(), Promise.all([this._back.updateRole(e, t), this._local.roles()]).then((function (r) {
                return i.progressEnd(), r[1].updateItem(e, t), t
            }))
        }, e.prototype.deleteRole = function (e) {
            var t = this;
            return this.progressStart(), Promise.all([this._back.deleteRole(e), this._local.roles()]).then((function (i) {
                return t.progressEnd(), i[1].remove(e), e
            }))
        }, e
    }(), Oe = function () {
        function e() {
            this.view = null
        }

        return e.prototype.handle = function (e) {
            this.view = e
        }, e.prototype.start = function () {
            var e = this, t = this.view;
            t && !t.$destructed && (t.showBatch("saving"), this._progressDelay && clearTimeout(this._progressDelay), this._progressDelay = window.setTimeout((function () {
                t && !t.$destructed && e.end()
            }), 3e3))
        }, e.prototype.end = function () {
            var e = this.view;
            e && !e.$destructed && (e.showBatch("saved"), this._progressDelay && clearTimeout(this._progressDelay), this._hideDelay && clearTimeout(this._hideDelay), this._hideDelay = window.setTimeout((function () {
                e && !e.$destructed && e.showBatch("def")
            }), 3e3))
        }, e
    }(), Ne = function () {
        function e(e) {
            this.view = null, this.result = null, this._app = e
        }

        return e.prototype.close = function () {
            this.view.close(), this.view = null
        }, e.prototype.config = function (e) {
            var t = this, i = this._app.getService("locale")._;
            return {
                view: "window",
                modal: !0,
                move: !0,
                width: 350,
                css: "webix_um_prompt",
                head: {
                    view: "toolbar",
                    padding: {
                        left: webix.skin.$active.layoutPadding.form,
                        right: webix.skin.$active.layoutPadding.form - 5
                    },
                    borderless: !0,
                    cols: [{view: "label", label: e}, {
                        view: "icon",
                        icon: "wxi-close",
                        hotkey: "esc",
                        click: function () {
                            t.result.reject("prompt cancelled"), t.close()
                        }
                    }]
                },
                position: "center",
                body: {
                    view: "form",
                    padding: {
                        top: webix.skin.$active.layoutPadding.form / 2,
                        bottom: webix.skin.$active.layoutPadding.form
                    },
                    cols: [{view: "text", name: "name", value: ""}, {
                        view: "button",
                        value: i("Сохранить"),
                        css: "webix_primary",
                        width: 100,
                        hotkey: "enter",
                        click: function () {
                            var e = t.view.getBody();
                            if (e.validate()) {
                                var i = e.getValues().name;
                                t.result.resolve(i), t.close()
                            } else webix.UIManager.setFocus(e)
                        }
                    }]
                },
                on: {
                    onShow: function () {
                        this.getBody().elements.name.getInputNode().focus()
                    }
                }
            }
        }, e.prototype.show = function (e) {
            var t = this;
            return this.result = new webix.promise.defer, this.view = webix.ui(this.config(e)), webix.delay((function () {
                return t.view.show()
            })), this.result
        }, e
    }(), Fe = function (e) {
        function t(t) {
            var i = this, n = {state: N({})};
            t.compact && (n.forceCompact = t.compact);
            var o = {
                router: _,
                version: "7.3.6",
                debug: !0,
                start: "/top/users",
                roles: !0,
                compactWidth: 1e3,
                params: n
            }, s = function (e) {
                return i.config.override && i.config.override.get(e) || e
            };
            return (i = e.call(this, r(r({}, o), t)) || this).setService("backend", new (s(Ve))(i, i.config.url)), i.setService("progress", new (s(Oe))), i.setService("local", new (s(Me))(i)), i.setService("operations", new (s(Ge))(i)), i.setService("prompt", new (s(Ne))(i)), i.use(L, i.config.locale || {
                lang: "en",
                webix: {en: "en-US"}
            }), i
        }

        return i(t, e), t.prototype.require = function (e, t) {
            return "jet-views" === e ? Ee[t] : "jet-locales" === e ? We[t] : null
        }, t.prototype.getState = function () {
            return this.config.params.state
        }, t
    }(b);
    webix.protoUI({
        name: "Библиотека", app: Fe, getState: function () {
            return this.$app.getState()
        }, getService: function (e) {
            return this.$app.getService(e)
        }, $init: function () {
            var e = this.$app.getState();
            for (var t in e) O(e, this.config, t)
        }
    }, webix.ui.jetapp);
    var je = {Backend: Ve, Local: Me, Operations: Ge, Progress: Oe, Prompt: Ne}, We = {
        en: {
            Active: "Active",
            "Add credentials": "Add credentials",
            "Are you sure to delete credentials?": "Are you sure to delete credentials?",
            "Add new user": "Add new user",
            "Are you sure to delete this user?": "Are you sure to delete this user?",
            Audit: "Audit",
            Avatar: "Avatar",
            Cancel: "Cancel",
            "changes by": "changes by",
            "changes to": "changes to",
            Color: "Color",
            Credentials: "Credentials",
            Delete: "Delete",
            Deleted: "Deleted",
            "Delete credentials": "Delete credentials",
            Details: "Details",
            Done: "Done",
            "Enter password": "Enter password",
            "Enter user name": "Enter user name",
            "Error: no email": "Error: no email",
            "Full Name": "Full Name",
            General: "General",
            "Generate password": "Generate password",
            Description: "Description",
            Email: "Email",
            "Last visited": "Last visited",
            logins: "logins",
            Members: "Members",
            "Members assigned": "Members assigned",
            Modify: "Modify",
            Name: "Name",
            New: "New",
            "New password": "New password",
            "Not active": "Not active",
            "No members": "No members assigned",
            "No rules": "No rules assigned",
            Operation: "Operation",
            "Please submit an email first!": "Please submit an email first!",
            Registered: "Registered",
            "Reset password": "Reset password",
            Rules: "Rules",
            "Rules assigned": "Rules assigned",
            "Rule Matrix": "Rule Matrix",
            Save: "Save",
            Search: "Search",
            Status: "Status",
            Target: "Target",
            Unknown: "Unknown",
            "Unknown user": "Unknown user",
            "Upload new photo": "Upload new photo",
            "User Manager": "User Manager",
            Users: "Users",
            When: "When",
            Who: "Who",
            "Add new role": "Add new role",
            "All assignments": "All assignments",
            "Are you sure to delete this role ?": "Are you sure to delete this role?",
            "Assigned directly": "Assigned directly",
            "Enter role name": "Enter role name",
            "No roles": "No roles assigned",
            Role: "Role",
            Roles: "Roles",
            "Roles assigned": "Roles assigned",
            "Role Matrix": "Role Matrix"
        }
    };
    e.App = Fe, e.locales = We, e.services = je, e.views = Ee, Object.defineProperty(e, "__esModule", {value: !0})
}));

