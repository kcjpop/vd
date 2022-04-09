import { LoginPage } from '@/lib/components/auth'

export default LoginPage

export function getServerSideProps() {
  return { props: { opengraph: { title: 'Đăng nhập' } } }
}
