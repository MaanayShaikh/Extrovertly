import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MissionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">2/3</span>
              <span className="text-sm text-muted-foreground">missions</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">5 days</div>
          <p className="text-xs text-muted-foreground">Personal best!</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">340</div>
          <p className="text-xs text-muted-foreground">+25 today</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">Confident</div>
          <p className="text-xs text-muted-foreground">60/100 to Expert</p>
        </CardContent>
      </Card>
    </div>
  )
}
