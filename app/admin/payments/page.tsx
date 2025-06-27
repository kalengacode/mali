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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const payments = [
    {
      id: 1,
      student: "Fatoumata Coulibaly",
      course: "Mathématiques Avancées",
      amount: "€299",
      date: "2024-06-15",
      status: "completed",
      method: "Carte bancaire",
    },
    {
      id: 2,
      student: "Ibrahim Keita",
      course: "Physique Quantique",
      amount: "€349",
      date: "2024-06-14",
      status: "pending",
      method: "Virement",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
          <p className="text-muted-foreground">
            Surveillez tous les paiements et transactions
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Revenus Totaux
                </p>
                <p className="text-2xl font-bold">€284,750</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Transactions
                </p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Complétés
                </p>
                <p className="text-2xl font-bold">
                  {payments.filter((p) => p.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Croissance
                </p>
                <p className="text-2xl font-bold">+15.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
          <CardDescription>
            Liste des derniers paiements effectués
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{payment.student}</h4>
                <p className="text-sm text-muted-foreground">
                  {payment.course}
                </p>
                <p className="text-xs text-muted-foreground">
                  {payment.date} • {payment.method}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-bold text-green-600">{payment.amount}</p>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(payment.status)}
                  <Badge
                    variant={
                      payment.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {payment.status === "completed" ? "Complété" : "En attente"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
