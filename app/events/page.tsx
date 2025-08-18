import { DashboardHeader } from "@/components/dashboard-header"
import { EventsInterface } from "@/components/events-interface"
import { EventFilters } from "@/components/event-filters"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl text-foreground">Discover Events</h1>
          <p className="text-muted-foreground">Find social opportunities that match your comfort level</p>
        </div>

        <EventFilters />
        <EventsInterface />
      </main>
    </div>
  )
}
