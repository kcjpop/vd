(defn str->int
  "Convert string to int with a default value. Return an optional default-value
  if conversion failed."
  [input &opt default-value]
  (try
    (or (scan-number input) default-value)
    ([err]
      (print "Error while converting str->int: " input err)
      default-value)))

(defn qs->int
  "Convert non-nil query string value to int."
  [req qs-name]
  (let [val (get-in req [:query-string qs-name])]
    (if val (str->int val) val)))
