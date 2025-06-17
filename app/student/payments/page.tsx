'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Clock, CheckCircle, AlertCircle, Smartphone, Download, Receipt } from 'lucide-react';

export default function StudentPayments() {
  const paymentHistory = [
    {
      id: 'PAY-001',
      description: 'Semester Fee - Spring 2024',
      amount: 500,
      status: 'paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      method: 'Orange Money'
    },
    {
      id: 'PAY-002',
      description: 'Course Materials Fee',
      amount: 75,
      status: 'paid',
      dueDate: '2024-01-20',
      paidDate: '2024-01-18',
      method: 'Airtel Money'
    },
    {
      id: 'PAY-003',
      description: 'Laboratory Fee',
      amount: 120,
      status: 'pending',
      dueDate: '2024-02-01',
      paidDate: null,
      method: null
    },
    {
      id: 'PAY-004',
      description: 'Exam Registration',
      amount: 50,
      status: 'overdue',
      dueDate: '2024-01-25',
      paidDate: null,
      method: null
    }
  ];

  const upcomingPayments = [
    {
      id: 'UP-001',
      description: 'Semester Fee - Summer 2024',
      amount: 500,
      dueDate: '2024-03-15',
      category: 'Tuition'
    },
    {
      id: 'UP-002',
      description: 'Student Activities Fee',
      amount: 30,
      dueDate: '2024-02-28',
      category: 'Activities'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payments</h1>
          <Button>
            <Receipt className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$575</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">$120</div>
              <p className="text-xs text-muted-foreground">Due soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$50</div>
              <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$530</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="pending">Pending Payments</TabsTrigger>
            <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View all your past payments and transactions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => {
                    const StatusIcon = getStatusIcon(payment.status);
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(payment.status)}`} />
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>ID: {payment.id}</span>
                              <span>Due: {payment.dueDate}</span>
                              {payment.method && <span>via {payment.method}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${payment.amount}</p>
                            <div className="flex items-center space-x-1">
                              <StatusIcon className="h-3 w-3" />
                              <Badge variant={payment.status === 'paid' ? 'default' : 
                                           payment.status === 'pending' ? 'secondary' : 'destructive'}>
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                          {payment.status === 'paid' && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Receipt
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

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-6">
              {/* Overdue Payments Alert */}
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                <CardHeader>
                  <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Overdue Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.filter(p => p.status === 'overdue').map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-red-600">${payment.amount}</span>
                          <Button size="sm" variant="destructive">
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.filter(p => p.status === 'pending').map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold">${payment.amount}</span>
                          <Button size="sm">
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Due: {payment.dueDate}</span>
                            <Badge variant="outline">{payment.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold">${payment.amount}</span>
                          <Button size="sm" variant="outline">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="make-payment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Make a Payment</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select a payment method to complete your transaction
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-type">Payment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semester">Semester Fee</SelectItem>
                        <SelectItem value="lab">Laboratory Fee</SelectItem>
                        <SelectItem value="exam">Exam Registration</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Smartphone className="h-6 w-6 mb-2 text-orange-600" />
                        <span className="text-sm">Orange Money</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Smartphone className="h-6 w-6 mb-2 text-red-600" />
                        <span className="text-sm">Airtel Money</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Smartphone className="h-6 w-6 mb-2 text-blue-600" />
                        <span className="text-sm">Africell Money</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <CreditCard className="h-6 w-6 mb-2 text-gray-600" />
                        <span className="text-sm">Bank Transfer</span>
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>$2.00</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>$122.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h4 className="font-medium">Payment Security</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Instant payment confirmation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}