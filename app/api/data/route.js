import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    try {
      return NextResponse.json(JSON.parse(data));
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({ months: {}, purposes: [] });
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ months: {}, purposes: [] });
    }
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
