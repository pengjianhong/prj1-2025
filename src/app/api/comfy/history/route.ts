import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://127.0.0.1:8188/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const rawdatas = await response.json();
        const history_kv: Record<string, string> = {};
        
        for (const [id, data] of Object.entries(rawdatas)) {
            if ((data as any).status?.status_str === 'success' && (data as any).status?.completed) {
                history_kv[id] = 'success';
            } else {
                history_kv[id] = 'pending';
            }
        }
        
        return NextResponse.json(history_kv);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}