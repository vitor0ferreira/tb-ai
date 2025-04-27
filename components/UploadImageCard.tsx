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
import { DragEvent, useState, useRef } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UploadImageCard() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Funções de Drag and Drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-slate-200");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-slate-200");
  };

  // Enviar imagem para o servidor
  const handleSendImage = async () => {
    if (!imageBase64) return;

    try {
      setSending(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64 }),
      });

      if (response.ok) {
        alert("Imagem enviada com sucesso!");
      } else {
        alert("Erro ao enviar imagem");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem");
    } finally {
      setSending(false);
    }
  };

  // Função que lida com a seleção de uma imagem
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingImage(true); // Começa o carregamento da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string); // Quando a imagem estiver carregada
      setLoadingImage(false); // Remove o skeleton
    };
    reader.readAsDataURL(file);
  };

  const handleDropImage = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-slate-200");

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string); // Quando a imagem estiver carregada
        setLoadingImage(false); // Remove o skeleton
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para limpar a seleção da imagem
  const handleClearSelection = () => {
    setImageBase64(null);
    setLoadingImage(false);
    if (inputRef.current) {
      inputRef.current.value = ""; // Limpa o input
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envie sua Radiografia</CardTitle>
        <CardDescription>
          Faça o upload de uma radiografia torácica para análise por nossa IA
        </CardDescription>
      </CardHeader>
      <CardContent className="-my-2">
        {!imageBase64 && (
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 text-center transition-all"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropImage}
          >
            <label
              htmlFor="imageInput"
              className="w-full flex flex-col items-center justify-center"
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="mb-2 text-sm font-semibold">
                Clique para fazer upload ou arraste e solte
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Suporta JPG ou PNG (máx. 10MB)
              </p>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  id="imageInput"
                  type="file"
                  onChange={handleSelectImage}
                  aria-label="Selecionar imagem"
                  className="bg-slate-200"
                />
              </div>
            </label>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <span className="w-full font-medium italic text-center">
          {!imageBase64
            ? "O preview da imagem aparecerá logo abaixo quando for selecionada."
            : "Imagem selecionada:"}
        </span>
        <ArrowDown />
        {imageBase64 ? (
          <div className="border-2 border-slate-300 border-dashed my-4 p-2 w-full flex items-center justify-center rounded-md">
            {loadingImage ? (
              <Skeleton className="w-[200px] h-[200px]" />
            ) : (
              <Image
                src={imageBase64}
                alt="uploaded image"
                width={200}
                height={200}
                onLoad={() => setLoadingImage(false)}
                onError={() => console.log("Erro ao carregar a imagem")}
              />
            )}
          </div>
        ) : null}
        {imageBase64 && (
          <div className="flex gap-2">
            <Button
              className="bg-emerald-700 cursor-pointer"
              disabled={sending}
              onClick={handleSendImage}
            >
              Analisar imagem
            </Button>
            <Button
              className="cursor-pointer hover:bg-red-950"
              variant={"destructive"}
              onClick={handleClearSelection}
            >
              Limpar seleção
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
