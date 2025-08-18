"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage } from "@/components/chat-message"
import { QuickActions } from "@/components/quick-actions"

interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
  type?: "text" | "scenario" | "advice"
}

export function CoachInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm Alex, your AI coach. I've been reviewing your recent journal entries and I'm impressed by your progress! You mentioned feeling proud about starting a conversation with a colleague. How did that make you feel, and what would you like to work on next?",
      sender: "coach",
      timestamp: new Date(),
      type: "advice",
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateCoachResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Scenario-based responses
    if (lowerMessage.includes("nervous") || lowerMessage.includes("anxiety")) {
      return "I understand that nervousness is completely natural. Let's try a breathing technique: take a deep breath in for 4 counts, hold for 4, then exhale for 6. This activates your parasympathetic nervous system and can help calm those pre-social jitters. Would you like to practice a specific scenario that makes you nervous?"
    }

    if (lowerMessage.includes("conversation") || lowerMessage.includes("talk")) {
      return "Great question! Starting conversations gets easier with practice. Here are three gentle conversation starters: 1) 'How's your day going?' 2) Comment on something in your shared environment, like 'This coffee smells amazing!' 3) Ask for a small opinion: 'Have you tried the new lunch place?' Which of these feels most comfortable to you?"
    }

    if (lowerMessage.includes("group") || lowerMessage.includes("meeting")) {
      return "Group settings can feel overwhelming, but you have strategies! Try the 'observe first' approach: listen for 2-3 minutes to understand the conversation flow, then contribute with a question or build on someone's point. Remember, you don't need to be the most talkative person to add value. What specific group situation would you like to practice?"
    }

    if (lowerMessage.includes("practice") || lowerMessage.includes("scenario")) {
      return "Perfect! Let's do a role-play. I'll be a friendly coworker, and you can practice starting a conversation. Here's the scenario: We're both in the break room getting coffee. I'll start: 'Oh, you're here early today!' Now, how would you respond? Remember, there's no wrong answer - we're just practicing!"
    }

    if (lowerMessage.includes("confident") || lowerMessage.includes("confidence")) {
      return "Building confidence is a journey, and you're already on the right path by being here! Confidence often comes from preparation and small wins. Based on your recent missions, you've been making great progress. What's one social situation where you'd like to feel more confident?"
    }

    // Default encouraging responses
    const encouragingResponses = [
      "That's a wonderful insight! Your self-awareness is one of your greatest strengths. How can we build on this feeling?",
      "I'm proud of you for sharing that. It takes courage to be vulnerable about our social experiences. What would feel like a good next step?",
      "You're making real progress! Remember, every small step counts. What's one thing you'd like to try this week?",
      "That sounds challenging, and it's completely understandable to feel that way. Let's break this down into smaller, manageable steps. What feels most important to address first?",
    ]

    return encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const coachResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateCoachResponse(currentMessage),
          sender: "coach",
          timestamp: new Date(),
          type: "advice",
        }

        setMessages((prev) => [...prev, coachResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // Random delay between 1.5-2.5 seconds
  }

  const handleQuickAction = (action: string) => {
    setCurrentMessage(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">🤖</span>
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      <QuickActions onActionSelect={handleQuickAction} />

      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Share what's on your mind, ask for advice, or request a practice scenario..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-20 bg-input border-border resize-none"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 text-primary-foreground self-end"
            >
              Send
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</div>
        </CardContent>
      </Card>
    </div>
  )
}
