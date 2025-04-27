"use client";

import { ArrowDown, Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import { DragEvent, ChangeEvent, useState } from "react";
import Image from "next/image";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UploadImageCard() {

  const [image, setImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-slate-200");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-slate-200");
  };

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
  
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
  
    if (!res.ok) {
      throw new Error('Erro ao enviar imagem.')
    }
  
    const data = await res.json()
    return data.url // URL pública retornada
  }
  

  const handleDropImage = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-slate-200")
  
    const files = e.dataTransfer.files
  
    if (files.length > 0) {
      const file = files[0]
  
      if (file.type.startsWith("image/")) {
        try {
          setLoadingImage(true)
          const url = await uploadImage(file)
          setImage(url)
        } catch (error) {
          console.error(error)
        } finally {
          setLoadingImage(false)
        }
      } else {
        alert("Por favor enviar apenas imagens (JPEG, PNG, etc...)")
      }
    }
  }
  
  const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  
    const files = e.currentTarget.files
  
    if (files && files[0] !== undefined) {
      const file = files[0]
  
      if (file.type.startsWith("image/")) {
        try {
          setLoadingImage(true)
          const url = await uploadImage(file)
          setImage(url)
        } catch (error) {
          console.error(error)
        } finally {
          setLoadingImage(false)
        }
      } else {
        alert("Por favor enviar apenas imagens (JPEG, PNG, etc...)")
      }
    }
  
    if (files && files[0] == undefined) {
      setImage(null)
    }
  }

  const handleClearSelection = async () => {
    try {
      await fetch('/api/delete-all', { method: 'DELETE' })
      setImage(null)
      console.log("Todas as imagens apagadas com sucesso.")
    } catch (error) {
      console.error("Erro ao apagar as imagens:", error)
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envie sua Radiografia</CardTitle>
        <CardDescription>
          Faça o upload de uma radiografia torácica para análise por nossa IA
        </CardDescription>
      </CardHeader>
      <CardContent className="-my-2">
        {!image && (<div
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 text-center transition-all"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropImage}
        >
            <label htmlFor="imageInput" className="w-full flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="mb-2 text-sm font-semibold">
                Clique para fazer upload ou arraste e solte
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                Suporta JPG ou PNG (máx. 10MB)
                </p>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="imageInput" type="file" onChange={handleSelectImage} aria-label="Selecionar imagem" className="bg-slate-200" />
                </div>
            </label>
        </div>)}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <span className="w-full font-medium italic text-center">
          {!image ? "O preview da imagem aparecerá logo abaixo quando for selecionada." : "Imagem selecionada:"}
        </span>
        <ArrowDown />
        {image ? (
          <div className="border-2 border-slate-300 border-dashed my-4 p-2 w-full flex items-center justify-center rounded-md">
            {loadingImage == true ? (
                <Skeleton className="w-[200px] h-[200px]"/>
            ) : (
                <Image 
                    src={image} 
                    alt="uploaded image" 
                    width={200} height={200} 
                    onLoad={()=>setLoadingImage(false)} 
                    onError={() => console.log("Erro ao carregar a imagem")}
                />
            )}
          </div>
        ) : null}
        {image && (
            <div className="flex gap-2">
                <Button className="bg-emerald-700 cursor-pointer">
                    Analisar imagem
                </Button>
                <Button className="cursor-pointer hover:bg-red-950" variant={"destructive"} onClick={handleClearSelection}>
                    Limpar seleção
                </Button>
            </div> 
        )}
      </CardFooter>
    </Card>
  );
}
