import { DashboardHeader } from "@/components/dashboard-header"
import { CoachInterface } from "@/components/coach-interface"
import { CoachWelcome } from "@/components/coach-welcome"

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif font-bold text-3xl text-foreground">Your AI Coach</h1>
            <p className="text-muted-foreground">Get personalized guidance for building social confidence</p>
          </div>

          <CoachWelcome />
          <CoachInterface />
        </div>
      </main>
    </div>
  )
}
