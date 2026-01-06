'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FileUp, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (dataUri: string) => void;
  isLoading: boolean;
  imageDataUri: string | null;
}

export function ImageUploader({ onImageSelect, isLoading, imageDataUri }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Retinal Image Analysis</CardTitle>
        <CardDescription>Upload an image or select a sample to begin diagnosis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative aspect-video w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 z-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium text-foreground">Analyzing Image...</p>
            </div>
          )}
          {imageDataUri ? (
            <Image
              src={imageDataUri}
              alt="Uploaded retina"
              fill
              className="object-contain rounded-lg p-2"
            />
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <p>Image preview will appear here</p>
            </div>
          )}
        </div>

        <Button onClick={handleButtonClick} disabled={isLoading} className="w-full">
          <FileUp className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Or select a sample:</p>
          <div className="grid grid-cols-3 gap-2">
            {PlaceHolderImages.map((image) => (
              <button
                key={image.id}
                onClick={() => onImageSelect(image.imageUrl)}
                disabled={isLoading}
                className="relative aspect-video w-full overflow-hidden rounded-md border transition-all hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={image.description}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
