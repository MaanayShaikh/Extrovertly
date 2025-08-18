"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventFilters() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedComfortLevel, setSelectedComfortLevel] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "networking", label: "Networking" },
    { id: "workshops", label: "Workshops" },
    { id: "social", label: "Social Meetups" },
    { id: "hobby", label: "Hobby Groups" },
    { id: "fitness", label: "Fitness & Wellness" },
    { id: "creative", label: "Creative Arts" },
  ]

  const comfortLevels = [
    { id: "all", label: "All Levels" },
    { id: "low", label: "Low Pressure", color: "bg-green-100 text-green-800" },
    { id: "medium", label: "Moderate", color: "bg-yellow-100 text-yellow-800" },
    { id: "high", label: "High Energy", color: "bg-red-100 text-red-800" },
  ]

  const dateRanges = [
    { id: "all", label: "Any Time" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
  ]

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground">Category:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Comfort:</span>
              <Select value={selectedComfortLevel} onValueChange={setSelectedComfortLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {comfortLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">When:</span>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
