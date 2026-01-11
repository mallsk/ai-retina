'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SegmentRetinalImageOutput } from '@/ai/types/segment-retinal-image';
import { Disc, Bot, TestTube } from 'lucide-react';

interface SegmentationViewProps {
  segmentationResult: SegmentRetinalImageOutput;
  originalImageUri: string;
}

function InfoItem({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <h4 className="flex items-center text-md font-semibold mb-2">
                <Icon className="w-5 h-5 mr-2 text-primary"/>
                {title}
            </h4>
            <p className="text-sm text-muted-foreground">{content}</p>
        </div>
    )
}

export function SegmentationView({ segmentationResult }: SegmentationViewProps) {
  const { opticDiscDescription, vesselsDescription, lesionsDescription, segmentationSummary } = segmentationResult;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conceptual Segmentation Analysis</CardTitle>
        <CardDescription>
          The AI has analyzed key anatomical features and potential abnormalities based on the image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem 
                icon={Disc}
                title="Optic Disc Analysis"
                content={opticDiscDescription}
            />
            <InfoItem 
                icon={Bot} // Representing blood vessels as a network
                title="Blood Vessels Analysis"
                content={vesselsDescription}
            />
            <InfoItem 
                icon={TestTube} // Representing lesions/abnormalities
                title="Lesions Analysis"
                content={lesionsDescription}
            />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Segmentation Summary</h4>
          <p className="text-sm text-muted-foreground">{segmentationSummary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
