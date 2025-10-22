import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma-client/client';

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
      client_ip: data.client_ip,
      created_at: now,
      duration_ms: data.duration_ms || null,
      error: data.error || null,
      status: data.status
    }
  })
}

export async function POST(request: NextRequest) {
  
  // CAPTURA O IP DO CLIENTE.
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'IP_NAO_ENCONTRADO';

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
        user_id: '10',
        client_ip: ipAddress,
        duration_ms: Number(requestDuration.toFixed(2)),
        error: errorData.error,
        status: 'Erro na IA',
      });
      
      return NextResponse.json({ error: 'Erro na API de IA' }, { status: aiResponse.status });
    }

    const analysisResult = await aiResponse.json();

    // FAZ O LOG NO BANCO DE DADOS
    await logToDatabase({
        user_id: '10',
        client_ip: ipAddress,
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
      user_id: '10',
      client_ip: ipAddress,
      status: 'Erro interno',
      error: (error as Error).message
    });
    
    return NextResponse.json({ error: 'ERRO INTERNO DO SERVIDOR: \n' + error }, { status: 500 });
  }
}   