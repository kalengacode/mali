"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Upload,
  Award,
  GraduationCap,
  Receipt,
  BookOpen,
} from "lucide-react";

export default function StudentDocuments() {
  const documents = [
    {
      id: "1",
      name: "Certificat de Scolarité 2023-2024",
      type: "Certificat",
      category: "Administratif",
      date: "2024-01-15",
      size: "245 KB",
      status: "available",
      downloadCount: 3,
    },
    {
      id: "2",
      name: "Relevé de Notes Semestre 1",
      type: "Relevé",
      category: "Académique",
      date: "2024-01-10",
      size: "189 KB",
      status: "available",
      downloadCount: 5,
    },
    {
      id: "3",
      name: "Attestation de Réussite",
      type: "Attestation",
      category: "Académique",
      date: "2024-01-05",
      size: "156 KB",
      status: "available",
      downloadCount: 2,
    },
    {
      id: "4",
      name: "Reçu de Paiement - Frais Scolaires",
      type: "Reçu",
      category: "Financier",
      date: "2023-12-20",
      size: "98 KB",
      status: "available",
      downloadCount: 1,
    },
    {
      id: "5",
      name: "Diplôme de Licence",
      type: "Diplôme",
      category: "Académique",
      date: "En cours",
      size: "-",
      status: "pending",
      downloadCount: 0,
    },
  ];

  const requestableDocuments = [
    {
      id: "1",
      name: "Certificat de Scolarité",
      description: "Document attestant de votre inscription",
      processingTime: "2-3 jours ouvrables",
      fee: "Gratuit",
    },
    {
      id: "2",
      name: "Relevé de Notes Officiel",
      description: "Relevé de notes avec sceau officiel",
      processingTime: "5-7 jours ouvrables",
      fee: "5,000 FCFA",
    },
    {
      id: "3",
      name: "Attestation de Réussite",
      description: "Attestation de réussite d'un niveau",
      processingTime: "3-5 jours ouvrables",
      fee: "3,000 FCFA",
    },
    {
      id: "4",
      name: "Duplicata de Diplôme",
      description: "Copie certifiée conforme du diplôme",
      processingTime: "15-20 jours ouvrables",
      fee: "25,000 FCFA",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Académique":
        return Award;
      case "Administratif":
        return FileText;
      case "Financier":
        return Receipt;
      default:
        return FileText;
    }
  };

  const availableDocuments = documents.filter(
    (doc) => doc.status === "available"
  );
  const pendingDocuments = documents.filter((doc) => doc.status === "pending");

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">
              Gérez vos documents académiques et administratifs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Téléverser
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Demander
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Documents Disponibles
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {availableDocuments.length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    En Attente
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingDocuments.length}
                  </p>
                </div>
                <Upload className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Téléchargements
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                  </p>
                </div>
                <Download className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Diplômes</p>
                  <p className="text-2xl font-bold text-purple-600">1</p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Mes Documents</TabsTrigger>
            <TabsTrigger value="request">Demander</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Documents Disponibles</span>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-8 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => {
                    const CategoryIcon = getCategoryIcon(doc.category);
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {doc.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{doc.type}</Badge>
                              <Badge className={getStatusColor(doc.status)}>
                                {doc.status === "available"
                                  ? "Disponible"
                                  : "En attente"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 gap-4">
                            <span>Catégorie: {doc.category}</span>
                            <span>Date: {doc.date}</span>
                            <span>Taille: {doc.size}</span>
                            <span>Téléchargé: {doc.downloadCount} fois</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {doc.status === "available" && (
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="request" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Demander un Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requestableDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {doc.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {doc.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Délai: {doc.processingTime}</span>
                            <span>Frais: {doc.fee}</span>
                          </div>
                        </div>
                        <Button size="sm">Demander</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Demandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun historique de demande</p>
                  <p className="text-sm">
                    Vos demandes de documents apparaîtront ici
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
