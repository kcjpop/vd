import React from 'react'

const description = ''

export function OpenGraph() {
  const [location, setLocation] = React.useState(null)

  React.useEffect(() => {
    window && setLocation(window.location)
  }, [])

  return (
    <>
      {/* <!-- HTML Meta Tags --> */}
      <title>vd</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content={location ? location.origin + location.pathname : ''}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={'vd'} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="http://localhost.dev/banner/img.webp"
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={location?.host || ''} />
      <meta
        property="twitter:url"
        content={location ? location.origin + location.pathname : ''}
      />
      <meta name="twitter:title" content="vd" />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="http://localhost.dev/banner/img.webp"
      />
    </>
  )
}
