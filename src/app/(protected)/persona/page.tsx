'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { ArrowLeft } from "lucide-react"

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-black to-black">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <header className="flex items-center gap-4 border-b border-blue-500/30 pb-6">
          <div className="w-12 h-12">
            {/* Replace with your SVG logo */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-white"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="40" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            your publyc persona
          </h1>
        </header>

        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            Help us understand your public presence better. This will enable us to tailor our platform to your needs and create a more personalized experience for you - to make the best and most unique content possible.
          </p>
        </div>

        {/* Survey Questions */}
        <div className="space-y-16">
          <SurveyQuestion
            number={1}
            question="Introduction: Who are you?"
            context="What do you do? What are you passionate about?"
            placeholder={`Example:
I help people see the world differently. I'm a tech visionary and storyteller who believes in the intersection of technology and liberal arts. My passion lies in creating products that aren't just tools, but extensions of the human experience - products that change how we live, work, and think.

I'm not just a tech entrepreneur; I'm someone who stands at the crossroads of counterculture and technology. From calligraphy classes at Reed College to zen meditation in India, my journey has been about seeking perfection in simplicity and bringing that vision to life through technology.
`}
          />

          <SurveyQuestion
            number={2}
            question="Uniqueness: What do you want to be known for?"
            context="How do you want to be perceived by others? What are the things that make you unique?"
            placeholder={`Example:

I want to be known as the person who makes technology human. My uniqueness comes from:

- The ability to see what others don't and make the impossible seem inevitable
- Merging design, humanities, and technology in ways nobody else does
- Uncompromising pursuit of perfection in every detail
- Ability to distill complex technologies into magical experiences
- Creating reality distortion fields that push people beyond their perceived limits
                `}
          />


          <SurveyQuestion
            number={3}
            question="Audience: Who are you serving?"
            context={`Who are you targeting with your personal brand? Your personal brand is not about you - it's about the people you want to serve with the skills, knowledge, and value you can provide.

Who you decide to focus on should be based on two things:

- the goal of your personal brand
- and the people who can best benefit from your unique talent and skills`}
            placeholder={`Example:

I serve the dreamers, the misfits, the rebels, the troublemakers - the ones who see things differently. Specifically:   
- Innovators and entrepreneurs who want to make a dent in the universe
- Creative professionals who use technology to bring their visions to life
- Technology enthusiasts who believe in the power of design
- Business leaders looking to create category-defining products
- Anyone who believes that the best way to predict the future is to invent it
`}
          />

        

          <SurveyQuestion
            number={4}
            question="Value: What problem do you solve for your audience?"
            context="How do you solve those problems? What exactly is the value you provide?"
            placeholder={`Example:

I solve the fundamental problem of complexity in technology. Here's how:

- I show people what they need before they know they need it
- I simplify the complex into something beautiful and intuitive
- I help organizations think differently about product development
- I demonstrate how to build products that create emotional connections
- I inspire people to push beyond the ordinary and achieve the extraordinary

For my audience, I translate this into:

- Insights about building revolutionary products
- Strategies for creating category-defining companies
- Frameworks for thinking differently about design and user experience
- Leadership principles for driving innovation
- Stories that inspire people to pursue their crazy ideas
`}
          />

        <SurveyQuestion
            number={5}
            question="Style: What style for your content do you aspire?"
            context="What creators do you admire? What style do you aspire? (verbally, visually, etc.)"
            placeholder={`Example:

Content Tone:

- Minimalist yet powerful
- Bold, contrarian statements
- Theatrical buildups with "one more thing" moments
- Zero tolerance for mediocrity
- Short, quotable mantras

Verbal Style:

- Direct and uncompromising
- No corporate speak
- Emotional storytelling
- Power words: "revolutionary," "incredible," "magical"
- Dramatic pauses and timing

Visual Style:

- Black backgrounds
- High contrast
- Abundant white space
- One perfect image > many average ones
- Consistent personal appearance (black turtleneck)

Core Principles:

- Quality over quantity - each post must be perfect
- Challenge status quo
- Paint impossible futures
- Make people think differently
- No compromise for engagement
- Focus on vision, not tactics

Remember: The goal isn't to be likable - it's to be unforgettable. Every piece of content should feel like a keynote moment, even if it's just a LinkedIn post.
`}
          />
        </div>

          <SurveyQuestion
            number={6}
            question="Goal: What do you want to achieve with your personal brand?"
            context="How do you measure your content's success? Where do you want to be in one year with your brand? What's your business model? What's your vision?"
            placeholder={`Example:

My goals with my personal brand:

Vision:
To inspire a new generation of leaders who understand that the intersection of technology and humanities is where the magic happens.

Metrics of Success:

- Number of people inspired to start companies that merge technology and liberal arts
- Adoption of human-centered design principles in technology companies
- Impact on how people think about product development
- Cultural shift in how technology is perceived and designed

Business Model:

- Speaking engagements about innovation and design
- Advisory roles for companies wanting to create revolutionary products
- Building and leading companies that exemplify my philosophy
- Investment in ventures that align with my vision of technology and humanities

One-Year Goals:

- Establish a strong thought leadership presence around human-centered technology
- Build a community of innovators who share my vision
- Create content that challenges conventional thinking about technology and design
- Influence the next generation of product developers and entrepreneurs
- Share insights about building products that change the world

Remember: I'm not here to win a popularity contest. I'm here to push the human race forward. If some people don't like my methods or message, that's fine. I'm looking for the ones who want to help change the world.
`}
          />


        {/* Submit Button */}
        <div className="pt-8">
          <Button className="w-full #2D12E9 hover:bg-blue-900 text-white py-6 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Submit Your Responses
          </Button>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => window.location.href = '/knowledgebase'}
          className="mb-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          variant="ghost"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  )
}

function SurveyQuestion({ 
  number, 
  question, 
  context, 
  placeholder 
}: { 
  number: number; 
  question: string; 
  context: string;
  placeholder: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="space-y-4 bg-white/5 p-6 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-blue-400">{number}</span>
        <h2 className="text-xl font-bold">{question}</h2>
      </div>
      <p className="text-sm text-gray-400 whitespace-pre-line">{context}</p>
      <textarea 
        ref={textareaRef}
        className="w-full min-h-[120px] bg-black/50 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500 p-2 resize-none overflow-y-auto" 
        placeholder={placeholder}
        rows={10}
        onChange={adjustHeight}
      />
    </div>
  )
}

