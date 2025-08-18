import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CoachWelcome() {
  return (
    <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          Meet Alex, Your AI Coach
        </CardTitle>
        <CardDescription className="text-base">
          I'm here to help you build social confidence at your own pace. I can provide personalized advice, practice
          scenarios, and support based on your journal entries and progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary">💬</span>
            <span>Personalized advice</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">🎭</span>
            <span>Practice scenarios</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary">📈</span>
            <span>Progress tracking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
