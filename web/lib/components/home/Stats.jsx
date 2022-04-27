import Link from 'next/link'

export function Stats({ stats }) {
  const formatter = new Intl.NumberFormat('vi-VN')

  return (
    <div>
      Hiện đang có{' '}
      <Link href="/dict/en-vi">
        <a className="border-b-2 border-sky-600">
          {formatter.format(stats.EnVi)} từ{' '}
          <strong className="font-bold">Anh - Việt</strong>
        </a>
      </Link>
      , {formatter.format(stats.Wordnet)} từ{' '}
      <strong className="font-bold">Anh - Anh</strong>, và đang bổ sung thêm
      nữa…
    </div>
  )
}
