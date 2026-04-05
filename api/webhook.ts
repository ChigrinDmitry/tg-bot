import type { IncomingMessage, ServerResponse } from 'http';
import type { Update } from 'grammy/types';
import { bot } from '../src/bot';

let initialized = false;

async function readBody(req: IncomingMessage & { body?: unknown }): Promise<Update | null> {
    if (req.body != null) {
        if (typeof req.body === 'object') return req.body as Update;
        if (typeof req.body === 'string') {
            try { return JSON.parse(req.body); } catch { return null; }
        }
    }
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    if (!chunks.length) return null;
    try {
        return JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
        return null;
    }
}

export default async function handler(
    req: IncomingMessage & { method?: string; body?: unknown },
    res: ServerResponse,
): Promise<void> {
    if (req.method !== 'POST') {
        res.writeHead(405).end('Method Not Allowed');
        return;
    }
    try {
        if (!initialized) {
            await bot.init();
            initialized = true;
        }
        const update = await readBody(req);
        if (!update) {
            res.writeHead(400).end('Bad Request');
            return;
        }
        await bot.handleUpdate(update);
        res.writeHead(200).end();
    } catch (err) {
        console.error('[webhook]', err);
        res.writeHead(500).end('Internal Server Error');
    }
}