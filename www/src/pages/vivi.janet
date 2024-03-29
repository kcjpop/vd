(use joy)

(import uri)
(import ../tpl)
(import ../utils :as u)

# Domain

(def- before-query
  "with t as (
    select * from words
    where id < :before
    order by id desc
    limit :limit)
  select *
  from t
  order by id asc")

(def- after-query
  "select *
  from words
  where id > :after
  order by id asc
  limit :limit")

(defn- get-all-words
  "Get all words from the database, supporting cursor-based pagination."
  [&named before after limit]
  (default limit 300)
  (default after 0)
  (cond
    (truthy? before) (db/query before-query {:before before :limit limit})
    (>= after 0) (db/query after-query {:after after :limit limit})
    []))

(def- search-query
  "select *
  from words
  where word like :keyword")

(defn- search
  "Search by keyword"
  [keyword]
  (pp {:keyword (string "%" keyword "%")})
  (db/query search-query {:keyword (string "%" keyword "%")}))

# Render

(defn render-word
  "Render a single word, showing its definitions."
  [{:word word :meaning meaning}]
  [:article {:class "entry"}
   [:a {:href (string "/vi-vi/" word)}
    [:h2 word]]
   [:p meaning]])

(defn render-search-result
  "Show search results of multiple entries."
  [entries]
  [[:h1 "Kết quả tìm kiếm"]
   (if (empty? entries)
     [:p "Hông tìm thấy gì"]
     (map render-word entries))])

# Handlers

(defn- main-handler
  "Route handler to show all words in Viet-Viet dict."
  [req]
  (let [before (u/qs->int req :before)
        after (u/qs->int req :after)
        entries (get-all-words :after after :before before)
        first-entry (first entries)
        last-entry (last entries)]
    [:div {:class "flow"}
     [:h1 "Từ điển tiếng Việt"]
     [:div {:class "flex justify-space-between"}
      [:a {:href (string "?before=" (get first-entry :id))} "Trang trước"]
      [:a {:href (string "?after=" (get last-entry :id))} "Trang tiếp"]]
     [:div {:class "entries"}
      (map render-word entries)]]))

(defn- search-handler
  "Route handler to search for a keyword in Viet-Viet dict. If there is a match,
  show that word only. Otherwise show a list of words, or an _empty result_
  message."
  [req]
  (let [keyword (-> (get-in req [:params :keyword]) (uri/unescape))
        results (search keyword)]
    (if (= (length results) 1)
      (render-word (first results))
      (render-search-result results))))

# Declare routes
(route :get "/vi-vi" :vivi/main)
(route :get "/vi-vi/:keyword" :vivi/search)

(def vivi/main (layout main-handler tpl/with-main))
(def vivi/search (layout search-handler tpl/with-main))
