import { DashboardHeader } from "@/components/dashboard-header"
import { MissionsInterface } from "@/components/missions-interface"
import { MissionStats } from "@/components/mission-stats"

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl text-foreground">Daily Missions</h1>
          <p className="text-muted-foreground">Small steps toward bigger confidence</p>
        </div>

        <MissionStats />
        <MissionsInterface />
      </main>
    </div>
  )
}
