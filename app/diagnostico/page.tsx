import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, Download, Share2 } from "lucide-react"
import UploadImageCard from "@/components/UploadImageCard"

export default function Diagnostico() {


  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 flex justify-center">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Diagnóstico de Tuberculose</h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <UploadImageCard />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resultado da Análise</CardTitle>
                  <CardDescription>Diagnóstico gerado por inteligência artificial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative w-full aspect-square max-w-md">
                      <Image
                        src="/lungs.png"
                        fill
                        priority
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Radiografia analisada"
                        className="rounded-lg object-cover border opacity-25 animate-pulse"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 p-3 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm">Probabilidade de Tuberculose:</span>
                              <span className="text-red-600 font-bold">78%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <div className="flex items-center p-4 border rounded-lg bg-amber-50 text-amber-800">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p className="text-sm">
                          <strong>Atenção:</strong> Este resultado sugere alta probabilidade de tuberculose.
                          Recomenda-se consulta médica imediata para confirmação do diagnóstico.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Áreas de Interesse Detectadas:</h3>
                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                          <li>Opacidade no lobo superior direito</li>
                          <li>Infiltrado pulmonar difuso</li>
                          <li>Possível cavitação no ápice pulmonar</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Recomendações:</h3>
                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foregroun">
                          <li>Procurar atendimento médico especializado</li>
                          <li>Realizar teste de escarro para confirmação</li>
                          <li>Considerar isolamento até confirmação do diagnóstico</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex gap-2 w-full">
                    <Button className="flex-1 gap-1">
                      <Download className="h-4 w-4" /> Baixar Relatório
                    </Button>
                    <Button variant="outline" className="flex-1 gap-1">
                      <Share2 className="h-4 w-4" /> Compartilhar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Aviso:</strong> Este resultado é gerado por inteligência artificial e deve ser interpretado
                    por um profissional de saúde qualificado. Não substitui o diagnóstico médico.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}
