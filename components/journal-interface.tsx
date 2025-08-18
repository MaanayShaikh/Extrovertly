"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JournalEntry } from "@/components/journal-entry"
import { MoodSelector } from "@/components/mood-selector"

interface JournalEntryType {
  id: string
  date: string
  content: string
  mood: string
  reflectionPrompt?: string
}

export function JournalInterface() {
  const [currentEntry, setCurrentEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [isWriting, setIsWriting] = useState(false)

  // Mock journal entries
  const journalEntries: JournalEntryType[] = [
    {
      id: "1",
      date: "2024-01-15",
      content:
        "Today I managed to start a conversation with a colleague at lunch. It felt scary at first, but they were really friendly and we talked about our weekend plans. I'm proud of myself for taking that first step.",
      mood: "proud",
      reflectionPrompt: "What social interaction made you feel most confident today?",
    },
    {
      id: "2",
      date: "2024-01-14",
      content:
        "Had a team meeting today. I wanted to share my idea but held back again. I need to work on speaking up more in group settings. Maybe I can prepare what I want to say beforehand next time.",
      mood: "thoughtful",
      reflectionPrompt: "What would help you feel more confident in group discussions?",
    },
  ]

  const handleSaveEntry = () => {
    if (currentEntry.trim() && selectedMood) {
      // Here we would save to database
      console.log("[v0] Saving journal entry:", { content: currentEntry, mood: selectedMood })
      setCurrentEntry("")
      setSelectedMood("")
      setIsWriting(false)
    }
  }

  const todaysPrompt = "What social interaction challenged you today, and how did you handle it?"

  return (
    <div className="space-y-6">
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write Entry</TabsTrigger>
          <TabsTrigger value="history">Journal History</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Today's Reflection</CardTitle>
              <CardDescription className="text-base">{todaysPrompt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Start writing about your day... How did social interactions make you feel? What did you learn about yourself?"
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                className="min-h-32 bg-input border-border resize-none"
                onFocus={() => setIsWriting(true)}
              />

              {isWriting && (
                <div className="space-y-4">
                  <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-muted-foreground bg-transparent">
                        📷 Add Photo
                      </Button>
                      <Button variant="outline" size="sm" className="text-muted-foreground bg-transparent">
                        🎤 Voice Note
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsWriting(false)
                          setCurrentEntry("")
                          setSelectedMood("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveEntry}
                        disabled={!currentEntry.trim() || !selectedMood}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Save Entry
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-semibold text-lg">Your Journey</h3>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              {journalEntries.length} entries
            </Badge>
          </div>

          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
