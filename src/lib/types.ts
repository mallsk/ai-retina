import type { ClassifySeverityOutput } from '@/ai/flows/severity-classification';
import type { GenerateDoctorDashboardOutput } from '@/ai/flows/generate-doctor-dashboard';
import type { PatientDashboardOutput } from '@/ai/flows/generate-patient-dashboard';
import type { EnhancementFilterAnalysisOutput } from '@/ai/flows/enhancement-filter-analysis';
import type { AdaptiveFilterApplicationOutput } from '@/ai/flows/adaptive-filter-application';
import type { EvaluationMetricsOutput } from '@/ai/flows/generate-evaluation-metrics';

export type AnalysisResults = {
  severity: ClassifySeverityOutput;
  doctorDashboard: GenerateDoctorDashboardOutput;
  patientDashboard: PatientDashboardOutput;
  enhancementAnalysis: EnhancementFilterAnalysisOutput;
  adaptiveFilter: AdaptiveFilterApplicationOutput;
  metrics: EvaluationMetricsOutput;
};

// This is a new type based on the updated flow
export type FilterAnalysisDetail = EnhancementFilterAnalysisOutput extends { analysis: (infer U)[] } ? U : never;
