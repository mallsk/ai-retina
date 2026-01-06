import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdaptiveFilterApplicationOutput } from '@/ai/flows/adaptive-filter-application';
import { EnhancementFilterAnalysisOutput } from '@/ai/flows/enhancement-filter-analysis';

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
