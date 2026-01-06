import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        const stmt = db.prepare('INSERT INTO ContactMessage (name, email, message) VALUES (?, ?, ?)');
        const result = stmt.run(name, email, message);

        return NextResponse.json({
            success: true,
            message: {
                id: result.lastInsertRowid,
                name,
                email,
                message
            }
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
