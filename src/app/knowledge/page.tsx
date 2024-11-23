'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function KnowledgePage() {
  // Mock data - replace with real data later
  const userProfile = {
    name: "Alex Johnson",
    role: "Content Creator",
    lastActive: "2 hours ago",
    avatar: "/avatar-placeholder.jpg",
    stats: {
      postsCreated: 47,
      totalReach: "12.4K",
      avgEngagement: "8.2%"
    },
    connectedTools: [
      "Twitter",
      "LinkedIn",
      "Medium",
      "Instagram",
      "WordPress"
    ],
    topTopics: [
      "Digital Marketing",
      "AI Technology",
      "Content Strategy",
      "Social Media"
    ]
  }

  const knowledgeEntries = [
    { id: 1, summary: "Key insights on AI content creation and its impact on digital marketing strategies" },
    { id: 2, summary: "Best practices for engaging audience through storytelling in social media" },
    { id: 3, summary: "Analysis of content performance metrics across different platforms" },
    { id: 4, summary: "Understanding user behavior patterns in content consumption" },
    { id: 5, summary: "Effective techniques for repurposing content across multiple channels" },
  ]

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Profile Section */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-[#FFFBF0]">{userProfile.name}</h2>
              <p className="text-sm text-[#2D12E9] dark:text-[#FFFBF0]">{userProfile.role}</p>
              <p className="text-xs text-black/60 dark:text-[#FFFBF0]/60 mt-1">
                Active {userProfile.lastActive}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2D12E9] dark:text-[#FFFBF0]">{userProfile.stats.postsCreated}</p>
              <p className="text-xs text-black/60 dark:text-[#FFFBF0]/60">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2D12E9] dark:text-[#FFFBF0]">{userProfile.stats.totalReach}</p>
              <p className="text-xs text-black/60 dark:text-[#FFFBF0]/60">Reach</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2D12E9] dark:text-[#FFFBF0]">{userProfile.stats.avgEngagement}</p>
              <p className="text-xs text-black/60 dark:text-[#FFFBF0]/60">Engagement</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-black/60 dark:text-[#FFFBF0]/60">Top Topics</h3>
            <div className="flex gap-2 flex-wrap">
              {userProfile.topTopics.map((topic) => (
                <span 
                  key={topic}
                  className="px-3 py-1 bg-[#2D12E9]/5 dark:bg-[#FFFBF0]/5 
                           text-[#2D12E9] dark:text-[#FFFBF0] 
                           rounded-full text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-black/60 dark:text-[#FFFBF0]/60">Connected Tools</h3>
            <div className="flex gap-2 flex-wrap">
              {userProfile.connectedTools.map((tool) => (
                <span 
                  key={tool}
                  className="px-3 py-1 bg-[#2D12E9]/5 dark:bg-[#FFFBF0]/5 
                           text-[#2D12E9] dark:text-[#FFFBF0] 
                           rounded-full text-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#2D12E9] dark:text-[#FFFBF0]">Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#2D12E9] dark:text-[#FFFBF0]">Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {knowledgeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="text-black dark:text-[#FFFBF0]">{entry.summary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}