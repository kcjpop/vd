## www

The main website tudien.io written in [janet](https://janet-lang.org).

### Install and run

Make sure to have `janet` and `jpm` installed.

- Run this to install `joy`, the web framework.

```sh
$ jpm install joy
```

Maybe we need to update PATH for `joy` to be available. In MacOS + fish terminal:

```sh
$ fish_add_path /usr/local/Cellar/janet/1.31.0/bin
```

- Then start the server:

```sh
$ joy server
```

### Deployment

There is one `fly.toml` and `Dockerfile` included to deploy the app to Fly.io.

```sh
$ fly deploy
```

### Layouts

Layouts are functions defined in `src/tpl.janet` (for now). We have:

- `tpl/base`: Bare template without any fuss.
- `tpl/with-main`: A `<main>` tag is right inside `<body>`

To use in a route:

```janet
# We define a route and its handler
(route :get "/" :pages/home)

# The handler being wrapped by `layout` middleware from `joy`
(def pages/home
  (layout home-handler tpl/with-main))

# The actual handler that returns HTML data
# This has to be defined before `pages/home` otherwise we'll get "undefined
# symbol" error, but for clarity it's here.
(defn- home-handler
  [req]
  [[:h1 "tudien.io"]
   [:h2 "Từ điển tiếng Việt mới keng xà beng"]
   [:p ["Hiện chỉ đang có " [:a {:href "/vi-vi"} "tiếng Việt"] " thôi."]]])
```
