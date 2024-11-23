'use client'
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, PenSquare, RotateCcw, Share2, ImagePlus, X } from 'lucide-react'
import { notFound } from "next/navigation"
import Image from "next/image"
import { SharePopup } from "@/components/share-popup"
import { posts } from "@/data/posts"

const textareaStyles = {
  backgroundColor: 'white',
  '::selection': {
    backgroundColor: '#dbeafe',
    color: 'inherit'
  },
  '::-moz-selection': {
    backgroundColor: '#dbeafe',
    color: 'inherit'
  }
}

interface PageParams {
  params: { id: string };
}

export default function PostPage({ params }: PageParams) {
  const [editMode, setEditMode] = useState<'x' | 'linkedin' | null>(null)
  const [regeneratePrompt, setRegeneratePrompt] = useState("")
  const [currentPost, setCurrentPost] = useState(posts[0])
  const [media, setMedia] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState("")
  const [aiInstructions, setAiInstructions] = useState("")
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)
  const [activeNetwork, setActiveNetwork] = useState<'x' | 'linkedin' | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === params.id)
    if (foundPost) {
      setCurrentPost(foundPost)
    } else {
      notFound()
    }
  }, [params.id])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setMedia(imageUrl)
    }
  }

  const removeImage = () => {
    setMedia(null)
  }

  const handleTextSelection = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)
      if (selectedText.length > 0) {
        setSelectedText(selectedText)
        setSelectionStart(start)
        setSelectionEnd(end)
      } else {
        setSelectedText('')
        setSelectionStart(null)
        setSelectionEnd(null)
      }
    }
  }

  const clearSelection = () => {
    if (textareaRef.current) {
      textareaRef.current.style.backgroundColor = 'transparent'
    }
    setSelectedText('')
  }

  const regenerateSelectedText = () => {
    // This is where you would integrate with an AI service to regenerate the text
    console.log("Regenerating text with instructions:", aiInstructions)
    // For now, we'll just append the instructions to the selected text as a placeholder
    if (textareaRef.current) {
      const currentValue = textareaRef.current.value
      const start = currentValue.indexOf(selectedText)
      if (start !== -1) {
        const newValue = currentValue.slice(0, start) + 
                         selectedText + " [AI regenerated: " + aiInstructions + "]" + 
                         currentValue.slice(start + selectedText.length)
        if (editMode === 'x') {
          setCurrentPost({...currentPost, x_description: newValue})
        } else if (editMode === 'linkedin') {
          setCurrentPost({...currentPost, linkedin_description: newValue})
        }
      }
    }
    setSelectedText("")
    setAiInstructions("")
  }

  const handleShare = (network: 'x' | 'linkedin') => {
    setActiveNetwork(network)
    setIsSharePopupOpen(true)
  }

  const handleSchedule = () => {
    console.log(`Scheduling post for ${activeNetwork}`)
    setIsSharePopupOpen(false)
  }

  const handlePublish = () => {
    console.log(`Publishing post to ${activeNetwork}`)
    setIsSharePopupOpen(false)
  }

  const handleXDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPost({ ...currentPost, x_description: e.target.value })
  }

  const handleLinkedInDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPost({ ...currentPost, linkedin_description: e.target.value })
  }

  if (!currentPost) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background z-40">
        <div className="container p-2">
        </div>
      </header>

      <main className="container max-w-2xl mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{currentPost.title}</h1>
          <time className="text-blue-600 font-medium">
            Last updated: {new Date(currentPost.createdAt).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>

        <div className="space-y-4">
          {media ? (
            <div className="relative aspect-video">
              <Image 
                src={media}
                alt="Uploaded media"
                fill
                className="object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-[200px] bg-muted rounded-lg border-2 border-dashed cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Add Media</span>
              </label>
            </div>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed">{currentPost.details}</p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Regeneration Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter instructions to regenerate the posts (e.g. 'Use more emojis' or 'Include this information: ...')"
              value={regeneratePrompt}
              onChange={(e) => setRegeneratePrompt(e.target.value)}
              className="min-h-[100px]"
            />
            <Button className="mt-4 w-full" disabled={!regeneratePrompt}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Regenerate Posts
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">X Post</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditMode('x')}
                >
                  <PenSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleShare('x')}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editMode === 'x' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      value={currentPost.x_description}
                      onChange={handleXDescriptionChange}
                      className="min-h-[100px] relative z-10 bg-white"
                      onSelect={handleTextSelection}
                    />
                    {selectedText && selectionStart !== null && selectionEnd !== null && (
                      <div 
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
                      >
                        <div 
                          className="absolute bg-blue-100"
                          style={{
                            left: `${selectionStart! * 8}px`, // Approximate character width
                            width: `${(selectionEnd! - selectionStart!) * 8}px`, // Width based on selection length
                            top: '0',
                            height: '100%'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {selectedText && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Enter AI instructions for the selected text"
                        value={aiInstructions}
                        onChange={(e) => {
                          setAiInstructions(e.target.value)
                          if (textareaRef.current) {
                            const text = textareaRef.current.value;
                            const start = text.indexOf(selectedText);
                            if (start !== -1) {
                              textareaRef.current.setSelectionRange(start, start + selectedText.length);
                            }
                          }
                        }}
                        className="min-h-[50px]"
                      />
                      <Button onClick={regenerateSelectedText} disabled={!aiInstructions}>
                        Regenerate Selected Text
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setEditMode(null)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-black text-white hover:bg-black/90">Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="min-h-[100px] p-4 rounded-md border bg-white"
                  dangerouslySetInnerHTML={{ 
                    __html: currentPost.x_description 
                  }}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">LinkedIn Post</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditMode('linkedin')}
                >
                  <PenSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editMode === 'linkedin' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      value={currentPost.linkedin_description}
                      onChange={handleLinkedInDescriptionChange}
                      className="min-h-[100px] relative z-10 bg-transparent"
                      onSelect={handleTextSelection}
                    />
                    {selectedText && selectionStart !== null && selectionEnd !== null && (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, 
                            transparent 0%,
                            #dbeafe ${(selectionStart / (textareaRef.current?.value.length || 1)) * 100}%, 
                            #dbeafe ${(selectionEnd / (textareaRef.current?.value.length || 1)) * 100}%,
                            transparent ${(selectionEnd / (textareaRef.current?.value.length || 1)) * 100}%
                          )`
                        }}
                      />
                    )}
                  </div>
                  {selectedText && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Enter AI instructions for the selected text"
                        value={aiInstructions}
                        onChange={(e) => {
                          setAiInstructions(e.target.value)
                          if (textareaRef.current) {
                            const text = textareaRef.current.value;
                            const start = text.indexOf(selectedText);
                            if (start !== -1) {
                              textareaRef.current.setSelectionRange(start, start + selectedText.length);
                            }
                          }
                        }}
                        className="min-h-[50px]"
                      />
                      <Button onClick={regenerateSelectedText} disabled={!aiInstructions}>
                        Regenerate Selected Text
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setEditMode(null)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-black text-white hover:bg-black/90">Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="min-h-[100px] p-4 rounded-md border bg-white"
                  dangerouslySetInnerHTML={{ 
                    __html: currentPost.linkedin_description 
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        onSchedule={handleSchedule}
        onPublish={handlePublish}
      />
    </div>
  )
}


