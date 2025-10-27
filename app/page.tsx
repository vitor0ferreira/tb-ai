import Link from "next/link"
import Image from "next/image"
import { BsFillLungsFill, BsImages } from "react-icons/bs"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-10 justify-center mt-8 items-center mb-8 md:mb-4">
        <BsFillLungsFill className="animate-pulse size-32 md:size-48"/>
        <span className="text-7xl sm:text-8xl md:text-9xl font-bold">TB.AI</span>
      </div>

      <main className="flex-1">
        <section className="w-full md:py-8 lg:py-12 border-slate-700/30 bg-gradient-to-b from-white to-sky-50">
          <div className="container py-2 px-4 md:px-6 flex items-center mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold tracking-tighter text-center lg:text-left sm:text-4xl md:text-5xl lg:text-6xl/18">
                    Diagnóstico de Tuberculose por Inteligência Artificial
                  </h1>
                  <p className="max-w-full sm:max-w-[720px] lg:max-w-[600px] text-muted-foreground text-center lg:text-left text-lg sm:text-xl md:text-2xl">
                    Utilizando redes neurais avançadas para análise de radiografias e diagnóstico preciso de
                    tuberculose.
                  </p>
                </div>
                <div className="flex flex-col items-center mx-auto lg:mx-0 gap-4 min-[400px]:flex-row">
                  <Link href="/diagnostico">
                    <Button className="sm:text-lg cursor-pointer">
                      Iniciar Diagnóstico
                    </Button>
                  </Link>
                  <Link href="#como-funciona">
                    <Button className="sm:text-lg cursor-pointer" variant={"outline"}>
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/lungs.png"
                  width={500}
                  height={400}
                  alt="Radiografia de pulmão"
                  className="rounded-lg object-cover border shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32 border-slate-700/30 ">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl">Como Funciona</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed">
                  Nossa tecnologia utiliza algoritmos de aprendizado profundo para analisar radiografias torácicas e
                  identificar sinais de tuberculose.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BsImages size={32}/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Envie sua Radiografia</h3>
                  <p className="text-muted-foreground text-lg">
                    Faça o upload da radiografia torácica em formato digital para análise.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                    className="h-10 w-10"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Processamento por IA</h3>
                  <p className="text-muted-foreground text-lg">
                    Nossa rede neural analisa a imagem identificando padrões associados à tuberculose.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Resultados Rápidos</h3>
                  <p className="text-muted-foreground text-lg">
                    Receba um relatório detalhado com a probabilidade de tuberculose em minutos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="w-full flex items-center justify-around py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50 border-slate-700/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl">Sobre o Projeto</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed">
                    O TB.AI é um projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas do IFTM Parque Avançado Uberaba com o objetivo de auxiliar no
                    diagnóstico precoce da tuberculose, especialmente em regiões com acesso limitado a especialistas.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed">
                    Nossa tecnologia utiliza redes neurais convolucionais treinadas com milhares de radiografias para
                    identificar padrões associados à tuberculose com alta precisão.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/doctors.png"
                  width={500}
                  height={400}
                  alt="Equipe médica analisando radiografias"
                  className="rounded-lg object-cover border shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="equipe" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nossa Equipe</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conheça os profissionais por trás do desenvolvimento desta tecnologia inovadora.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Image
                  src="/fotos/ferreira.png"
                  width={200}
                  height={200}
                  alt="Vitor Hugo Ferreira"
                  className="rounded-full object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Vitor Hugo Ferreira</h3>
                  <p className="text-muted-foreground">Desenvolvedor Front-end</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Image
                  src="/fotos/anaclara.png"
                  width={200}
                  height={200}
                  alt="Dr. Carlos Oliveira"
                  className="rounded-full object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Ana Clara Ribeiro</h3>
                  <p className="text-muted-foreground">UI/UX Designer e Ilustradora</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Image
                  src="/fotos/vinicios.png"
                  width={200}
                  height={200}
                  alt="Dra. Mariana Santos"
                  className="rounded-full object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Vinicios Balduíno</h3>
                  <p className="text-muted-foreground">Matemático e Professor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-gradient-to-b from-white to-sky-50">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Entre em Contato</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tem dúvidas ou gostaria de implementar nossa tecnologia em sua instituição? Entre em contato conosco.
              </p>
            </div>
            <div className="bg-white flex flex-col gap-4 rounded-lg border p-6 shadow-lg">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Digite seu email"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Digite sua mensagem"
                  />
                </div>
              </div>
              <button className="px-4 py-2 self-center text-xl text-white rounded-md bg-slate-800 font-semibold cursor-pointer hover:bg-slate-600 hover:outline w-min">
                Enviar
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full flex flex-col items-center">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-semibold">TB.AI</span>
            </div>
            <p className="text-lg text-center text-muted-foreground">Diagnóstico de tuberculose por inteligência artificial</p>
          </div>
          <div className="md:ml-auto grid px-5 gap-8 grid-cols-2 sm:grid-cols-3">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Navegação</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="hover:underline">
                  Início
                </Link>
                <Link href="#sobre" className="hover:underline">
                  Sobre
                </Link>
                <Link href="#como-funciona" className="hover:underline">
                  Como Funciona
                </Link>
                <Link href="#equipe" className="hover:underline">
                  Equipe
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Recursos</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="hover:underline">
                  Documentação
                </Link>
                <Link href="#" className="hover:underline">
                  Pesquisas
                </Link>
                <Link href="#" className="hover:underline">
                  Publicações
                </Link>
                <Link href="#" className="hover:underline">
                  FAQ
                </Link>
              </nav>
            </div>
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="hover:underline">
                  Termos de Uso
                </Link>
                <Link href="#" className="hover:underline">
                  Política de Privacidade
                </Link>
                <Link href="#" className="hover:underline">
                  Aviso Médico
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
