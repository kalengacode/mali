"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";

export default function StudentSchedule() {
  const todayClasses = [
    {
      subject: "Mathématiques Avancées",
      time: "08:00 - 10:00",
      room: "Salle A-101",
      instructor: "Prof. Johnson",
      type: "Cours",
    },
    {
      subject: "Physique Quantique",
      time: "10:30 - 12:30",
      room: "Lab B-205",
      instructor: "Dr. Smith",
      type: "TP",
    },
    {
      subject: "Chimie Organique",
      time: "14:00 - 16:00",
      room: "Salle C-301",
      instructor: "Prof. Wilson",
      type: "Cours",
    },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Emploi du Temps
            </h1>
            <p className="text-gray-600">Votre planning académique</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Vue Complète
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Cours Aujourd'hui
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {todayClasses.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Heures/Semaine
                  </p>
                  <p className="text-2xl font-bold text-green-600">24h</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Salles</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Professeurs
                  </p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <User className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cours d'Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {class_.subject}
                      </h3>
                      <Badge variant="outline">{class_.type}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {class_.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {class_.room}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {class_.instructor}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Détails
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
