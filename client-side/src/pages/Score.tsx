
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const score = location.state?.score || 0;
  const pmpTitle = location.state?.pmpTitle || "Unknown PMP";

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent work! Your diagnostic skills are impressive.";
    if (score >= 60) return "Good job! You're on the right track.";
    if (score >= 40) return "Not bad! Keep practicing to improve your skills.";
    return "Keep studying! Practice makes perfect.";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex items-center justify-center min-h-[500px]">
              <Card className="w-full max-w-md border-medical-light-gray">
                <CardHeader className="text-center">
                  <CardTitle className="text-medical-dark text-2xl">
                    Consultation Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <h3 className="text-medical-gray text-sm font-medium mb-2">
                      {pmpTitle}
                    </h3>
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                      {score} points
                    </div>
                    <p className="text-medical-gray text-sm">
                      {getScoreMessage(score)}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/classrooms")}
                      className="w-full bg-medical-blue hover:bg-medical-blue-hover text-white"
                    >
                      Try Another PMP
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="w-full border-medical-light-gray hover:bg-medical-light-gray"
                    >
                      Back to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
