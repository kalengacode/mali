'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle,
  Calendar,
  TrendingUp,
  FileText,
  MessageSquare
} from 'lucide-react';

export default function TeacherDashboard() {
  const todayClasses = [
    { subject: 'Advanced Mathematics', time: '09:00 AM', students: 32, room: 'A-101' },
    { subject: 'Calculus I', time: '11:00 AM', students: 28, room: 'B-205' },
    { subject: 'Statistics', time: '02:00 PM', students: 25, room: 'C-301' },
  ];

  const recentSubmissions = [
    { student: 'Alice Johnson', assignment: 'Calculus Problem Set 3', submitted: '2 hours ago', status: 'pending' },
    { student: 'Bob Smith', assignment: 'Statistics Project', submitted: '1 day ago', status: 'graded' },
    { student: 'Carol White', assignment: 'Advanced Math Quiz', submitted: '2 days ago', status: 'graded' },
  ];

  const courseStats = [
    { name: 'Advanced Mathematics', students: 32, avgGrade: 85, assignments: 3 },
    { name: 'Calculus I', students: 28, avgGrade: 78, assignments: 5 },
    { name: 'Statistics', students: 25, avgGrade: 82, assignments: 2 },
  ];

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Prof. Smith!</h1>
          <p className="text-green-100">Ready to inspire your students today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Assignments to grade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Class Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">81.7%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Today&apos;s Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayClasses.map((class_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{class_.subject}</h4>
                        <Badge variant="outline">{class_.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {class_.students} students • {class_.room}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Class
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((submission, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{submission.student}</p>
                        <p className="text-xs text-muted-foreground">{submission.assignment}</p>
                      </div>
                      <Badge variant={submission.status === 'graded' ? 'default' : 'secondary'}>
                        {submission.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{submission.submitted}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Course Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseStats.map((course, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">{course.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Students</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. Grade</span>
                      <span className="font-medium">{course.avgGrade}%</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm">{course.avgGrade}%</span>
                      </div>
                      <Progress value={course.avgGrade} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Assignments</span>
                      <span className="font-medium">{course.assignments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Create Course</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Grade Assignments</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">View Students</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span className="text-sm">Messages</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}