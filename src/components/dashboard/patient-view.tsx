import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PatientDashboardOutput } from '@/ai/types/generate-patient-dashboard';
import { Disclaimer } from './disclaimer';
import { FileText, HeartPulse, Forward } from 'lucide-react';

interface PatientViewProps {
  patientDashboardOutput: PatientDashboardOutput;
}

export function PatientView({ patientDashboardOutput }: PatientViewProps) {
  const { conditionExplanation, riskCategory, lifestyleRecommendations, suggestedNextSteps } = patientDashboardOutput;

  const getRiskBadgeVariant = () => {
    if (riskCategory === 'High') return 'destructive';
    if (riskCategory === 'Medium') return 'secondary';
    return 'default';
  };

  return (
    <div className="space-y-6">
      <Disclaimer />
      <Card>
        <CardHeader>
          <CardTitle>Your Health Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Your Estimated Risk Category:</span>
            <Badge variant={getRiskBadgeVariant()}>{riskCategory}</Badge>
          </div>
          
          <InfoItem 
            icon={FileText}
            title="Understanding Your Results"
            content={conditionExplanation}
          />

          <InfoItem 
            icon={HeartPulse}
            title="Lifestyle Recommendations"
            content={lifestyleRecommendations}
          />

          <InfoItem 
            icon={Forward}
            title="Suggested Next Steps"
            content={suggestedNextSteps}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <h4 className="flex items-center text-md font-semibold mb-2">
                <Icon className="w-5 h-5 mr-2 text-accent"/>
                {title}
            </h4>
            <p className="text-sm text-muted-foreground">{content}</p>
        </div>
    )
}
