'use client'
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { mockArticles } from "@/data/mockArticles";
import { AnimatedAgent } from "@/components/AnimatedAgent";
import { useState, useEffect } from "react";
import { useAgent } from "@/contexts/AgentContext";
import { createClient } from "@/utils/supabase/client";
import InfoIcon from "@/components/infobar";

export default function Home() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { agentId, setAgentId } = useAgent();

  useEffect(() => {
    const fetchAgentId = async () => {
      if (!agentId) {
        const supabase = createClient();
        
        // Get the current user's most recent agent
        const { data, error } = await supabase
          .from('user_agent')
          .select('agent_id')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching agent:', error);
          return;
        }
        console.log('Agent data:', data);

        if (data?.agent_id) {
          setAgentId(data.agent_id);
        }
      }
    };

    fetchAgentId();
  }, [agentId, setAgentId]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-[#FFFBF0]">
      <div className="relative h-screen flex flex-col items-center justify-between p-8 pb-20">
        <div className="flex-1 flex items-center justify-center w-full">
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setIsSpeaking(!isSpeaking)}
          >
            <AnimatedAgent isSpeaking={isSpeaking} />
          </div>
        </div>

        {/* <div className="w-full space-y-6">
          <ScrollArea className="w-full max-w-3xl mb-8">
            <div className="flex gap-4 pb-4">
              {mockArticles.map((article) => (
                <div
                  key={article.id}
                  className="w-64 flex-none rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-[#2D12E9] dark:text-[#FFFBF0] line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-black dark:text-[#FFFBF0] line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="text-xs text-[#2D12E9] dark:text-[#FFFBF0] mt-2 block">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="flex gap-4 items-center justify-center">
            <Button
              asChild
              variant="outline"
              className="w-[140px] h-12 rounded-full border-[#2D12E9] dark:border-[#FFFBF0] hover:bg-[#2D12E9]/10 dark:hover:bg-[#FFFBF0]/10 text-[#2D12E9] dark:text-[#FFFBF0]"
            >
              <a href="/create">Add Knowledge</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-[140px] h-12 rounded-full border-[#2D12E9] dark:border-[#FFFBF0] hover:bg-[#2D12E9]/10 dark:hover:bg-[#FFFBF0]/10 text-[#2D12E9] dark:text-[#FFFBF0]"
            >
              <a href="/examples">Create Post</a>
            </Button>
          </div>
        </div> */}

        <InfoIcon />
      </div>
    </div>
  );
}
