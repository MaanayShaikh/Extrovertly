"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function ProgressCharts() {
  // Mock data for confidence tracking over time
  const confidenceData = [
    { date: "Jan 1", confidence: 3.2, missions: 2, journalEntries: 1 },
    { date: "Jan 8", confidence: 3.8, missions: 5, journalEntries: 4 },
    { date: "Jan 15", confidence: 4.1, missions: 8, journalEntries: 6 },
    { date: "Jan 22", confidence: 4.5, missions: 12, journalEntries: 8 },
    { date: "Jan 29", confidence: 4.8, missions: 15, journalEntries: 10 },
  ]

  const weeklyActivity = [
    { day: "Mon", missions: 2, events: 0, journaling: 1 },
    { day: "Tue", missions: 1, events: 1, journaling: 1 },
    { day: "Wed", missions: 3, events: 0, journaling: 0 },
    { day: "Thu", missions: 2, events: 1, journaling: 1 },
    { day: "Fri", missions: 1, events: 2, journaling: 1 },
    { day: "Sat", missions: 0, events: 1, journaling: 1 },
    { day: "Sun", missions: 1, events: 0, journaling: 1 },
  ]

  const goals = [
    { name: "Weekly Journal Entries", current: 5, target: 7, percentage: 71 },
    { name: "Monthly Missions", current: 18, target: 25, percentage: 72 },
    { name: "Social Events Attended", current: 3, target: 5, percentage: 60 },
    { name: "Confidence Level", current: 4.8, target: 6.0, percentage: 80 },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Your Progress Journey</h2>
        <p className="text-muted-foreground">Track your social confidence growth over time</p>
      </div>

      {/* Confidence Trend Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Confidence Level Over Time</CardTitle>
          <CardDescription>Your self-reported confidence has been steadily improving</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis domain={[0, 6]} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">This Week's Activity</CardTitle>
          <CardDescription>Your daily engagement across different areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="missions" fill="hsl(var(--primary))" name="Missions" />
                <Bar dataKey="events" fill="hsl(var(--accent))" name="Events" />
                <Bar dataKey="journaling" fill="hsl(var(--secondary))" name="Journal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Monthly Goals</CardTitle>
          <CardDescription>Track your progress toward this month's objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <Progress value={goal.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground">{goal.percentage}% complete</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
