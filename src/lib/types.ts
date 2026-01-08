import type { ClassifySeverityOutput } from '@/ai/types/severity-classification';
import type { GenerateDoctorDashboardOutput } from '@/ai/types/generate-doctor-dashboard';
import type { PatientDashboardOutput } from '@/ai/types/generate-patient-dashboard';
import type { EnhancementFilterAnalysisOutput } from '@/ai/types/enhancement-filter-analysis';
import type { AdaptiveFilterApplicationOutput } from '@/ai/types/adaptive-filter-application';
import type { EvaluationMetricsOutput } from '@/ai/types/generate-evaluation-metrics';
import type { SegmentRetinalImageOutput } from '@/ai/types/segment-retinal-image';

export type AnalysisResults = {
  severity: ClassifySeverityOutput;
  doctorDashboard: GenerateDoctorDashboardOutput;
  patientDashboard: PatientDashboardOutput & { retinalImage: string };
  enhancementAnalysis: EnhancementFilterAnalysisOutput;
  adaptiveFilter: AdaptiveFilterApplicationOutput;
  metrics: EvaluationMetricsOutput;
  segmentation: SegmentRetinalImageOutput;
};

// This is a new type based on the updated flow
export type FilterAnalysisDetail = EnhancementFilterAnalysisOutput extends { analysis: (infer U)[] } ? U : never;
