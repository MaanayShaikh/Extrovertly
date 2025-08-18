"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MissionCard } from "@/components/mission-card"
import { CompletedMissions } from "@/components/completed-missions"

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

export function MissionsInterface() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "Start a conversation with a colleague",
      description: "Initiate a friendly conversation with someone you work with but don't know well.",
      difficulty: "beginner",
      category: "Workplace",
      points: 10,
      timeEstimate: "5 minutes",
      completed: false,
      tips: [
        "Ask about their weekend plans",
        "Comment on something positive about the workplace",
        "Share something interesting you learned recently",
      ],
    },
    {
      id: "2",
      title: "Give someone a genuine compliment",
      description: "Find something you genuinely appreciate about someone and tell them.",
      difficulty: "beginner",
      category: "Kindness",
      points: 15,
      timeEstimate: "2 minutes",
      completed: true,
    },
    {
      id: "3",
      title: "Join a group conversation",
      description: "When you see 2+ people talking, politely join in and contribute to the discussion.",
      difficulty: "intermediate",
      category: "Group Dynamics",
      points: 25,
      timeEstimate: "10 minutes",
      completed: false,
      tips: [
        "Listen first to understand the topic",
        "Ask a relevant question to show interest",
        "Share a related experience if appropriate",
      ],
    },
    {
      id: "4",
      title: "Suggest a group activity",
      description: "Propose an activity for your team, friends, or family to do together.",
      difficulty: "advanced",
      category: "Leadership",
      points: 40,
      timeEstimate: "15 minutes",
      completed: false,
      tips: [
        "Choose something inclusive that everyone can enjoy",
        "Be prepared with 2-3 options",
        "Stay positive if the first suggestion isn't received well",
      ],
    },
  ])

  const completeMission = (missionId: string) => {
    setMissions((prev) => prev.map((mission) => (mission.id === missionId ? { ...mission, completed: true } : mission)))
  }

  const activeMissions = missions.filter((m) => !m.completed)
  const completedMissions = missions.filter((m) => m.completed)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Today's Missions ({activeMissions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {activeMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} onComplete={completeMission} />
            ))}
          </div>

          {activeMissions.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="font-serif font-semibold text-lg mb-2">All missions completed!</h3>
                <p className="text-muted-foreground">Great job! New missions will be available tomorrow.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <CompletedMissions missions={completedMissions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
