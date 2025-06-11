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
import { DragEvent, useState, useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface UploadImageCardProps {
  setImageAnalyzed: Dispatch<SetStateAction<string | null | undefined>>;
  setPorcentageAnalyzed: Dispatch<SetStateAction<number | undefined>>;
}

export default function UploadImageCard({ setImageAnalyzed, setPorcentageAnalyzed }: UploadImageCardProps) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-slate-200");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-slate-200");
  };

  function isValidImage(file: File) {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSizeInMB = 10;
  
    const isImage = validTypes.includes(file.type);
    const isSizeOk = file.size <= maxSizeInMB * 1024 * 1024;
  
    return isImage && isSizeOk;
  }
  


  const handleSendImage = async () => {
    if (!selectedFile) return;

    const apiUrl = 'https://vitor0ferreira-tb-ai-api.hf.space/predict';

    const formData = new FormData();
    formData.append('file', selectedFile);

    setImageAnalyzed(imagePreview)

    try {
      setSending(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
            const result = await response.json();
            console.log("Análise recebida:", result);
            setPorcentageAnalyzed(result.probability_tuberculosis)
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.error}`);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com a API de análise.");
    } finally {
        setSending(false);
    }
  };

  
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file)

    if(isValidImage(file))  {
      setLoadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setLoadingImage(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Envie apenas arquivos de imagem válidos (JPEG ou PNG, de no máximo 10MB)")
    }
  };

  const handleDropImage = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-slate-200");

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      setSelectedFile(file)

      if(isValidImage(file)){
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setLoadingImage(false);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Envie apenas arquivos de imagem válidos (JPEG ou PNG, de no máximo 10MB)")
      }
    }
  };


  const handleClearSelection = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setImageAnalyzed(null)
    setPorcentageAnalyzed(0)
    setLoadingImage(false)
    if (inputRef.current) {
      inputRef.current.value = "";
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
        {!imagePreview && (
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
          {!imagePreview
            ? "O preview da imagem aparecerá logo abaixo quando for selecionada."
            : "Imagem selecionada:"}
        </span>
        <ArrowDown />
        {imagePreview ? (
          <div className="border-2 border-slate-300 border-dashed my-4 p-2 w-full flex items-center justify-center rounded-md">
            {loadingImage ? (
              <Skeleton className="w-[200px] h-[200px]" />
            ) : (
              <Image
                src={imagePreview}
                alt="uploaded image"
                width={200}
                height={200}
                style={{width:'auto'}}
                onLoad={() => setLoadingImage(false)}
                onError={() => console.log("Erro ao carregar a imagem")}
              />
            )}
          </div>
        ) : null}
        {imagePreview && (
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
