'use server'
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  if (request.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'user-config.json');
      const fileContents = await fs.readFile(filePath, 'utf8');
      const config = JSON.parse(fileContents);
      return Response.json(config);
    } catch (error) {
      console.error('Error reading user config:', error);
      return Response.json({ error: 'Failed to load user config' }, { status: 500 });
    }
  } else {
    return  Response.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}