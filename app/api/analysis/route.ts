import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma-client/client';
import { auth } from '@/lib/auth';
import { headers } from "next/headers"

const prisma = new PrismaClient()

interface LogData {
  user_id: string,
  client_ip: string,
  error?: string,
  status: string,
  probability_tuberculosis?: number | null,
  duration_ms?: number,
}

// Função para fazer a requisição de log (que salvará no BD)
async function logToDatabase(data: LogData) {
  const now = new Date();

  await prisma.analysisLog.create({
    data: {
      userId: data.user_id,
      client_ip: data.client_ip,
      created_at: now,
      duration_ms: data.duration_ms || null,
      probability_tuberculosis: data.probability_tuberculosis,
      error: data.error || null,
      status: data.status
    }
  })
}

export async function POST(request: NextRequest) {
  
  // CAPTURA O IP DO CLIENTE.
  const session = await auth.api.getSession({
        headers: await headers()
    })

  if(!session){
    return NextResponse.json({ error: 'Precisa estar logado para fazer diagnostico' }, { status: 401 });
  }
  const ipSession = session?.session.ipAddress;

  const userId = session?.user.id;

  const startRequestTime = performance.now();

  try {
    const formData = await request.formData();

    // ENVIA PARA A API EXTERNA QUE TEM O MODELO
    const apiUrl = 'https://vitor0ferreira-tb-ai-api.hf.space/predict';

    const aiResponse = await fetch(apiUrl, {
      method: "POST",
      body: formData, // Reusa o FormData do cliente
    });

    const endRequestTime = performance.now();
    const requestDuration = endRequestTime - startRequestTime;

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      
      // LOG DE ERRO (incluindo IP)
      await logToDatabase({
        user_id: userId as string,
        client_ip: ipSession as string,
        duration_ms: Number(requestDuration.toFixed(2)),
        error: errorData.error,
        status: 'Erro na IA',
      });
      
      return NextResponse.json({ error: 'Erro na API de IA' }, { status: aiResponse.status });
    }

    const analysisResult = await aiResponse.json();

    // FAZ O LOG NO BANCO DE DADOS
    await logToDatabase({
        user_id: userId as string,
        client_ip: ipSession as string,
        duration_ms: Number(requestDuration.toFixed(2)),
        status: 'Sucesso',
        probability_tuberculosis: analysisResult.probability_tuberculosis,
    });

    // RETORNA O RESULTADO PARA O CLIENTE
    return NextResponse.json(analysisResult, { status: 200 });
    
  } catch (error) {
    console.error('Erro no Route Handler:', error);
    
    // LOG DE ERRO INTERNO (incluindo IP)
    await logToDatabase({
      user_id: userId as string,
      client_ip: ipSession as string,
      status: 'Erro interno',
      error: (error as Error).message
    });
    
    return NextResponse.json({ error: 'ERRO INTERNO DO SERVIDOR: \n' + error }, { status: 500 });
  }
}   