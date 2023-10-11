(use joy)

(import ../tpl)

# Handlers

(defn- home-handler
  [req]
  [[:h1 "Từ điển tiếng Việt mới keng xà beng"]
   [:p ["Hiện chỉ đang có " [:a {:href "/vi-vi"} "Việt - Việt"] " thôi."]]
   [:h2 "Tại sao?"]
   [:p "Vì hầu hết từ điển trên mạng đã lâu rồi không có cập nhật đó."]])

# Routes

(route :get "/" :pages/home)

(def pages/home
  (layout home-handler tpl/with-main))
