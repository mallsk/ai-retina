'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { GenerateDoctorDashboardOutput } from '@/ai/types/generate-doctor-dashboard';
import { ClassifySeverityOutput } from '@/ai/types/severity-classification';
import { EvaluationMetricsOutput } from '@/ai/types/generate-evaluation-metrics';
import { Stethoscope, FlaskConical, Lightbulb, Activity } from 'lucide-react';
import { Disclaimer } from './disclaimer';

interface DoctorViewProps {
  severityClassification: ClassifySeverityOutput;
  evaluationMetrics: EvaluationMetricsOutput;
  doctorDashboardOutput: GenerateDoctorDashboardOutput;
}

const chartConfig = {
  value: {
    label: 'Score',
  },
  accuracy: {
    label: 'Accuracy',
    color: 'hsl(var(--chart-1))',
  },
  precision: {
    label: 'Precision',
    color: 'hsl(var(--chart-2))',
  },
  recall: {
    label: 'Recall',
    color: 'hsl(var(--chart-3))',
  },
  f1Score: {
    label: 'F1-Score',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function DoctorView({
  severityClassification,
  evaluationMetrics,
  doctorDashboardOutput,
}: DoctorViewProps) {
  const { severity, confidence } = severityClassification;

  const getSeverityBadgeVariant = () => {
    if (severity.includes('High')) return 'destructive';
    if (severity.includes('Mid')) return 'secondary';
    return 'default';
  };

  const metricsData = [
    { name: 'Accuracy', value: evaluationMetrics.accuracy, fill: 'var(--color-accuracy)' },
    { name: 'Precision', value: evaluationMetrics.precision, fill: 'var(--color-precision)' },
    { name: 'Recall', value: evaluationMetrics.recall, fill: 'var(--color-recall)' },
    { name: 'F1 Score', value: evaluationMetrics.f1Score, fill: 'var(--color-f1Score)' },
  ];

  return (
    <div className="space-y-6">
      <Disclaimer />
      <Card>
        <CardHeader>
          <CardTitle>Severity Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Severity Level:</span>
            <Badge variant={getSeverityBadgeVariant()}>{severity}</Badge>
          </div>
          <div className="space-y-2">
            <label htmlFor="confidence" className="font-medium">
              Confidence Score: {Math.round(confidence * 100)}%
            </label>
            <Progress value={confidence * 100} id="confidence" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI-Assisted Clinical Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem icon={Stethoscope} title="Key Clinical Findings" content={doctorDashboardOutput.keyClinicalFindings} />
            <InfoItem icon={FlaskConical} title="Affected Retinal Regions" content={doctorDashboardOutput.affectedRetinalRegions} />
            <InfoItem icon={Lightbulb} title="Suggested Clinical Actions" content={doctorDashboardOutput.suggestedClinicalActions} />
            <InfoItem icon={Activity} title="Follow-Up Urgency" content={doctorDashboardOutput.followUpUrgencyLevel} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Evaluation Metrics (Experimental)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={metricsData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[0, 1]} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="value" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function InfoItem({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <div>
            <h4 className="flex items-center text-md font-semibold mb-1">
                <Icon className="w-5 h-5 mr-2 text-primary"/>
                {title}
            </h4>
            <p className="text-sm text-muted-foreground pl-7">{content}</p>
        </div>
    )
}
