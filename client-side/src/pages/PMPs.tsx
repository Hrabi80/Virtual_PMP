
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ConsultationStartup from "@/components/ConsultationStartup";
import { mockClassrooms, mockPMPs } from "@/data/mockData";
import { Play, Clock, Award, Users } from "lucide-react";

const PMPs = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [showStartup, setShowStartup] = useState(false);
  const [selectedPMP, setSelectedPMP] = useState<{ id: string; title: string } | null>(null);

  const classroom = mockClassrooms.find(c => c.id === classroomId);
  const pmps = mockPMPs.filter(pmp => pmp.classroomId === classroomId);

  const handleStartConsultation = (pmp: typeof mockPMPs[0]) => {
    setSelectedPMP({ id: pmp.id, title: pmp.title });
    setShowStartup(true);
  };

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        {/* Header Section */}
        <div className="px-6 py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => navigate("/classrooms")}
                className="mb-4"
              >
                ← Back to Classrooms
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-medical-blue rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {classroom.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-medical-dark mb-2">
                  {classroom.name}
                </h1>
                <p className="text-medical-gray text-lg">
                  {classroom.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-medical-gray">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{pmps.length} PMPs Available</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Expert Supervised</span>
              </div>
            </div>
          </div>
        </div>

        {/* PMPs Grid */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-medical-dark mb-2">
                Available Patient Management Programs
              </h2>
              <p className="text-medical-gray">
                Select a PMP to begin your virtual consultation experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pmps.map((pmp) => (
                <Card 
                  key={pmp.id} 
                  className="group hover:shadow-lg transition-all duration-200 border-medical-light-gray hover:border-medical-blue"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-medical-dark group-hover:text-medical-blue transition-colors">
                        {pmp.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-medical-blue text-white">
                        {pmp.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-medical-gray text-sm leading-relaxed">
                      {pmp.annonceOfTheProblem}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-medical-gray">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>~30 mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>Max Score: {pmp.maxScore}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleStartConsultation(pmp)}
                      className="w-full bg-medical-blue hover:bg-medical-blue-hover group-hover:shadow-md transition-all duration-200"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {pmps.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="max-w-md mx-auto">
                    <Play className="w-16 h-16 text-medical-light-gray mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-medical-dark mb-2">
                      No PMPs Available
                    </h3>
                    <p className="text-medical-gray">
                      There are no Patient Management Programs available for this classroom yet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Consultation Startup Modal */}
        {selectedPMP && (
          <ConsultationStartup
            isOpen={showStartup}
            onClose={() => {
              setShowStartup(false);
              setSelectedPMP(null);
            }}
            pmpId={selectedPMP.id}
            pmpTitle={selectedPMP.title}
          />
        )}
      </div>
    </div>
  );
};

export default PMPs;
