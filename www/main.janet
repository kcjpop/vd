(use joy)

(use ./routes/home)
(use ./vi-vi/main)

# Layout
(defn app-layout [{:body body :head head :request request}]
  (text/html
    (doctype :html5)
    [:html {:lang "vi-VN"}
     [:head
      [:title "tudien.io - Từ điển thế hệ mới keng xà beng"]
      [:meta {:charset "utf-8"}]
      [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
      [:meta {:name "csrf-token" :content (csrf-token-value request)}]
      [:link {:href "/styles/main.css" :rel "stylesheet"}]
      [:script {:src "/app.js" :defer ""}]
      head]
     [:body body]]))

# Middleware
(def app (-> (handler)
             (layout app-layout)
             (with-csrf-token)
             (with-session)
             (extra-methods)
             (query-string)
             (body-parser)
             (json-body-parser)
             (server-error)
             (x-headers)
             (static-files)
             (not-found)
             (logger)))

# Server
(defn main [& args]
  (let [port (get args 1 (os/getenv "PORT" "9001"))
        host (get args 2 (os/getenv "HOST" "127.0.0.1"))]
    (print "Server is running at " host ":" port)
    (db/connect "./db/vi-vi.db")
    (server app port host)))
