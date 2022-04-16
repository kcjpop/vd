export function Stats({ stats }) {
  const formatter = new Intl.NumberFormat('vi-VN')

  return (
    <div>
      Hiện đang có {formatter.format(stats.EnVi)} từ{' '}
      <strong className="font-bold">Anh - Việt</strong>,{' '}
      {formatter.format(stats.Wordnet)} từ{' '}
      <strong className="font-bold">Anh - Anh</strong>, và đang bổ sung thêm
      nữa…
    </div>
  )
}
