(use joy)

(use ./src/pages/home)
(use ./src/pages/vivi)

(import ./src/tpl)

# Middleware
(def app (-> (handler)
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
