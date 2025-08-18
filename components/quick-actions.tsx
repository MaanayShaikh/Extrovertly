"use client"

import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  onActionSelect: (action: string) => void
}

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  const quickActions = [
    {
      label: "I'm feeling nervous about an upcoming social event",
      icon: "😰",
    },
    {
      label: "Can we practice starting a conversation?",
      icon: "💬",
    },
    {
      label: "I want to work on speaking up in group meetings",
      icon: "👥",
    },
    {
      label: "How can I build more confidence?",
      icon: "💪",
    },
  ]

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Quick actions:</div>
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onActionSelect(action.label)}
            className="text-left justify-start hover:bg-muted"
          >
            <span className="mr-2">{action.icon}</span>
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
