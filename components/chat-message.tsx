interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
  type?: "text" | "scenario" | "advice"
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (message.sender === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-right">{formatTime(message.timestamp)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="flex gap-2 max-w-xs lg:max-w-md">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-primary text-sm">🤖</span>
        </div>
        <div className="flex-1">
          <div className="bg-muted rounded-lg px-4 py-2">
            <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Alex • {formatTime(message.timestamp)}</div>
        </div>
      </div>
    </div>
  )
}
