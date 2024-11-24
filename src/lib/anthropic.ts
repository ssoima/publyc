import Anthropic from '@anthropic-ai/sdk';

export default async function request_Anthropic(prompt: string) : Promise<any> {
    const anthropic = new Anthropic({
        apiKey: process.env["ANTHROPIC_API_KEY"]
    });

    const msg= await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
    });

    return (msg.content[0] as any).text;

}

export async function getTitleOfPost(thoughts: string) : Promise<any> {
    return await request_Anthropic(`
    You are a writer for a blog and are trying to come up with a title for a new post. Here are the thoughts you have so far:
    ${thoughts}
    Create a succinct, engaging and very short title for the post. Here are a few tips:
    \t•\tClarity is Key: Avoid vague or overly abstract titles. Your audience should immediately understand what the article is about.
\t•\tMake It Intriguing: Use power words or pose a question that resonates with your audience.
\t•\tKeep it Concise: Aim for a title that’s no longer than 10-12 words, and make the most important words appear early.
\t•\tTarget Your Audience: Tailor the language and tone of the title to the software development community.
    
    Example titles: 
    "Winning the Supabase and YC Hackathon"
    "The Future of AI in Content Creation"
    
    Now use this information to craft a title for the post based on the provided thoughts.
    Title:`);
}

export async function getMainContentOfPost(thoughts: string) : Promise<any> {
    return await request_Anthropic(`You are a writer brainstorming a new post for a blog. Based on the thoughts provided:
        ${thoughts}
    Extract the key points that will shape the article. Use the bullet points below to guide your extraction and create a clear structure:

        - **Main Topic or Focus**:
            - What is the primary subject or theme of the post?
            - What problem, idea, or trend is being explored?

        - **Target Audience**:
            - Who is the article for?
            - What is the audience's familiarity with the topic?  

    - **Key Arguments or Ideas**:
        - What are the central points or arguments to convey?
        - Why is this topic significant or relevant?

    - **Supporting Details**:
        - What examples, data, or anecdotes will support the ideas?
        - Are there any tools, methods, or frameworks to include?

    - **Takeaways or Actionable Insights**:
        - What should the reader learn, do, or feel after reading?
        - Are there any specific tips, steps, or recommendations to share?

        Use this extracted information to refine and outline the post, ensuring each point contributes to a clear and engaging article.
        KEY POINTS:
    `);
}

export async function getPostTitleAndContent(thoughts: string, memory: string): Promise<any> {
    const anthropic = new Anthropic({
        apiKey: process.env["ANTHROPIC_API_KEY"]
    });

    const prompt = `
You are a writer tasked with brainstorming and crafting a blog post based on provided thoughts and memory. Your goal is to generate both a title and the main content of the post, returning them as JSON. Use the thoughts as the main idea and incorporate the memory as additional context to enrich the content.

First, you will be given the thoughts and memory. Then, you will craft a title and write the main content following specific guidelines.

Here are the thoughts and memory:

<thoughts>
${thoughts}
</thoughts>

<memory>
${memory}
</memory>

Now, follow these instructions to complete the task:

1. Crafting the Title:
Create a succinct, engaging, and short title for the post. Keep these tips in mind:
- Clarity is Key: Avoid vague or overly abstract titles. Ensure the audience immediately understands the topic.
- Make It Intriguing: Use power words or pose a question that resonates with your audience.
- Keep It Concise: The title should be no longer than 10-12 words, with the most important words appearing early.
- Target Your Audience: Tailor the language and tone of the title to the software development or technical community.

Example titles:
- "Winning the Supabase and YC Hackathon"
- "The Future of AI in Content Creation"

2. Writing the Main Content:
Using the same thoughts and memory, write a single string for the main content that includes:
- Introduction: Hook the reader with an intriguing opening.
- Key Arguments or Ideas: Present the main points or arguments concisely and engagingly.
- Supporting Details: Incorporate the memory to provide examples, anecdotes, or context that enrich the main points.
- Takeaway or Call to Action: End with a conclusion that encourages further thought or engagement.
- If the conversation is short, just take all the ideas from the conversation.

The content should be engaging, clear, and concise, suitable for a blog post or LinkedIn article.

3. Output Format:
Format your response as a JSON object with two keys: "title" and "content". The "title" value should be your generated title, and the "content" value should be your generated main content as a single string.

Please provide your output in the following format:
<output>
{
  "title": "Your Generated Title Here",
  "content": "Your generated main content as a single string here."
}
</output>

Now, based on the provided thoughts and memory, generate the title and main content for the blog post, and return them in the specified JSON format.`;

    try {
        const msg= await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            temperature: 0.5,
            messages: [{ role: "user", content: prompt }],
        });
        return JSON.parse((msg.content[0] as any).text);
    } catch (error) {
        console.error("Error generating post title and content:", error);
        throw error;
    }
}