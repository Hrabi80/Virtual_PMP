
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { mockClassrooms } from "@/data/mockData";

const Classrooms = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-medical-dark tracking-light text-[32px] font-bold leading-tight">
                  Available Classrooms
                </p>
                <p className="text-medical-gray text-sm font-normal leading-normal">
                  Choose a classroom to join and start practicing your diagnostic skills.
                </p>
              </div>
            </div>
            
            <h3 className="text-medical-dark text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Active Classrooms
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {mockClassrooms.map((classroom) => (
                <Card 
                  key={classroom.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-medical-light-gray group"
                  onClick={() => navigate(`/classrooms/${classroom.id}/pmps`)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div
                        className="h-48 bg-center bg-no-repeat bg-cover rounded-t-lg"
                        style={{ backgroundImage: `url("${classroom.imageUrl}")` }}
                      />
                      <div className="p-4">
                        <p className="text-medical-gray text-sm font-normal leading-normal mb-1">
                          Classroom {classroom.id}
                        </p>
                        <p className="text-medical-dark text-lg font-bold leading-tight mb-2 group-hover:text-medical-blue transition-colors">
                          {classroom.name}
                        </p>
                        <p className="text-medical-gray text-sm font-normal leading-normal">
                          {classroom.major} • {classroom.studentCount} students
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classrooms;
