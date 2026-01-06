import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdaptiveFilterApplicationOutput } from '@/ai/flows/adaptive-filter-application';
import { EnhancementFilterAnalysisOutput } from '@/ai/flows/enhancement-filter-analysis';
import { Lightbulb } from 'lucide-react';

interface EnhancementAnalysisProps {
  enhancementFilterAnalysis: EnhancementFilterAnalysisOutput;
  adaptiveFilterApplication: AdaptiveFilterApplicationOutput;
}

export function EnhancementAnalysis({
  enhancementFilterAnalysis,
  adaptiveFilterApplication,
}: EnhancementAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className='flex items-center gap-4'>
                <span className='font-medium'>Best Conventional Filter:</span>
                <Badge>{enhancementFilterAnalysis.bestFilter}</Badge>
            </div>
            <div>
                <h4 className="flex items-center text-md font-semibold mb-1">
                    <Lightbulb className="w-5 h-5 mr-2 text-primary"/>
                    Reasoning
                </h4>
                <p className="text-sm text-muted-foreground pl-7">{enhancementFilterAnalysis.reasoning}</p>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Proposed Novel Filter: ACP-REF</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{adaptiveFilterApplication.explanation}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conventional Filter Analysis</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">{enhancementFilterAnalysis.analysis}</p>
        </CardContent>
      </Card>
    </div>
  );
}
