import { AuthForm } from "@/components/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* App Header */}
        <div className="text-center space-y-2">
          <h1 className="font-serif font-black text-4xl text-primary">Extrovertly</h1>
          <p className="text-muted-foreground text-lg">Build social confidence, one step at a time</p>
        </div>

        {/* Welcome Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="font-serif font-bold text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">Continue your journey to social confidence</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary text-xl">📝</span>
            </div>
            <p className="text-sm font-medium">Daily Journaling</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-accent text-xl">🎯</span>
            </div>
            <p className="text-sm font-medium">Social Missions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
