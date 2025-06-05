
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import TimeSlotGrid from '@/components/TimeSlotGrid';
import BookingForm from '@/components/BookingForm';
import AdminDashboard from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowBookingForm(true);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CG</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cowra Golf Club</h1>
                <p className="text-gray-600">Tee Time Booking System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  123 Golf Course Road, Cowra NSW
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  (02) 6341 1234
                </p>
              </div>
              <Button 
                variant={isAdmin ? "default" : "outline"}
                onClick={() => setIsAdmin(!isAdmin)}
                className="bg-green-600 hover:bg-green-700"
              >
                {isAdmin ? 'Public View' : 'Admin Login'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <Tabs defaultValue="booking" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
              <TabsTrigger value="booking">Book Tee Time</TabsTrigger>
              <TabsTrigger value="info">Course Info</TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="space-y-6">
              {!showBookingForm ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar Section */}
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Select Date
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Choose your preferred date for tee time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <BookingCalendar 
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                      />
                    </CardContent>
                  </Card>

                  {/* Time Slots Section */}
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Available Times
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        {selectedDate ? 
                          `Available slots for ${selectedDate.toLocaleDateString()}` : 
                          'Select a date to see available times'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <TimeSlotGrid 
                        selectedDate={selectedDate}
                        onTimeSelect={handleTimeSelect}
                      />
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <BookingForm 
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onComplete={handleBookingComplete}
                  onCancel={() => setShowBookingForm(false)}
                />
              )}
            </TabsContent>

            <TabsContent value="info" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Operating Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-semibold">6:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday:</span>
                      <span className="font-semibold">5:30 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Holidays:</span>
                      <span className="font-semibold">6:00 AM - 6:00 PM</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Green Fees
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-2">
                    <div className="flex justify-between">
                      <span>Members (18 holes):</span>
                      <span className="font-semibold">$35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visitors (18 holes):</span>
                      <span className="font-semibold">$55</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Members (9 holes):</span>
                      <span className="font-semibold">$20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visitors (9 holes):</span>
                      <span className="font-semibold">$30</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      * Deposit required: 50% of green fee
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm">123 Golf Course Road<br />Cowra NSW 2794</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm">(02) 6341 1234</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span className="text-sm">info@cowragolf.com.au</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Index;
