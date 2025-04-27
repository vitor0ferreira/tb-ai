
import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function DELETE() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  try {
    const files = await fs.readdir(uploadDir)

    const deletePromises = files.map(file => 
      fs.unlink(path.join(uploadDir, file))
    )

    await Promise.all(deletePromises)

    return NextResponse.json({ message: "Todas as imagens foram apagadas." })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erro ao apagar as imagens." }, { status: 500 })
  }
}
