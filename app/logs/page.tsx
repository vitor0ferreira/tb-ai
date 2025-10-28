import { auth } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma-client/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaDatabase, FaInfoCircle } from "react-icons/fa";

const prisma = new PrismaClient();

export default async function LogsPage() {

  const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session){
    redirect("/sign-in");
  }

  const logs = await prisma.analysisLog.findMany({
    orderBy: { created_at: "desc" },
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  //Inferências simples sobre os dados
  const totalLogs = logs.length;
  const lastLog = logs[0];
  const usersInvolved = new Set(logs.map((l) => l.userId)).size;
  const errorLogs = logs.filter((l) => l.error != null).length;
  const mediaTempoResposta = logs.length > 0
    ? logs.reduce((acc, log) => acc + (log.duration_ms || 0), 0) / logs.length
    : 0;
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-sky-50">
      <main className="flex-1 w-full py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <FaDatabase className="text-sky-600" size={64} />
            <h1 className="text-5xl font-bold">Logs do Sistema</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Acompanhe os registros do sistema, suas origens e eventos importantes.
            </p>
          </div>

          {/* Estatísticas */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="rounded-lg border bg-white p-4 shadow-sm text-center">
              <h3 className="text-xl font-semibold">Total</h3>
              <p className="text-4xl font-bold text-sky-700">{totalLogs}</p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm text-center">
              <h3 className="text-xl font-semibold">Usuários Únicos</h3>
              <p className="text-4xl font-bold text-sky-700">{usersInvolved}</p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm text-center">
              <h3 className="text-xl font-semibold">Erros</h3>
              <p className="text-4xl font-bold text-red-600">{errorLogs}</p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm text-center">
              <h3 className="text-xl font-semibold">Tempo de Resposta</h3>
              <p className="text-4xl font-bold text-yellow-600">~{mediaTempoResposta.toFixed(2)}<span className="text-sm">{' '}ms</span></p>
            </div>
          </section>

          {/* Último log registrado */}
          {lastLog && (
            <section className="rounded-lg border bg-white p-6 shadow-md mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FaInfoCircle className="text-sky-600" size={28} />
                <h2 className="text-2xl font-bold">Última Requisição</h2>
              </div>
              <div className="space-y-2 text-muted-foreground text-lg">
                <p><strong>ID:</strong> {lastLog.id}</p>
                <p><strong>Resultado:</strong> {(Math.fround(lastLog.probability_tuberculosis as number)*100).toFixed(3)}%</p>
                <p><strong>Status:</strong> {lastLog.status}</p>
                <p><strong>Data:</strong> {new Date(lastLog.created_at).toLocaleString("pt-BR")}</p>
                {lastLog.userId && <p><strong>ID do Usuário:</strong> {lastLog.userId}</p>}
              </div>
            </section>
          )}

          {/* Tabela de logs */}
          <section>
            <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="px-4 py-3 border-b text-lg font-semibold">ID</th>
                    <th className="px-4 py-3 border-b text-lg font-semibold">Usuário</th>
                    <th className="px-4 py-3 border-b text-lg font-semibold">Resultado</th>
                    <th className="px-4 py-3 border-b text-lg font-semibold">IP</th>
                    <th className="px-4 py-3 border-b text-lg font-semibold">Status</th>
                    <th className="px-4 py-3 border-b text-lg font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className={`border-b hover:bg-sky-50 transition ${
                        log.error != null
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      <td className="px-4 py-3">{log.id}</td>
                      <td className="px-4 py-3">{users.filter((user)=> user.id == log.userId)[0].name}</td>
                      <td className="px-4 py-3 font-semibold">
                        {log.probability_tuberculosis && (Math.fround(log.probability_tuberculosis as number)*100).toFixed(3)}
                        {log.probability_tuberculosis && "%"}
                      </td>
                      <td className="px-4 py-3">{log.client_ip}</td>
                      <td className="px-4 py-3">{log.status}</td>
                      <td className="px-4 py-3">{new Date(log.created_at).toLocaleString("pt-BR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}