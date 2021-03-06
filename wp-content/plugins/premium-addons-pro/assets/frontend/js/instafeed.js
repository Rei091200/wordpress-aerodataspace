(function () {
    var t, e;
    t = function () {
        function t(t, e) {
            var o, i;
            if (this.options = {
                    target: "instafeed",
                    get: "popular",
                    resolution: "thumbnail",
                    sortBy: "none",
                    links: !0,
                    mock: !1,
                    useHttp: !1,
                    afterLoad: null
                }, "object" == typeof t)
                for (o in t) i = t[o], this.options[o] = i;
            this.context = null != e ? e : this, this.unique = this._genKey()
        }
        return t.prototype.hasNext = function () {
            return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0
        }, t.prototype.next = function () {
            return !!this.hasNext() && this.run(this.context.nextUrl)
        }, t.prototype.run = function (e) {
            var o, i;
            if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
            if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
            return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && ((i = document.createElement("script")).id = "instafeed-fetcher", i.src = e || this._buildUrl(), document.getElementsByTagName("head")[0].appendChild(i), o = "instafeedCache" + this.unique, window[o] = new t(this.options, this), window[o].unique = this.unique), !0
        }, t.prototype.parse = function (t) {
            var e, o, i, n, r, s, a, p, l, h, c, u, f, d, m, g, y, w, k, b, _, E, x, I, N, v, B, O;
            if ("object" != typeof t) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (200 !== t.meta.code) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
                throw new Error("Error from Instagram: " + t.meta.error_message)
            }
            if (0 === t.data.length) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), this.context.nextUrl = "", null != t.pagination && (this.context.nextUrl = t.pagination.next_url), "none" !== this.options.sortBy) switch (N = "least" === (v = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"))[0], v[1]) {
                case "random":
                    t.data.sort(function () {
                        return .5 - Math.random()
                    });
                    break;
                case "recent":
                    t.data = this._sortBy(t.data, "created_time", N);
                    break;
                case "liked":
                    t.data = this._sortBy(t.data, "likes.count", N);
                    break;
                case "commented":
                    t.data = this._sortBy(t.data, "comments.count", N);
                    break;
                default:
                    throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
            }
            if ("undefined" != typeof document && null !== document && !1 === this.options.mock) {
                if (u = t.data, I = parseInt(this.options.limit, 10), null != this.options.limit && u.length > I && (u = u.slice(0, I)), s = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (u = this._filter(u, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                    for (a = "", O = document.createElement("div"), p = 0, b = u.length; p < b; p++) {
                        if ("object" != typeof (h = (l = u[p]).images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                        var j = [!0];
                        "" !== this.options.tagName && this.options.tagName.forEach(function (t, e) {
                            -1 === l.tags.indexOf(t) ? j[e] = !1 : j[e] = !0
                        }), -1 !== j.indexOf(!0) && (m = "square", (g = h.width) > (d = h.height) && (m = "landscape"), g < d && (m = "portrait"), c = h.url, window.location.protocol.indexOf("http") >= 0 && !this.options.useHttp && (c = c.replace(/https?:\/\//, "//")), a += this._makeTemplate(this.options.template, {
                            model: l,
                            id: l.id,
                            link: l.link,
                            type: l.type,
                            image: c,
                            width: g,
                            height: d,
                            orientation: m,
                            caption: this._getObjectProperty(l, "caption.text"),
                            likes: l.likes.count,
                            comments: l.comments.count,
                            location: this._getObjectProperty(l, "location.name")
                        }))
                    }
                    for (this.options.afterLoad(), O.innerHTML = a, n = [], i = 0, o = O.childNodes.length; i < o;) n.push(O.childNodes[i]), i += 1;
                    for (w = 0, _ = n.length; w < _; w++) x = n[w], s.appendChild(x)
                } else
                    for (k = 0, E = u.length; k < E; k++) {
                        if (l = u[k], f = document.createElement("img"), "object" != typeof (h = l.images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                        c = h.url, window.location.protocol.indexOf("http") >= 0 && !this.options.useHttp && (c = c.replace(/https?:\/\//, "//")), f.src = c, !0 === this.options.links ? ((e = document.createElement("a")).href = l.link, e.appendChild(f), s.appendChild(e)) : s.appendChild(f)
                    }
                if ("string" == typeof (B = this.options.target) && (B = document.getElementById(B)), null == B) throw r = 'No element with id="' + this.options.target + '" on page.', new Error(r);
                B.appendChild(s), document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")), y = "instafeedCache" + this.unique, window[y] = void 0;
                try {
                    delete window[y]
                } catch (t) {}
            }
            return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
        }, t.prototype._buildUrl = function () {
            var t, e;
            switch (this.options.get) {
                case "popular":
                    t = "media/popular";
                    break;
                case "tagged":
                    if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case "location":
                    if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case "user":
                    if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                    t = "users/self/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return e = "https://api.instagram.com/v1/" + t, null != this.options.accessToken ? e += "?access_token=" + this.options.accessToken : e += "?client_id=" + this.options.clientId, null != this.options.limit && (e += "&count=" + this.options.limit), e + "&callback=instafeedCache" + this.unique + ".parse"
        }, t.prototype._genKey = function () {
            var t;
            return "" + (t = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            })() + t() + t() + t()
        }, t.prototype._makeTemplate = function (t, e) {
            var o, i, n, r, s;
            for (i = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, o = t; i.test(o);) r = o.match(i)[1], s = null != (n = this._getObjectProperty(e, r)) ? n : "", o = o.replace(i, function () {
                return "" + s
            });
            return o
        }, t.prototype._getObjectProperty = function (t, e) {
            var o, i;
            for (i = (e = e.replace(/\[(\w+)\]/g, ".$1")).split("."); i.length;) {
                if (o = i.shift(), !(null != t && o in t)) return null;
                t = t[o]
            }
            return t
        }, t.prototype._sortBy = function (t, e, o) {
            var i;
            return i = function (t, i) {
                var n, r;
                return n = this._getObjectProperty(t, e), r = this._getObjectProperty(i, e), o ? n > r ? 1 : -1 : n < r ? 1 : -1
            }, t.sort(i.bind(this)), t
        }, t.prototype._filter = function (t, e) {
            var o, i, n, r;
            for (o = [], i = function (t) {
                    if (e(t)) return o.push(t)
                }, n = 0, r = t.length; n < r; n++) i(t[n]);
            return o
        }, t
    }(), e = function () {
        return t
    }, "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : this.Instafeed = e()
}).call(this);