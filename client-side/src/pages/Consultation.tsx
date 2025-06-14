
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { mockPMPs, mockCategories, mockQuestions } from "@/data/mockData";
import { useConsultation } from "@/hooks/useConsultation";
import { Question } from "@/types";
import { CheckCircle, ImageIcon, MessageSquare } from "lucide-react";

const Consultation = () => {
  const navigate = useNavigate();
  const { pmpId } = useParams();
  const { consultationState, setConsultationState, askQuestion } = useConsultation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  const pmp = mockPMPs.find(p => p.id === pmpId);
  const categories = mockCategories.filter(c => c.pmpId === pmpId);
  const questions = mockQuestions.filter(q => 
    categories.some(cat => cat.id === q.questionCategoryId)
  );

  useEffect(() => {
    if (pmp) {
      setConsultationState(prev => ({ ...prev, selectedPMP: pmp }));
    }
    // Auto-select first category
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [pmp, setConsultationState, categories, selectedCategoryId]);

  const handleQuestionClick = (question: Question) => {
    if (isQuestionAsked(question.id, question.type)) return;
    setSelectedQuestion(question);
    setShowConfirmDialog(true);
  };

  const handleConfirmQuestion = () => {
    if (selectedQuestion) {
      askQuestion(selectedQuestion);
      setCurrentResponse(selectedQuestion.response);
      setShowConfirmDialog(false);
      setShowResponseDialog(true);
    }
  };

  const handleResponseClose = () => {
    setShowResponseDialog(false);
    setSelectedQuestion(null);
    setCurrentResponse("");
  };

  const handleEndSession = () => {
    navigate("/score", { state: { score: consultationState.currentScore, pmpTitle: pmp?.title } });
  };

  const isQuestionAsked = (questionId: string, questionType: string) => {
    return consultationState.askedQuestions.some(
      aq => aq.question.id === questionId && questionType === 'NORMAL_QUESTION'
    );
  };

  if (!pmp) {
    return <div>PMP not found</div>;
  }

  const selectedQuestions = selectedCategoryId 
    ? questions.filter(q => q.questionCategoryId === selectedCategoryId)
    : [];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        {/* Problem Statement Header */}
        <div className="px-6 py-4 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <Card className="border-medical-light-gray">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-medical-dark text-xl mb-2">{pmp.title}</CardTitle>
                    <p className="text-medical-gray">{pmp.annonceOfTheProblem}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-medical-blue text-white px-4 py-2">
                      Score: {consultationState.currentScore}
                    </Badge>
                    <Button 
                      onClick={handleEndSession}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      End Session
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="flex flex-1 max-w-7xl mx-auto w-full gap-6 p-6">
          {/* Left Sidebar - Categories */}
          <div className="w-80 space-y-4">
            <Card className="border-medical-light-gray">
              <CardHeader>
                <CardTitle className="text-medical-dark text-lg">Question Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {categories.map((category) => {
                  const categoryQuestions = questions.filter(q => q.questionCategoryId === category.id);
                  const answeredCount = categoryQuestions.filter(q => isQuestionAsked(q.id, q.type)).length;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategoryId === category.id ? "default" : "outline"}
                      className={`w-full justify-between h-auto p-4 ${
                        selectedCategoryId === category.id 
                          ? "bg-medical-blue text-white shadow-lg" 
                          : "hover:bg-medical-light-gray hover:border-medical-blue"
                      }`}
                      onClick={() => setSelectedCategoryId(category.id)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{category.name}</span>
                        <span className="text-xs opacity-80">
                          {answeredCount}/{categoryQuestions.length} questions
                        </span>
                      </div>
                      {selectedCategoryId === category.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Questions */}
          <div className="flex-1 space-y-4">
            {selectedCategoryId && (
              <Card className="border-medical-light-gray">
                <CardHeader>
                  <CardTitle className="text-medical-dark">
                    {categories.find(c => c.id === selectedCategoryId)?.name} Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedQuestions.map((question) => {
                    const isAsked = isQuestionAsked(question.id, question.type);
                    const askedQuestion = consultationState.askedQuestions.find(
                      aq => aq.question.id === question.id
                    );

                    if (isAsked && askedQuestion) {
                      return (
                        <Accordion key={question.id} type="single" defaultValue="item-1">
                          <AccordionItem value="item-1" className="border border-green-200 rounded-lg">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                              <div className="flex items-center gap-3 text-left">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-green-800">
                                    {question.questionText}
                                  </span>
                                  <span className="text-xs text-green-600">
                                    +{question.score} points earned
                                  </span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-green-800 text-sm">{question.response}</p>
                                {question.medicalPictureUrl && (
                                  <img 
                                    src={question.medicalPictureUrl} 
                                    alt="Medical examination result"
                                    className="mt-3 w-full max-w-md h-32 object-cover rounded-md border"
                                  />
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    }

                    return (
                      <Card 
                        key={question.id} 
                        className={`transition-all duration-200 cursor-pointer hover:shadow-md ${
                          question.id === "3" ? "opacity-50 cursor-not-allowed" : "hover:border-medical-blue"
                        }`}
                        onClick={() => question.id !== "3" && handleQuestionClick(question)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {question.type === 'ASK_FOR_MEDICAL_PICTURE' ? (
                              <ImageIcon className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                            ) : (
                              <MessageSquare className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="text-medical-dark font-medium mb-1">
                                {question.questionText}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {question.score} points
                                </Badge>
                                <Button 
                                  size="sm" 
                                  className="bg-medical-blue hover:bg-medical-blue-hover"
                                  disabled={question.id === "3"}
                                >
                                  {question.id === "3" ? "Locked" : "Ask Question"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Medical Images */}
          <div className="w-80">
            <Card className="border-medical-light-gray h-full">
              <CardHeader>
                <CardTitle className="text-medical-dark flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Medical Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                {consultationState.medicalImages.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-medical-gray text-sm">
                      Medical images will appear here when you request them.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultationState.medicalImages.map((imageUrl, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src={imageUrl} 
                          alt={`Medical image ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-medical-dark">Confirm Question</DialogTitle>
              <DialogDescription className="text-medical-gray">
                Are you sure you want to ask this question?
              </DialogDescription>
            </DialogHeader>
            {selectedQuestion && (
              <div className="bg-medical-light-gray p-4 rounded-lg my-4">
                <p className="text-medical-dark font-medium mb-2">
                  "{selectedQuestion.questionText}"
                </p>
                <Badge variant="outline">
                  {selectedQuestion.score} points
                </Badge>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmQuestion}
                className="bg-medical-blue hover:bg-medical-blue-hover"
              >
                Ask Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Response Dialog */}
        <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-medical-dark flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Patient Response
              </DialogTitle>
            </DialogHeader>
            <div className="bg-green-50 p-4 rounded-lg my-4">
              <p className="text-green-800">{currentResponse}</p>
              {selectedQuestion?.medicalPictureUrl && (
                <img 
                  src={selectedQuestion.medicalPictureUrl} 
                  alt="Medical examination result"
                  className="mt-3 w-full h-32 object-cover rounded-md border"
                />
              )}
            </div>
            {selectedQuestion && (
              <div className="text-center">
                <Badge className="bg-green-600">
                  +{selectedQuestion.score} points earned!
                </Badge>
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={handleResponseClose}
                className="w-full bg-medical-blue hover:bg-medical-blue-hover"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Consultation;
