"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Mission {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  points: number
  timeEstimate: string
  completed: boolean
  tips?: string[]
}

interface MissionCardProps {
  mission: Mission
  onComplete: (missionId: string) => void
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-red-100 text-red-800 border-red-200",
}

const difficultyEmojis = {
  beginner: "🌱",
  intermediate: "🌿",
  advanced: "🌳",
}

export function MissionCard({ mission, onComplete }: MissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = () => {
    setIsCompleting(true)
    // Simulate completion delay
    setTimeout(() => {
      onComplete(mission.id)
      setIsCompleting(false)
    }, 1000)
  }

  return (
    <Card className="border-border/50 hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={difficultyColors[mission.difficulty]}>
                {difficultyEmojis[mission.difficulty]} {mission.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                {mission.category}
              </Badge>
              <Badge variant="outline" className="text-primary border-primary/20">
                +{mission.points} points
              </Badge>
            </div>
            <CardTitle className="font-serif text-lg">{mission.title}</CardTitle>
            <CardDescription className="text-base">{mission.description}</CardDescription>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">⏱️ {mission.timeEstimate}</span>
          <div className="flex items-center gap-2">
            {mission.tips && (
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                    {isExpanded ? "Hide Tips" : "Show Tips"}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
            <Button
              onClick={handleComplete}
              disabled={isCompleting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isCompleting ? "Completing..." : "Mark Complete"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {mission.tips && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <h4 className="font-medium text-accent mb-2">💡 Helpful Tips:</h4>
                <ul className="space-y-1 text-sm text-foreground">
                  {mission.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  )
}
