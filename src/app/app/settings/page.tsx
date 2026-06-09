export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl">
      <p className="text-[#ACADB1] text-xs uppercase tracking-widest mb-2">Workspace</p>
      <h1 className="text-[#080808] text-2xl font-medium tracking-[-0.02em]">Settings</h1>
      <p className="text-[#706F70] text-sm mt-1.5 mb-8">
        Manage your workspace preferences and team access.
      </p>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-[#D4D8DF] p-5">
          <p className="text-[#080808] text-sm font-medium mb-1">Workspace name</p>
          <p className="text-[#706F70] text-sm">Acme Corp</p>
        </div>
        <div className="bg-white rounded-xl border border-[#D4D8DF] p-5">
          <p className="text-[#080808] text-sm font-medium mb-1">Plan</p>
          <p className="text-[#706F70] text-sm">Free · Upgrade to Pro for unlimited analyses</p>
        </div>
        <div className="bg-white rounded-xl border border-[#D4D8DF] p-5">
          <p className="text-[#080808] text-sm font-medium mb-1">Notifications</p>
          <p className="text-[#706F70] text-sm">Slack alerts enabled for high-impact opportunities</p>
        </div>
      </div>
    </div>
  )
}
