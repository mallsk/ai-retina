import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalysisResults } from '@/lib/types';
import { DoctorView } from './doctor-view';
import { PatientView } from './patient-view';
import { EnhancementAnalysis } from './enhancement-analysis';
import { SegmentationView } from './segmentation-view';

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
    <Tabs defaultValue="doctor" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="doctor">Doctor View</TabsTrigger>
        <TabsTrigger value="patient">Patient View</TabsTrigger>
        <TabsTrigger value="filters">Filter Analysis</TabsTrigger>
        <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
      </TabsList>
      <TabsContent value="doctor">
        <DoctorView
          severityClassification={results.severity}
          evaluationMetrics={results.metrics}
          doctorDashboardOutput={results.doctorDashboard}
        />
      </TabsContent>
      <TabsContent value="patient">
        <PatientView patientDashboardOutput={results.patientDashboard} />
      </TabsContent>
      <TabsContent value="filters">
        <EnhancementAnalysis
          enhancementFilterAnalysis={results.enhancementAnalysis}
          adaptiveFilterApplication={results.adaptiveFilter}
        />
      </TabsContent>
      <TabsContent value="segmentation">
        <SegmentationView
          segmentationResult={results.segmentation}
          originalImageUri={results.patientDashboard.retinalImage}
        />
      </TabsContent>
    </Tabs>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
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
