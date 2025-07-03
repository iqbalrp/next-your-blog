// ⛔ tanpa "use client"
import QueryProvider from "./providers"
import { AuthProvider } from "@/context/AuthContext"
import LayoutShell from "@/components/layout/LayoutShell"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <LayoutShell>{children}</LayoutShell>
      </QueryProvider>
    </AuthProvider>
  )
}
