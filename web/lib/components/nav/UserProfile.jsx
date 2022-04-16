export function UserProfile({ user }) {
  return (
    <div className="flex items-center gap-2">
      {/* This can be a component common/Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-slate-50">
        A.C
      </div>
      Xin chào <span className="font-bold">{user.user_metadata.fullname}</span>!
      👋
    </div>
  )
}
