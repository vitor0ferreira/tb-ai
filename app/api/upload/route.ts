
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Caminho onde o arquivo será salvo
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const fileName = `${Date.now()}-${file.name}` // Evitar conflitos
  const filePath = path.join(uploadDir, fileName)

  await writeFile(filePath, buffer)

  // URL pública
  const fileUrl = `/uploads/${fileName}`

  return NextResponse.json({ url: fileUrl })
}
