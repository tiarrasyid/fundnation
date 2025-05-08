import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.formData();

  const mediaFiles = data.getAll('mediaUrls'); // Asumsikan URL sudah di-generate
  const project = await prisma.project.create({
    data: {
      name: data.get('name') as string,
      category: data.get('category') as string,
      description: data.get('description') as string,
      donation: parseInt(data.get('donation') as string),
      deadline: new Date(data.get('deadline') as string),
      notes: data.get('notes') as string || null,
      mediaUrls: mediaFiles.map(url => url.toString()),
    }
  });

  return NextResponse.json(project);
}

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(projects);
}
