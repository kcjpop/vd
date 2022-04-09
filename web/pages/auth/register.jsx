import { RegisterPage } from '@/lib/components/auth'

export default RegisterPage

export function getServerSideProps() {
  return { props: { opengraph: { title: 'Đăng ký' } } }
}
