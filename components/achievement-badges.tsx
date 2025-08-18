import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
}

export function AchievementBadges() {
  const achievements: Achievement[] = [
    {
      id: "first-journal",
      title: "First Steps",
      description: "Write your first journal entry",
      icon: "📝",
      earned: true,
      earnedDate: "2024-01-10",
    },
    {
      id: "week-streak",
      title: "Consistent Writer",
      description: "Journal for 7 days in a row",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-17",
    },
    {
      id: "first-mission",
      title: "Mission Possible",
      description: "Complete your first daily mission",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-11",
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Attend 5 social events",
      icon: "🦋",
      earned: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "conversation-starter",
      title: "Conversation Starter",
      description: "Complete 10 conversation missions",
      icon: "💬",
      earned: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: "confidence-boost",
      title: "Confidence Boost",
      description: "Reach confidence level 5.0",
      icon: "⭐",
      earned: false,
      progress: 4.8,
      maxProgress: 5.0,
    },
    {
      id: "group-leader",
      title: "Group Leader",
      description: "Suggest and organize a group activity",
      icon: "👑",
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: "mentor",
      title: "Confidence Mentor",
      description: "Help another user with advice",
      icon: "🤝",
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
  ]

  const earnedAchievements = achievements.filter((a) => a.earned)
  const inProgressAchievements = achievements.filter((a) => !a.earned && a.progress && a.progress > 0)
  const lockedAchievements = achievements.filter((a) => !a.earned && (!a.progress || a.progress === 0))

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-foreground">Achievements</h2>
        <p className="text-muted-foreground">Celebrate your social confidence milestones</p>
      </div>

      {/* Achievement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{earnedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Earned</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{inProgressAchievements.length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Earned Achievements
            </CardTitle>
            <CardDescription>Congratulations on these milestones!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    {achievement.earnedDate && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {new Date(achievement.earnedDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              In Progress
            </CardTitle>
            <CardDescription>You're making great progress on these!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-medium text-foreground">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              Upcoming Challenges
            </CardTitle>
            <CardDescription>Future milestones to work toward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-lg opacity-75"
                >
                  <div className="text-2xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-muted-foreground">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
