(use joy)

(import ../tpl)

# Handlers

(defn- home-handler
  [req]
  [[:h1 "Từ điển tiếng Việt mới keng xà beng"]
   [:p ["Hiện chỉ đang có " [:a {:href "/vi-vi"} "tiếng Việt"] " thôi."]]])

# Routes

(route :get "/" :pages/home)

(def pages/home
  (layout home-handler tpl/with-main))
