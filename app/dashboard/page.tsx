import { JournalInterface } from "@/components/journal-interface"
import { DashboardHeader } from "@/components/dashboard-header"
import { QuickStats } from "@/components/quick-stats"
import { ProgressCharts } from "@/components/progress-charts"
import { AchievementBadges } from "@/components/achievement-badges"
import { WeeklyInsights } from "@/components/weekly-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl text-foreground">Good morning, Alex!</h1>
          <p className="text-muted-foreground">Ready to continue your confidence journey?</p>
        </div>

        <QuickStats />

        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-6">
            <JournalInterface />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressCharts />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementBadges />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <WeeklyInsights />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
