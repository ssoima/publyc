'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KnowledgeEntry {
  id: number;
  title: string;
  summary: string;
  category: string;
}

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
    goalsAndIdentity: [
      "• Tech-savvy millennial voice",
      "• Thought leader in AI ethics",
      "• Build 100K follower community",
      "• Launch digital course Q4"
    ].join('\n'),
    topTopics: [
      "Digital Marketing",
      "AI Technology",
      "Content Strategy",
      "Social Media"
    ]
  }

  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch knowledge entries
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/knowledgebase/read')
      if (!response.ok) throw new Error('Failed to fetch entries')
      const data = await response.json()
      setKnowledgeEntries(data.entries)
    } catch (err) {
      setError('Failed to load knowledge entries')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      category: formData.get('category')
    }

    try {
      const response = await fetch('/api/knowledgebase/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to add entry')

      // Refresh the entries instead of reloading the page
      await fetchEntries()
    } catch (error) {
      console.error('Error adding entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h3 className="text-sm font-medium mb-2 text-black/60 dark:text-[#FFFBF0]/60">Goals & Identity</h3>
            <Textarea
              value={userProfile.goalsAndIdentity}
              className="min-h-[150px] bg-[#2D12E9]/5 dark:bg-[#FFFBF0]/5 
                        text-black dark:text-[#FFFBF0] 
                        border-none resize-none"
              placeholder="Enter your goals and identity points..."
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#2D12E9] dark:text-[#FFFBF0]">Knowledge Base</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="bg-[#2D12E9] text-white hover:bg-[#2D12E9]/90">
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Knowledge Entry</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter the title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Digital Marketing</SelectItem>
                          <SelectItem value="ai">AI Technology</SelectItem>
                          <SelectItem value="content">Content Strategy</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Enter the content"
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#2D12E9] text-white hover:bg-[#2D12E9]/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Entry'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#2D12E9] dark:text-[#FFFBF0]">Title</TableHead>
                    <TableHead className="text-[#2D12E9] dark:text-[#FFFBF0]">Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-red-500">
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : knowledgeEntries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No entries found
                      </TableCell>
                    </TableRow>
                  ) : (
                    knowledgeEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="text-black dark:text-[#FFFBF0] font-medium">
                          {entry.title}
                        </TableCell>
                        <TableCell className="text-black dark:text-[#FFFBF0]">
                          {entry.summary}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}