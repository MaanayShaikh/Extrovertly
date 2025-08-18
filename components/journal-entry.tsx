import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JournalEntryProps {
  entry: {
    id: string
    date: string
    content: string
    mood: string
    reflectionPrompt?: string
  }
}

const moodEmojis: Record<string, string> = {
  confident: "😊",
  nervous: "😰",
  proud: "🌟",
  overwhelmed: "😵",
  thoughtful: "🤔",
  excited: "🎉",
}

export function JournalEntry({ entry }: JournalEntryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{formatDate(entry.date)}</div>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {moodEmojis[entry.mood]} {entry.mood}
          </Badge>
        </div>
        {entry.reflectionPrompt && (
          <div className="text-sm text-accent font-medium italic">"{entry.reflectionPrompt}"</div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{entry.content}</p>
      </CardContent>
    </Card>
  )
}
