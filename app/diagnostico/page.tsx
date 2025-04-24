import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertTriangle, ArrowLeft, Download, Share2 } from "lucide-react"
import { BsFillLungsFill } from "react-icons/bs"

export default function Diagnostico() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b w-full flex justify-center">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BsFillLungsFill className="h-6 w-6 text-primary" />
            <span className="text-lg md:text-3xl font-semibold">TB.AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-2xl">
            <Link href="#sobre" className="font-medium hover:underline underline-offset-4">
              Sobre
            </Link>
            <Link href="#como-funciona" className="font-medium hover:underline underline-offset-4">
              Como Funciona
            </Link>
            <Link href="#equipe" className="font-medium hover:underline underline-offset-4">
              Equipe
            </Link>
            <Link href="#contato" className="font-medium hover:underline underline-offset-4">
              Contato
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
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
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua Radiografia</CardTitle>
                  <CardDescription>Faça o upload de uma radiografia torácica para análise por nossa IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="mb-2 text-sm font-semibold">Clique para fazer upload ou arraste e solte</p>
                    <p className="text-xs text-muted-foreground mb-4">Suporta JPG ou PNG (máx. 10MB)</p>
                    <Button>Selecionar Arquivo</Button>
                  </div>
                </CardContent>
              </Card>
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
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TBScan. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground md:ml-auto md:text-right">
            <strong>Aviso:</strong> Esta ferramenta é um auxílio ao diagnóstico e não substitui a avaliação de um
            profissional de saúde.
          </p>
        </div>
      </footer>
    </div>
  )
}
