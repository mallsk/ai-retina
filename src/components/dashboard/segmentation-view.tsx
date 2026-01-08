'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SegmentRetinalImageOutput } from '@/ai/types/segment-retinal-image';

interface SegmentationViewProps {
  segmentationResult: SegmentRetinalImageOutput;
  originalImageUri: string;
}

export function SegmentationView({ segmentationResult, originalImageUri }: SegmentationViewProps) {
  const [showOpticDisc, setShowOpticDisc] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [showLesions, setShowLesions] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retinal Segmentation</CardTitle>
        <CardDescription>
          The AI has segmented the image to identify key anatomical features and potential abnormalities. Toggle the masks to explore the results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="relative col-span-2 aspect-video w-full rounded-lg border bg-muted">
            <Image
              src={originalImageUri}
              alt="Original Retinal Image"
              fill
              className="object-contain rounded-lg"
            />
            {showOpticDisc && (
              <Image
                src={segmentationResult.opticDiscMask}
                alt="Optic Disc Segmentation"
                fill
                className="object-contain opacity-70"
              />
            )}
            {showVessels && (
              <Image
                src={segmentationResult.vesselsMask}
                alt="Vessels Segmentation"
                fill
                className="object-contain opacity-70"
              />
            )}
            {showLesions && (
              <Image
                src={segmentationResult.lesionsMask}
                alt="Lesions Segmentation"
                fill
                className="object-contain opacity-70"
              />
            )}
          </div>
          <div className="space-y-4 rounded-lg border p-4">
            <h4 className="font-semibold">Toggle Layers</h4>
            <div className="flex items-center space-x-2">
              <Switch id="optic-disc-switch" checked={showOpticDisc} onCheckedChange={setShowOpticDisc} />
              <Label htmlFor="optic-disc-switch" className="flex items-center">
                <span className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: '#FFD700' }} />
                Optic Disc
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="vessels-switch" checked={showVessels} onCheckedChange={setShowVessels} />
              <Label htmlFor="vessels-switch" className="flex items-center">
                <span className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: '#00FFFF' }} />
                Vessels
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="lesions-switch" checked={showLesions} onCheckedChange={setShowLesions} />
              <Label htmlFor="lesions-switch" className="flex items-center">
                <span className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: '#FF00FF' }} />
                Lesions
              </Label>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Segmentation Summary</h4>
          <p className="text-sm text-muted-foreground">{segmentationResult.segmentationSummary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
