(defn str->int
  "Convert string to int with a default value. Return an optional default-value
  if conversion failed."
  [input &opt default-value]
  (try
    (or (scan-number input) default-value)
    ([err]
      (print "Error while converting str->int: " input err)
      default-value)))
