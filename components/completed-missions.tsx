import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Mission {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  points: number
  timeEstimate: string
  completed: boolean
}

interface CompletedMissionsProps {
  missions: Mission[]
}

const difficultyEmojis = {
  beginner: "🌱",
  intermediate: "🌿",
  advanced: "🌳",
}

export function CompletedMissions({ missions }: CompletedMissionsProps) {
  if (missions.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="font-serif font-semibold text-lg mb-2">No completed missions yet</h3>
          <p className="text-muted-foreground">Complete your first mission to see it here!</p>
        </CardContent>
      </Card>
    )
  }

  const totalPoints = missions.reduce((sum, mission) => sum + mission.points, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-lg">Completed Today</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          +{totalPoints} points earned
        </Badge>
      </div>

      <div className="grid gap-3">
        {missions.map((mission) => (
          <Card key={mission.id} className="border-border/50 bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-base flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {mission.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {difficultyEmojis[mission.difficulty]} {mission.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-primary border-primary/20 text-xs">
                    +{mission.points}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
