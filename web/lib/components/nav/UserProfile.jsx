export function UserProfile({ user }) {
  return (
    <div className="p-4">
      Xin chào <span className="font-bold">{user.user_metadata.fullname}</span>!{' '}
      👋
    </div>
  )
}
