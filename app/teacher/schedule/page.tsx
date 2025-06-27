"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Eye,
} from "lucide-react";

export default function TeacherSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("week");

  const scheduleItems = [
    {
      id: 1,
      title: "Mathématiques Avancées",
      time: "09:00 - 11:00",
      room: "Salle A101",
      students: 45,
      type: "course",
      day: "Lundi",
    },
    {
      id: 2,
      title: "Algèbre Linéaire",
      time: "14:00 - 16:00",
      room: "Salle B203",
      students: 32,
      type: "course",
      day: "Lundi",
    },
    {
      id: 3,
      title: "TP Mathématiques",
      time: "10:00 - 12:00",
      room: "Labo C105",
      students: 20,
      type: "lab",
      day: "Mardi",
    },
  ];

  const todaySchedule = scheduleItems.filter((item) => item.day === "Lundi");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mon Emploi du Temps</h1>
          <p className="text-muted-foreground">
            Consultez et gérez votre planning de cours
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Cours Aujourd'hui
                </p>
                <p className="text-2xl font-bold">{todaySchedule.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Heures/Semaine
                </p>
                <p className="text-2xl font-bold">18h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Étudiants Total
                </p>
                <p className="text-2xl font-bold">
                  {scheduleItems.reduce((sum, item) => sum + item.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Salles Utilisées
                </p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Planning - {selectedView}</CardTitle>
            <CardDescription>Votre emploi du temps détaillé</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedView === "day" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Aujourd'hui - Lundi</h3>
                {todaySchedule.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.room}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {item.students} étudiants
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          item.type === "course" ? "default" : "secondary"
                        }
                      >
                        {item.type === "course" ? "Cours" : "TP"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedView === "week" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cette Semaine</h3>
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4">
                  <div>Lun</div>
                  <div>Mar</div>
                  <div>Mer</div>
                  <div>Jeu</div>
                  <div>Ven</div>
                  <div>Sam</div>
                  <div>Dim</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  <div className="space-y-2">
                    {scheduleItems
                      .filter((item) => item.day === "Lundi")
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-2 bg-blue-50 border border-blue-200 rounded text-xs"
                        >
                          <div className="font-medium">{item.title}</div>
                          <div className="text-muted-foreground">
                            {item.time}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-2">
                    {scheduleItems
                      .filter((item) => item.day === "Mardi")
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-2 bg-green-50 border border-green-200 rounded text-xs"
                        >
                          <div className="font-medium">{item.title}</div>
                          <div className="text-muted-foreground">
                            {item.time}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}

            {selectedView === "month" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ce Mois</h3>
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square border rounded p-2 text-sm"
                    >
                      <div className="font-medium">{i + 1}</div>
                      {(i + 1) % 7 === 1 && (
                        <div className="text-xs text-blue-600 mt-1">
                          2 cours
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prochains Cours</CardTitle>
          <CardDescription>
            Vos cours à venir dans les prochains jours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {scheduleItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.day} • {item.time} • {item.room}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline">{item.students} étudiants</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
