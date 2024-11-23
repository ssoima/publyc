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
    You are a writer for a tech blog and are trying to come up with a title for a new post. Here are the thoughts you have so far:
    ${thoughts}
    Create a succinct, engaging and very short title for the post. Here are a few tips:
    \t•\tClarity is Key: Avoid vague or overly abstract titles. Your audience should immediately understand what the article is about.
\t•\tMake It Intriguing: Use power words or pose a question that resonates with your audience.
\t•\tKeep it Concise: Aim for a title that’s no longer than 10-12 words, and make the most important words appear early.
\t•\tTarget Your Audience: Tailor the language and tone of the title to the software development community.
    Not use this information to craft a title for the post.
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



