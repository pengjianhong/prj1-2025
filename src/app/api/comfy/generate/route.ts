import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, img, wf } = body;
        
        let prompt_template = require(`@/templates/${wf}.json`);
        prompt_template["6"]["inputs"]["text"] = prompt;
        prompt_template["10"]["inputs"]["image"] = img;
        
        const response = await fetch("http://127.0.0.1:8188/prompt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt_template,
                client_id: 1
            }),
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}