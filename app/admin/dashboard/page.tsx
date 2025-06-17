'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp,
  UserPlus,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const systemStats = [
    { label: 'Total Students', value: 1247, change: '+5.2%', icon: Users },
    { label: 'Active Teachers', value: 85, change: '+2.1%', icon: UserPlus },
    { label: 'Active Courses', value: 156, change: '+8.3%', icon: BookOpen },
    { label: 'Total Revenue', value: '$45,230', change: '+12.5%', icon: DollarSign },
  ];

  const recentActivities = [
    { type: 'user', message: 'New student registered: Alice Johnson', time: '2 hours ago' },
    { type: 'payment', message: 'Payment received from Bob Smith', time: '4 hours ago' },
    { type: 'course', message: 'New course created: Advanced Physics', time: '1 day ago' },
    { type: 'system', message: 'System maintenance completed', time: '2 days ago' },
  ];

  const pendingApprovals = [
    { type: 'Teacher Registration', name: 'Dr. Sarah Wilson', department: 'Physics', status: 'pending' },
    { type: 'Course Creation', name: 'Advanced Chemistry', teacher: 'Prof. Johnson', status: 'pending' },
    { type: 'Payment Dispute', name: 'Chris Kalenga', amount: '$500', status: 'review' },
  ];

  const monthlyData = [
    { month: 'Jan', students: 1100, revenue: 35000 },
    { month: 'Feb', students: 1150, revenue: 38000 },
    { month: 'Mar', students: 1200, revenue: 42000 },
    { month: 'Apr', students: 1247, revenue: 45230 },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">Monitor and manage your educational institution</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-green-500' :
                        activity.type === 'course' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{approval.type}</p>
                        <p className="text-xs text-muted-foreground">{approval.name}</p>
                      </div>
                      <Badge variant={approval.status === 'pending' ? 'default' : 'secondary'}>
                        {approval.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Monthly Growth</h4>
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{data.students} students</span>
                          <Progress value={(data.students / 1500) * 100} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Revenue Trend</h4>
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">${data.revenue.toLocaleString()}</span>
                          <Progress value={(data.revenue / 50000) * 100} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="students" className="mt-6">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Student Analytics</h3>
                  <p className="text-muted-foreground">Detailed student analytics and reports will be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue" className="mt-6">
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Revenue Analytics</h3>
                  <p className="text-muted-foreground">Revenue reports and financial analytics will be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-6">
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Course Analytics</h3>
                  <p className="text-muted-foreground">Course performance and enrollment analytics will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
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
                <UserPlus className="h-6 w-6 mb-2" />
                <span className="text-sm">Add User</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Courses</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Schedules</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-sm">System Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}