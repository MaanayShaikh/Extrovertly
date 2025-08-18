import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Journal Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">7 days</div>
          <p className="text-xs text-muted-foreground">Keep it up!</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Missions Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">12</div>
          <p className="text-xs text-muted-foreground">This week</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Confidence Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">Growing</div>
          <p className="text-xs text-muted-foreground">+15% this month</p>
        </CardContent>
      </Card>
    </div>
  )
}
