"use client"

import { useState } from "react"
import { EventCard } from "@/components/event-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  comfortLevel: "low" | "medium" | "high"
  attendees: number
  maxAttendees: number
  price: number
  organizer: string
  socialContext: {
    groupSize: string
    interactionLevel: string
    icebreakers: boolean
  }
  tags: string[]
  imageUrl?: string
  rsvpStatus?: "interested" | "going" | "not_going"
}

export function EventsInterface() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Coffee & Conversation for Introverts",
      description:
        "A relaxed coffee meetup designed specifically for introverts. Small groups, gentle conversation starters, and a welcoming atmosphere.",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Cozy Corner Cafe, Downtown",
      category: "social",
      comfortLevel: "low",
      attendees: 8,
      maxAttendees: 12,
      price: 0,
      organizer: "Sarah Chen",
      socialContext: {
        groupSize: "Small (8-12 people)",
        interactionLevel: "Light conversation",
        icebreakers: true,
      },
      tags: ["beginner-friendly", "structured", "quiet"],
      imageUrl: "/cozy-coffee-chat.png",
    },
    {
      id: "2",
      title: "Public Speaking Workshop",
      description:
        "Build confidence in public speaking with supportive exercises and practical tips. Perfect for overcoming presentation anxiety.",
      date: "2024-01-22",
      time: "6:00 PM",
      location: "Community Center, Room B",
      category: "workshops",
      comfortLevel: "medium",
      attendees: 15,
      maxAttendees: 20,
      price: 25,
      organizer: "Toastmasters International",
      socialContext: {
        groupSize: "Medium (15-20 people)",
        interactionLevel: "Practice presentations",
        icebreakers: true,
      },
      tags: ["skill-building", "supportive", "practice"],
      imageUrl: "/public-speaking-workshop.png",
    },
    {
      id: "3",
      title: "Networking Mixer for Young Professionals",
      description:
        "Connect with other young professionals in a structured networking environment with guided conversation activities.",
      date: "2024-01-25",
      time: "7:00 PM",
      location: "The Hub Coworking Space",
      category: "networking",
      comfortLevel: "high",
      attendees: 45,
      maxAttendees: 60,
      price: 15,
      organizer: "Young Professionals Network",
      socialContext: {
        groupSize: "Large (45+ people)",
        interactionLevel: "Active networking",
        icebreakers: true,
      },
      tags: ["career", "structured", "professional"],
      imageUrl: "/networking-event-mingling.png",
    },
    {
      id: "4",
      title: "Beginner's Book Club",
      description:
        "Join our welcoming book club! This month we're reading 'Quiet' by Susan Cain. Perfect for thoughtful discussions.",
      date: "2024-01-27",
      time: "2:00 PM",
      location: "Central Library, Meeting Room 3",
      category: "hobby",
      comfortLevel: "low",
      attendees: 6,
      maxAttendees: 10,
      price: 0,
      organizer: "City Library",
      socialContext: {
        groupSize: "Small (6-10 people)",
        interactionLevel: "Thoughtful discussion",
        icebreakers: false,
      },
      tags: ["intellectual", "quiet", "regular-meetup"],
      imageUrl: "/placeholder-16itm.png",
    },
  ])

  const updateRSVP = (eventId: string, status: "interested" | "going" | "not_going") => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, rsvpStatus: status } : event)))
  }

  const interestedEvents = events.filter((e) => e.rsvpStatus === "interested")
  const goingEvents = events.filter((e) => e.rsvpStatus === "going")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover ({events.length})</TabsTrigger>
          <TabsTrigger value="interested">Interested ({interestedEvents.length})</TabsTrigger>
          <TabsTrigger value="going">Going ({goingEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onRSVP={updateRSVP} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interested" className="space-y-4">
          <div className="grid gap-4">
            {interestedEvents.length > 0 ? (
              interestedEvents.map((event) => <EventCard key={event.id} event={event} onRSVP={updateRSVP} />)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-4">🤔</div>
                <p>No events marked as interested yet. Explore the Discover tab to find events!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="going" className="space-y-4">
          <div className="grid gap-4">
            {goingEvents.length > 0 ? (
              goingEvents.map((event) => <EventCard key={event.id} event={event} onRSVP={updateRSVP} />)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-4">📅</div>
                <p>No events in your calendar yet. RSVP to events you'd like to attend!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
