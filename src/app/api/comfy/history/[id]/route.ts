import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const response = await fetch(`http://127.0.0.1:8188/history/${id}`);
        const raw_data = await response.json();
        
        if (!raw_data || Object.keys(raw_data).length === 0) {
            return NextResponse.json({ status: 'pending' });
        } 
        
        const data = raw_data[id];
        if (data?.status?.status_str === 'success' && data?.status?.completed) {
            const filename = data.outputs["9"].images[0].filename;
            const subfolder = data.outputs["9"].images[0].subfolder;
            const type = data.outputs["9"].images[0].type;
            
            const url = `http://127.0.0.1:8188/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
            const imageResponse = await fetch(url);
            const imageBuffer = await imageResponse.arrayBuffer();
            
            return new NextResponse(Buffer.from(imageBuffer), {
                headers: {
                    'Content-Type': 'image/png'
                }
            });
        } else {
            return NextResponse.json({ status: 'generating' });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}