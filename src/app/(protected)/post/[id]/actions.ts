import request_Anthropic from "@/lib/anthropic";

const SYSTEM_PROMPT = ""

export async function createLinkedinPost( msg: string) : Promise<any> {
    const LINKEDIN_PROMPT = "say hello I created a linkedin post"
    const prompt = `${LINKEDIN_PROMPT} ${msg} ${SYSTEM_PROMPT}`
    return await request_Anthropic(prompt);
}