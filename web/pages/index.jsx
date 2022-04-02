import { Page } from '@/lib/components/home'

export default Page

export const getServerSideProps = () => ({
  props: {
    opengraph: {
      title: 'Trang Chủ',
    },
  },
})
