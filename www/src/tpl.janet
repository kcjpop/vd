(use joy)

# Layout
(defn base [{:body body :request request}]
  (text/html
    (doctype :html5)
    [:html {:lang "vi-VN"}
     [:head
      [:title "tudien.io - Từ điển thế hệ mới keng xà beng"]
      [:meta {:charset "utf-8"}]
      [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
      [:meta {:name "csrf-token" :content (csrf-token-value request)}]
      [:link {:href "/styles/main.css" :rel "stylesheet"}]
      [:script {:src "/app.js" :defer ""}]]
     [:body body]]))

(def- header
  [:header {:class "header"}
   [:a {:href "/" :class "logo"} "tudien.io"]
   [:search {:role "search" :class "search"}
    [:form {:action "/vi-vi/search" :id "js-nav-search"}
     [:input {:type "search" :name "keyword" :class "input" :placeholder "Tìm kiếm…"}]]]])

(defn with-main
  "A layout with <main> in its body"
  [{:body outlet :request request}]
  (let [body [header
              [:main {:class "container p-2"} outlet]]]
    (base @{:body body
            :request request})))
