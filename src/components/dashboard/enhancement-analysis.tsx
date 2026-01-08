import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdaptiveFilterApplicationOutput } from '@/ai/types/adaptive-filter-application';
import { EnhancementFilterAnalysisOutput } from '@/ai/types/enhancement-filter-analysis';
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conventional Filter Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filter</TableHead>
                <TableHead className="text-center">Vessel Enhancement</TableHead>
                <TableHead className="text-center">Lesion Visibility</TableHead>
                <TableHead className="text-center">Noise Reduction</TableHead>
                <TableHead>Strengths</TableHead>
                <TableHead>Limitations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancementFilterAnalysis.analysis.map((filter) => (
                <TableRow key={filter.filterName}>
                  <TableCell className="font-medium">{filter.filterName}</TableCell>
                  <TableCell className="text-center">{filter.vesselEnhancement}/10</TableCell>
                  <TableCell className="text-center">{filter.lesionVisibility}/10</TableCell>
                  <TableCell className="text-center">{filter.noiseReduction}/10</TableCell>
                  <TableCell>{filter.strengths}</TableCell>
                  <TableCell>{filter.limitations}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
