"use client"

import { Button } from "@/components/ui/button"

interface MoodSelectorProps {
  selectedMood: string
  onMoodSelect: (mood: string) => void
}

const moods = [
  { id: "confident", label: "Confident", emoji: "😊", color: "bg-green-100 text-green-800" },
  { id: "nervous", label: "Nervous", emoji: "😰", color: "bg-yellow-100 text-yellow-800" },
  { id: "proud", label: "Proud", emoji: "🌟", color: "bg-blue-100 text-blue-800" },
  { id: "overwhelmed", label: "Overwhelmed", emoji: "😵", color: "bg-red-100 text-red-800" },
  { id: "thoughtful", label: "Thoughtful", emoji: "🤔", color: "bg-purple-100 text-purple-800" },
  { id: "excited", label: "Excited", emoji: "🎉", color: "bg-orange-100 text-orange-800" },
]

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">How are you feeling?</label>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? "default" : "outline"}
            size="sm"
            onClick={() => onMoodSelect(mood.id)}
            className={`${selectedMood === mood.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <span className="mr-1">{mood.emoji}</span>
            {mood.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
