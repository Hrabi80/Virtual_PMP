
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, Target, BookOpen, Loader2 } from "lucide-react";

interface ConsultationStartupProps {
  isOpen: boolean;
  onClose: () => void;
  pmpId: string;
  pmpTitle: string;
}

const ConsultationStartup = ({ isOpen, onClose, pmpId, pmpTitle }: ConsultationStartupProps) => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    setShowLoading(true);
  };

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        navigate(`/consultation/${pmpId}`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showLoading, navigate, pmpId]);

  if (showLoading) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md border-none bg-gradient-to-br from-medical-blue to-blue-600 text-white">
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-white" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-white/20 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Consultation Starting...</h3>
              <p className="text-white/90">Get ready to begin your medical consultation</p>
              <div className="flex items-center justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <DialogTitle className="text-2xl font-bold text-medical-dark">
              Consultation Guidelines
            </DialogTitle>
          </div>
          <p className="text-medical-gray">
            Please read these important guidelines before starting "{pmpTitle}"
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Section */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Important Warning</h4>
                  <p className="text-amber-700 text-sm">
                    Question order is crucial for optimal learning. Ask questions strategically and think like a real doctor would during patient consultation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-dark flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              How It Works
            </h3>
            
            <div className="grid gap-3">
              <Card className="border-medical-light-gray">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-medical-dark mb-1">Strategic Questioning</h4>
                      <p className="text-medical-gray text-sm">
                        Each question you ask will provide valuable information. Choose wisely as some questions may unlock additional diagnostic tools.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-medical-light-gray">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-medical-dark mb-1">Scoring System</h4>
                      <p className="text-medical-gray text-sm">
                        You earn points for each question asked. Your final score reflects your diagnostic efficiency and clinical reasoning.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-medical-light-gray">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-medical-dark mb-1">Learning Process</h4>
                      <p className="text-medical-gray text-sm">
                        Navigate through different question categories. Some questions may provide medical images or additional diagnostic information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartConsultation}
              className="flex-1 bg-medical-blue hover:bg-medical-blue-hover"
            >
              Read & Start Consultation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationStartup;
