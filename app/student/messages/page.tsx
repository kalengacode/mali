"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
} from "lucide-react";

export default function StudentMessages() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: "1",
      name: "Prof. Johnson",
      role: "Professeur de Mathématiques",
      lastMessage:
        "N'hésitez pas si vous avez des questions sur le prochain examen.",
      time: "14:30",
      unread: false,
      avatar: "PJ",
    },
    {
      id: "2",
      name: "Dr. Smith",
      role: "Professeur de Physique",
      lastMessage: "Votre rapport de TP est excellent, félicitations !",
      time: "12:15",
      unread: true,
      avatar: "DS",
    },
    {
      id: "3",
      name: "Administration",
      role: "Service Scolarité",
      lastMessage: "Votre certificat de scolarité est prêt.",
      time: "Hier",
      unread: true,
      avatar: "AD",
    },
    {
      id: "4",
      name: "Prof. Wilson",
      role: "Professeur de Chimie",
      lastMessage: "Merci pour votre participation active en cours.",
      time: "2 jours",
      unread: false,
      avatar: "PW",
    },
  ];

  const messages = [
    {
      id: "1",
      senderId: "prof-johnson",
      senderName: "Prof. Johnson",
      content:
        "Bonjour Chris, j'espère que vous vous préparez bien pour l'examen de mathématiques de la semaine prochaine.",
      time: "14:25",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "student",
      senderName: "Vous",
      content:
        "Bonjour Professeur, oui je révise régulièrement. J'ai quelques questions sur les intégrales complexes.",
      time: "14:27",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "prof-johnson",
      senderName: "Prof. Johnson",
      content:
        "Parfait ! N'hésitez pas à me poser vos questions. Vous pouvez aussi venir me voir pendant mes heures de bureau.",
      time: "14:28",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "prof-johnson",
      senderName: "Prof. Johnson",
      content:
        "N'hésitez pas si vous avez des questions sur le prochain examen.",
      time: "14:30",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi du message
      setNewMessage("");
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="flex h-[calc(100vh-12rem)] space-x-4">
        {/* Liste des conversations */}
        <Card className="w-1/3 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Nouveau
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedMessage === conversation.id
                      ? "bg-blue-50 border-r-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedMessage(conversation.id)}
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-500 text-white">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {conversation.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {conversation.role}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread
                          ? "font-medium text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zone de conversation */}
        <Card className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* En-tête de conversation */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-blue-500 text-white">
                        PJ
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Prof. Johnson
                      </h3>
                      <p className="text-sm text-gray-500">
                        Professeur de Mathématiques
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Zone de saisie */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <Button size="sm" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-32 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Sélectionnez une conversation</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
