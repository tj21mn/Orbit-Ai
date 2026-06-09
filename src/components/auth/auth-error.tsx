import { AlertCircle } from 'lucide-react'

interface AuthErrorProps {
  message: string
}

export default function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="bg-[#F3F3F3] text-[#0A0A0A] text-xs px-4 py-3 rounded-xl flex items-center gap-2 border border-black/8">
      <AlertCircle size={14} className="text-[#6B6B6B] flex-shrink-0" />
      {message}
    </div>
  )
}
