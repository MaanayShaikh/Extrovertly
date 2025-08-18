"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function DashboardHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/missions", label: "Missions" },
    { href: "/events", label: "Events" },
    { href: "/coach", label: "Coach" },
  ]

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <h2 className="font-serif font-black text-xl text-primary hover:text-primary/80 transition-colors">
              Extrovertly
            </h2>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`text-foreground hover:text-primary ${
                  pathname === item.href ? "text-primary bg-primary/10" : ""
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/diverse-user-avatars.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
