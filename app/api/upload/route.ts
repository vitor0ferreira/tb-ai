import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Imagem não fornecida" }, { status: 400 });
    }

    // Aqui vai ser onde vou enviar a imagem pro backend da aplicação de análise
    // quando estiver pronta e retornar o resultado pro cliente depois.

    console.log("Recebi imagem base64, tamanho:", imageBase64.length);

    return NextResponse.json({ message: "Imagem recebida com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
