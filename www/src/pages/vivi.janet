(use joy)

(import ../utils :as u)

# Declare routes
(route :get "/vi-vi" :vivi/main)
(route :get "/vi-vi/search" :vivi/search)

# Helpers

(defn qs->int
  "Convert non-nil query string value to int."
  [req qs-name]
  (let [val (get-in req [:query-string qs-name])]
    (if val (u/str->int val) val)))

# Domain

(def- before-query
  "with t as (
    select * from word
    where id < :before
    order by id desc
    limit :limit)
  select *
  from t
  order by id asc")

(def- after-query
  "select *
  from word
  where id > :after
  order by id asc
  limit :limit")

(defn- get-all-words
  "Get all words from the database, supporting cursor-based pagination."
  [&named before after limit]
  (default limit 100)
  (default after 0)
  (cond
    (not (nil? after)) (db/query after-query {:after after :limit limit})
    (not (nil? before)) (db/query before-query {:before before :limit limit})
    []))

(def- search-query
  "select *
  from word
  where w like :keyword")

(defn- search
  "Search by keyword"
  [keyword]
  (pp {:keyword (string "%" keyword "%")})
  (db/query search-query {:keyword (string "%" keyword "%")}))

# Render

(defn render-word
  "Render a single word, showing its definitions."
  [{:w word :m meaning}]
  [:article
   [:a {:href (string "/vi-vi/search?s=" word)}
    [:h2 word]]
   [:p meaning]])

(defn render-search-result
  "Show search results of multiple entries."
  [entries]
  [:div {:class "container p-2"}
   [:h1 "Kết quả tìm kiếm"]
   (map render-word entries)])

# Handlers

(defn vivi/main
  "Route handler to show all words in Viet-Viet dict."
  [req]
  (let [before (qs->int req :before)
        after (qs->int req :after)
        entries (get-all-words :after after :before before)
        first-entry (first entries)
        last-entry (last entries)]
    [:main {:class "container p-2"}
     [:h1 "Từ điển tiếng Việt"]
     [:div {:class "flex justify-space-between"}
      [:a {:href (string "?before=" (get first-entry :id))} "Trang trước"]
      [:a {:href (string "?after=" (get last-entry :id))} "Trang tiếp"]]
     (map render-word entries)]))

(defn vivi/search
  "Route handler to search for a keyword in Viet-Viet dict. If there is a match,
  show that word only. Otherwise show a list of words, or an _empty result_
  message."
  [req]
  (let [keyword (get-in req [:query-string :s])
        results (search keyword)]
    (cond
      (nil? results) [:p "No result"]
      (= (length results) 1) (render-word (first results))
      (render-search-result results))))
