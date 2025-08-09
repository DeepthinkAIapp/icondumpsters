import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Icon Dumpsters API is running'
  });
}
