"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

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

interface EventCardProps {
  event: Event
  onRSVP: (eventId: string, status: "interested" | "going" | "not_going") => void
}

const comfortLevelColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const comfortLevelLabels = {
  low: "Low Pressure",
  medium: "Moderate",
  high: "High Energy",
}

const comfortLevelEmojis = {
  low: "🌱",
  medium: "🌿",
  high: "🔥",
}

export function EventCard({ event, onRSVP }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const getRSVPButtonText = () => {
    switch (event.rsvpStatus) {
      case "interested":
        return "Interested ✓"
      case "going":
        return "Going ✓"
      default:
        return "RSVP"
    }
  }

  const getRSVPButtonVariant = () => {
    switch (event.rsvpStatus) {
      case "interested":
        return "secondary"
      case "going":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card className="border-border/50 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col md:flex-row">
        {event.imageUrl && (
          <div className="md:w-64 h-48 md:h-auto relative">
            <Image
              src={event.imageUrl || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        )}

        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={comfortLevelColors[event.comfortLevel]}>
                    {comfortLevelEmojis[event.comfortLevel]} {comfortLevelLabels[event.comfortLevel]}
                  </Badge>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground capitalize">
                    {event.category}
                  </Badge>
                  {event.price === 0 ? (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Free
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-primary border-primary/20">
                      ${event.price}
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-serif text-xl">{event.title}</CardTitle>
                <CardDescription className="text-base">{event.description}</CardDescription>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    {formatDate(event.date)} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>
                    {event.attendees}/{event.maxAttendees} attending
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                      {isExpanded ? "Less Info" : "More Info"}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>

                <Button
                  variant={getRSVPButtonVariant()}
                  onClick={() => {
                    const newStatus = event.rsvpStatus === "going" ? undefined : "going"
                    onRSVP(event.id, newStatus as any)
                  }}
                  className={`${
                    event.rsvpStatus === "going"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {getRSVPButtonText()}
                </Button>

                {!event.rsvpStatus && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRSVP(event.id, "interested")}
                    className="text-accent border-accent/20 hover:bg-accent/10"
                  >
                    Interested
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-4 border border-border/50">
                    <h4 className="font-medium text-foreground mb-3">Social Context</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Group Size:</span>
                        <div className="font-medium">{event.socialContext.groupSize}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Interaction:</span>
                        <div className="font-medium">{event.socialContext.interactionLevel}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Icebreakers:</span>
                        <div className="font-medium">{event.socialContext.icebreakers ? "Yes ✓" : "No"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span>Organized by: </span>
                    <span className="font-medium text-foreground">{event.organizer}</span>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </Card>
  )
}
