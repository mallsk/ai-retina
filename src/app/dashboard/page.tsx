'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResults } from '@/lib/types';

import { classifySeverity } from '@/ai/flows/severity-classification';
import { generateDoctorDashboard } from '@/ai/flows/generate-doctor-dashboard';
import { generatePatientDashboard } from '@/ai/flows/generate-patient-dashboard';
import { analyzeEnhancementFilters } from '@/ai/flows/enhancement-filter-analysis';
import { adaptiveFilterApplication } from '@/ai/flows/adaptive-filter-application';
import { generateEvaluationMetrics } from '@/ai/flows/generate-evaluation-metrics';
import { segmentRetinalImage } from '@/ai/flows/segment-retinal-image';

import { ImageUploader } from '@/components/dashboard/image-uploader';
import { AnalysisDashboard } from '@/components/dashboard/analysis-dashboard';

export default function DashboardPage() {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (dataUri: string) => {
    setImageDataUri(dataUri);
    setResults(null);
    setError(null);
    setIsLoading(true);

    try {
      const [
        severityResult,
        enhancementAnalysisResult,
        adaptiveFilterResult,
        metricsResult,
        segmentationResult,
      ] = await Promise.all([
        classifySeverity({ photoDataUri: dataUri }),
        analyzeEnhancementFilters({ photoDataUri: dataUri }),
        adaptiveFilterApplication({ photoDataUri: dataUri }),
        generateEvaluationMetrics(),
        segmentRetinalImage({ photoDataUri: dataUri }),
      ]);

      const doctorDashboardResult = await generateDoctorDashboard({
        retinalImageDescription: 'User-uploaded retinal image.',
        severityClassification: severityResult.severity,
        confidenceScore: severityResult.confidence,
      });
      
      const patientDashboardResult = await generatePatientDashboard({
        retinalImage: dataUri,
        severityLevel: severityResult.severity,
        confidenceScore: severityResult.confidence,
        keyClinicalFindings: doctorDashboardResult.keyClinicalFindings,
        affectedRetinalRegions: doctorDashboardResult.affectedRetinalRegions,
      });

      setResults({
        severity: severityResult,
        enhancementAnalysis: enhancementAnalysisResult,
        adaptiveFilter: adaptiveFilterResult,
        metrics: metricsResult,
        doctorDashboard: doctorDashboardResult,
        patientDashboard: patientDashboardResult,
        segmentation: segmentationResult,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} imageDataUri={imageDataUri} />
        </div>
        <div className="lg:col-span-3">
          <AnalysisDashboard results={results} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
