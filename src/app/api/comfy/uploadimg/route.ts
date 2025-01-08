import { NextResponse } from 'next/server';

// 不再需要 config 配置，因为 App Router 默认支持 formData
export async function POST(request: Request) {
    try {
        // 直接从请求中获取 formData
        const formData = await request.formData();
        
        const response = await fetch('http://127.0.0.1:8188/upload/image', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'User-Agent': 'PostmanRuntime-ApipostRuntime/1.1.0',
            },
            body: formData, // 直接传递 formData
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to upload image" }, 
            { status: 500 }
        );
    }
}
