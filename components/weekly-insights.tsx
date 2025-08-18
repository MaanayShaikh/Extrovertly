import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WeeklyInsights() {
  const insights = [
    {
      type: "positive",
      title: "Confidence Growth",
      description: "Your confidence level increased by 15% this week! You're making excellent progress.",
      icon: "📈",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      type: "achievement",
      title: "Mission Streak",
      description: "You've completed missions for 5 days straight. Consistency is key to building habits!",
      icon: "🔥",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      type: "suggestion",
      title: "Try Group Activities",
      description: "Based on your progress, you might be ready to try some group-based missions.",
      icon: "💡",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      type: "reflection",
      title: "Journal Themes",
      description: "Your recent entries show increased comfort with workplace conversations.",
      icon: "🔍",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ]

  const moodTrends = [
    { mood: "Confident", count: 8, trend: "up" },
    { mood: "Proud", count: 6, trend: "up" },
    { mood: "Thoughtful", count: 4, trend: "stable" },
    { mood: "Nervous", count: 2, trend: "down" },
  ]

  const topMissions = [
    { mission: "Start conversations", completed: 5, success: "100%" },
    { mission: "Give compliments", completed: 4, success: "100%" },
    { mission: "Join group discussions", completed: 3, success: "75%" },
    { mission: "Suggest activities", completed: 1, success: "50%" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Weekly Insights</h2>
        <p className="text-muted-foreground">Personalized analysis of your social confidence journey</p>
      </div>

      {/* Key Insights */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Key Insights</CardTitle>
          <CardDescription>What your data tells us about your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <div className="text-2xl">{insight.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{insight.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{insight.description}</div>
                <Badge variant="outline" className={`mt-2 text-xs ${insight.color}`}>
                  {insight.type}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mood Analysis */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Mood Trends</CardTitle>
          <CardDescription>How your emotional state has evolved this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodTrends.map((mood) => (
              <div key={mood.mood} className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">{mood.count}</div>
                <div className="text-sm font-medium text-foreground">{mood.mood}</div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {mood.trend === "up" ? "↗️" : mood.trend === "down" ? "↘️" : "→"}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">{mood.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Performance */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Mission Performance</CardTitle>
          <CardDescription>Your most attempted missions and success rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topMissions.map((mission, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{mission.mission}</div>
                  <div className="text-sm text-muted-foreground">{mission.completed} attempts</div>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    Number.parseInt(mission.success) >= 75
                      ? "bg-green-100 text-green-800 border-green-200"
                      : Number.parseInt(mission.success) >= 50
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {mission.success}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Next Week's Focus
          </CardTitle>
          <CardDescription>Personalized recommendations based on your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-foreground">Challenge yourself with intermediate missions</div>
              <div className="text-sm text-muted-foreground">
                You've mastered beginner conversations - time to try group discussions!
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-foreground">Attend a social event</div>
              <div className="text-sm text-muted-foreground">
                Your confidence is growing - consider joining a low-pressure meetup.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-foreground">Reflect on leadership opportunities</div>
              <div className="text-sm text-muted-foreground">
                Journal about situations where you could take initiative.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
