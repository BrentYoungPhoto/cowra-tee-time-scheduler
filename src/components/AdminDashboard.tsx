import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  CalendarX, 
  Users, 
  DollarSign, 
  Clock, 
  Settings, 
  Search,
  Eye,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [blockReason, setBlockReason] = useState('');

  // Generate time options for the select dropdowns
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        times.push({ value: time, label: display });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Mock booking data
  const mockBookings = [
    {
      id: '1',
      date: '2024-01-15',
      time: '08:00',
      playerName: 'John Smith',
      players: 4,
      holes: 18,
      playerType: 'member',
      phone: '0412 345 678',
      email: 'john@email.com',
      status: 'confirmed',
      deposit: 70,
      totalFee: 140
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '09:15',
      playerName: 'Sarah Johnson',
      players: 2,
      holes: 18,
      playerType: 'visitor',
      phone: '0423 456 789',
      email: 'sarah@email.com',
      status: 'pending',
      deposit: 55,
      totalFee: 110
    },
    {
      id: '3',
      date: '2024-01-15',
      time: '10:30',
      playerName: 'Mike Wilson',
      players: 3,
      holes: 9,
      playerType: 'member',
      phone: '0434 567 890',
      email: 'mike@email.com',
      status: 'confirmed',
      deposit: 30,
      totalFee: 60
    }
  ];

  // Mock blocked times
  const [blockedTimes, setBlockedTimes] = useState([
    { date: '2024-01-15', startTime: '12:00', endTime: '12:45', reason: 'Maintenance' },
    { date: '2024-01-16', startTime: '14:00', endTime: '18:00', reason: 'Tournament' },
    { date: '2024-01-17', startTime: '08:00', endTime: '18:00', reason: 'Full Day Tournament' }
  ]);

  const handleBlockTimeSlot = () => {
    if (!selectedDate || !startTime || !endTime || !blockReason) {
      return;
    }

    const newBlock = {
      date: selectedDate.toISOString().split('T')[0],
      startTime,
      endTime,
      reason: blockReason
    };

    setBlockedTimes([...blockedTimes, newBlock]);
    setStartTime('');
    setEndTime('');
    setBlockReason('');
  };

  const formatTimeRange = (startTime: string, endTime: string) => {
    const formatTime = (time: string) => {
      return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => `$${amount}`;

  const todayBookings = mockBookings.filter(booking => 
    booking.date === new Date().toISOString().split('T')[0]
  );
  
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalFee, 0);
  const confirmedBookings = mockBookings.filter(booking => booking.status === 'confirmed').length;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                <p className="text-3xl font-bold text-green-600">{todayBookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{confirmedBookings}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked Times</p>
                <p className="text-3xl font-bold text-green-600">{blockedTimes.length}</p>
              </div>
              <CalendarX className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="blocked">Manage Blocks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>View and manage all tee time bookings</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="space-y-1">
                        <p className="font-semibold">{booking.playerName}</p>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{booking.time}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm">
                          <Users className="w-4 h-4 inline mr-1" />
                          {booking.players} players
                        </p>
                        <p className="text-sm">{booking.holes} holes</p>
                        <Badge variant="outline" className="text-xs">
                          {booking.playerType}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm">Total: {formatCurrency(booking.totalFee)}</p>
                        <p className="text-sm">Deposit: {formatCurrency(booking.deposit)}</p>
                        <p className="text-sm text-gray-600">
                          Remaining: {formatCurrency(booking.totalFee - booking.deposit)}
                        </p>
                      </div>
                      
                      <div>
                        <Badge className={cn("mb-2", getStatusColor(booking.status))}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarX className="w-5 h-5 mr-2" />
                  Block Time Slots
                </CardTitle>
                <CardDescription>Select dates and time ranges to block for maintenance or events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Date</Label>
                  <div className="mt-2 relative">
                    <div className="max-w-fit mx-auto">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className={cn("rounded-md border bg-white relative z-auto")}
                        classNames={{
                          day_selected: "bg-green-600 text-white hover:bg-green-700",
                          day_today: "bg-green-100 text-green-800 font-semibold",
                          day: "hover:bg-green-50 transition-colors",
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Input 
                    id="reason" 
                    placeholder="e.g., Maintenance, Tournament, etc." 
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleBlockTimeSlot}
                  disabled={!selectedDate || !startTime || !endTime || !blockReason}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Block Time Range
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currently Blocked Times</CardTitle>
                <CardDescription>Manage existing blocked time slots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockedTimes.map((block, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {new Date(block.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatTimeRange(block.startTime, block.endTime)}
                        </p>
                        <p className="text-sm text-gray-600">{block.reason}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setBlockedTimes(blockedTimes.filter((_, i) => i !== index));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Settings
              </CardTitle>
              <CardDescription>Configure booking system settings and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Booking Settings</h4>
                    <div>
                      <Label htmlFor="advanceBooking">Maximum advance booking (days)</Label>
                      <Input id="advanceBooking" type="number" defaultValue="30" />
                    </div>
                    <div>
                      <Label htmlFor="depositPercent">Deposit percentage</Label>
                      <Input id="depositPercent" type="number" defaultValue="50" />
                    </div>
                    <div>
                      <Label htmlFor="slotDuration">Time slot duration (minutes)</Label>
                      <Select defaultValue="15">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Green Fees</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="visitor18">18 Hole Visitor</Label>
                        <Input id="visitor18" type="number" defaultValue="40" />
                      </div>
                      <div>
                        <Label htmlFor="visitor9">9 Hole Visitor</Label>
                        <Input id="visitor9" type="number" defaultValue="25" />
                      </div>
                      <div>
                        <Label htmlFor="junior18">18 Hole Junior</Label>
                        <Input id="junior18" type="number" defaultValue="15" />
                      </div>
                      <div>
                        <Label htmlFor="junior9">9 Hole Junior</Label>
                        <Input id="junior9" type="number" defaultValue="10" />
                      </div>
                      <div>
                        <Label htmlFor="twilight">Twilight Golf (after 3pm/4pm)</Label>
                        <Input id="twilight" type="number" defaultValue="15" />
                      </div>
                      <div>
                        <Label htmlFor="reciprocal9">9 Hole Reciprocal</Label>
                        <Input id="reciprocal9" type="number" defaultValue="15" />
                      </div>
                      <div>
                        <Label htmlFor="reciprocal18">18 Hole Reciprocal</Label>
                        <Input id="reciprocal18" type="number" defaultValue="20" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Cart Hire</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="memberCart18">Member 18 Hole</Label>
                        <Input id="memberCart18" type="number" defaultValue="30" />
                      </div>
                      <div>
                        <Label htmlFor="memberCart9">Member 9 Hole</Label>
                        <Input id="memberCart9" type="number" defaultValue="20" />
                      </div>
                      <div>
                        <Label htmlFor="visitorCart18">Visitor 18 Hole</Label>
                        <Input id="visitorCart18" type="number" defaultValue="40" />
                      </div>
                      <div>
                        <Label htmlFor="visitorCart9">Visitor 9 Hole</Label>
                        <Input id="visitorCart9" type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Hire Equipment</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="pullBuggy">Pull Buggy</Label>
                        <Input id="pullBuggy" type="number" defaultValue="5" />
                      </div>
                      <div>
                        <Label htmlFor="electricBuggy">Electric Buggy</Label>
                        <Input id="electricBuggy" type="number" defaultValue="20" />
                      </div>
                      <div>
                        <Label htmlFor="hireClubs9Standard">Hire Clubs 9 Holes (Standard)</Label>
                        <Input id="hireClubs9Standard" type="number" defaultValue="20" />
                      </div>
                      <div>
                        <Label htmlFor="hireClubs9Premium">Hire Clubs 9 Holes (Premium)</Label>
                        <Input id="hireClubs9Premium" type="number" defaultValue="30" />
                      </div>
                      <div>
                        <Label htmlFor="hireClubs18Standard">Hire Clubs 18 Holes (Standard)</Label>
                        <Input id="hireClubs18Standard" type="number" defaultValue="30" />
                      </div>
                      <div>
                        <Label htmlFor="hireClubs18Premium">Hire Clubs 18 Holes (Premium)</Label>
                        <Input id="hireClubs18Premium" type="number" defaultValue="40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
