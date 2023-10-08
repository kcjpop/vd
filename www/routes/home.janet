(use joy)

(route :get "/" :pages/home)

(defn pages/home
  [req]
  [[:h1 "tudien.io"]
   [:h2 "Từ điển tiếng Việt mới keng xà beng"]
   [:p ["Hiện chỉ đang có " [:a {:href "/vi-vi"} "tiếng Việt"] " thôi."]]])
