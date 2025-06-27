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
  Plus,
  Clock,
  Users,
  BookOpen,
  MapPin,
} from "lucide-react";

export default function AdminSchedulesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("week");

  const scheduleItems = [
    {
      id: 1,
      title: "Mathématiques Avancées",
      instructor: "Dr. Aminata Traoré",
      time: "09:00 - 11:00",
      room: "Salle A101",
      students: 45,
      type: "course",
    },
    {
      id: 2,
      title: "Physique Quantique",
      instructor: "Prof. Ibrahim Keita",
      time: "14:00 - 16:00",
      room: "Labo B203",
      students: 32,
      type: "lab",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Emplois du Temps</h1>
          <p className="text-muted-foreground">
            Planifiez et gérez tous les cours et événements
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
            Nouveau Créneau
          </Button>
        </div>
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
            <CardTitle>Emploi du Temps - {selectedView}</CardTitle>
            <CardDescription>
              Vue {selectedView} des cours programmés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.instructor}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
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
                <Badge
                  variant={item.type === "course" ? "default" : "secondary"}
                >
                  {item.type === "course" ? "Cours" : "TP"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
