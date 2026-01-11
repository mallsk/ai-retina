import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AnalysisResults } from '@/lib/types';
import { EnhancementAnalysis } from './enhancement-analysis';
import { Eye } from 'lucide-react';

interface AnalysisDashboardProps {
  results: AnalysisResults | null;
  isLoading: boolean;
  error: string | null;
}

export function AnalysisDashboard({ results, isLoading, error }: AnalysisDashboardProps) {
  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Analysis Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>An error occurred during the analysis. Please try again.</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="flex h-full min-h-[400px] items-center justify-center">
        <CardContent className="text-center">
          <h3 className="text-lg font-medium">Awaiting Image</h3>
          <p className="text-muted-foreground">Upload an image or select a sample to view the AI analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <EnhancementAnalysis
        enhancementFilterAnalysis={results.enhancementAnalysis}
        adaptiveFilterApplication={results.adaptiveFilter}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-primary" />
            Segmentation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming Soon: Detailed segmentation of retinal features will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>
    </div>
  );
}
