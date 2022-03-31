import Head from 'next/head'

export function OpenGraph({ opengraph = {} }) {
  const url = new URL(
    opengraph.url ?? process.env.NEXT_PUBLIC_MAIN_URL ?? 'https://tudien.io',
  )
  const domain = url.hostname
  const title = opengraph.title ? opengraph.title + ' - ' + domain : domain
  const description =
    opengraph.description ?? 'Từ điển Anh Việt xịn xò nhất quả đất'
  const image = opengraph.image ?? 'https://tudien.io/banner.png'

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="431" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
