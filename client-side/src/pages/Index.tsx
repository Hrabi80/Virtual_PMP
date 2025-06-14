import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Stethoscope, BookOpen, Award, Users, ArrowRight, Play } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        {/* Enhanced Hero Section */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="relative flex min-h-[600px] flex-col gap-8 bg-cover bg-center bg-no-repeat @[480px]:gap-10 @[480px]:rounded-xl items-center justify-center p-8 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(25, 147, 229, 0.8) 0%, rgba(25, 147, 229, 0.6) 50%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")`
                  }}
                >
                  {/* Floating Elements for Modern Touch */}
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="flex flex-col gap-6 text-center max-w-4xl z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white/90 text-sm font-medium mb-4">
                      <Play className="w-4 h-4" />
                      Virtual Medical Training Platform
                    </div>
                    
                    <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.02em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.02em] mb-4">
                      Practice Diagnostics,
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                        Perfect Your Skills
                      </span>
                    </h1>
                    
                    <h2 className="text-white/90 text-lg font-normal leading-relaxed @[480px]:text-xl @[480px]:font-normal @[480px]:leading-relaxed max-w-2xl mx-auto">
                      Virtual PMP offers a cutting-edge platform for medical students to master diagnostic abilities through immersive simulated consultations and expert feedback.
                    </h2>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 z-10">
                    <Button
                      onClick={() => navigate("/classrooms")}
                      className="bg-white hover:bg-gray-50 text-medical-blue font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      Start Consultation
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200"
                    >
                      Learn More
                    </Button>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="flex flex-wrap justify-center gap-8 mt-8 z-10">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">500+</div>
                      <div className="text-white/80 text-sm">Students Trained</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">50+</div>
                      <div className="text-white/80 text-sm">Medical Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">95%</div>
                      <div className="text-white/80 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is PMP Section */}
        <section className="px-40 py-16 bg-medical-light-gray">
          <div className="max-w-[960px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-medical-dark text-3xl font-bold mb-4">What is a Patient Management Program?</h2>
              <p className="text-medical-gray text-lg max-w-2xl mx-auto">
                A Patient Management Program (PMP) is an interactive virtual consultation system designed to simulate real-world medical scenarios for educational purposes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 border-medical-light-gray">
                <CardContent className="pt-6">
                  <Stethoscope className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="text-medical-dark font-semibold mb-2">Virtual Patients</h3>
                  <p className="text-medical-gray text-sm">Interact with realistic patient scenarios</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 border-medical-light-gray">
                <CardContent className="pt-6">
                  <BookOpen className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="text-medical-dark font-semibold mb-2">Clinical Cases</h3>
                  <p className="text-medical-gray text-sm">Practice with diverse medical conditions</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 border-medical-light-gray">
                <CardContent className="pt-6">
                  <Award className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="text-medical-dark font-semibold mb-2">Instant Feedback</h3>
                  <p className="text-medical-gray text-sm">Get immediate scoring and assessment</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 border-medical-light-gray">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="text-medical-dark font-semibold mb-2">Expert Supervision</h3>
                  <p className="text-medical-gray text-sm">Cases designed by medical professionals</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="px-40 py-16">
          <div className="max-w-[960px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-medical-dark text-3xl font-bold mb-4">How Virtual PMP Works</h2>
              <p className="text-medical-gray text-lg max-w-2xl mx-auto">
                Follow these simple steps to start your virtual consultation journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-medical-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-medical-dark text-xl font-semibold mb-2">Choose a Classroom</h3>
                <p className="text-medical-gray">
                  Select from various medical specialties like Cardiology, Neurology, or Pediatrics
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-medical-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-medical-dark text-xl font-semibold mb-2">Start a PMP</h3>
                <p className="text-medical-gray">
                  Pick a Patient Management Program that matches your learning objectives
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-medical-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-medical-dark text-xl font-semibold mb-2">Practice & Learn</h3>
                <p className="text-medical-gray">
                  Ask questions, analyze responses, and receive instant feedback on your diagnostic skills
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-medical-gray text-base font-normal leading-normal min-w-40 hover:text-medical-blue transition-colors" href="#">
                  Terms of Service
                </a>
                <a className="text-medical-gray text-base font-normal leading-normal min-w-40 hover:text-medical-blue transition-colors" href="#">
                  Privacy Policy
                </a>
                <a className="text-medical-gray text-base font-normal leading-normal min-w-40 hover:text-medical-blue transition-colors" href="#">
                  Contact Us
                </a>
              </div>
              <p className="text-medical-gray text-base font-normal leading-normal">
                @2024 Virtual PMP. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
