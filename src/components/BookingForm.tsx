
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Users, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onComplete: () => void;
  onCancel: () => void;
}

const BookingForm = ({ selectedDate, selectedTime, onComplete, onCancel }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    playerType: 'member',
    players: '4',
    holes: '18',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    specialRequests: ''
  });

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateFees = () => {
    const isMember = formData.playerType === 'member';
    const is18Holes = formData.holes === '18';
    const playerCount = parseInt(formData.players);
    
    let feePerPlayer = 0;
    if (isMember) {
      feePerPlayer = is18Holes ? 35 : 20;
    } else {
      feePerPlayer = is18Holes ? 55 : 30;
    }
    
    const totalFee = feePerPlayer * playerCount;
    const deposit = Math.round(totalFee * 0.5); // 50% deposit
    
    return { totalFee, deposit, feePerPlayer };
  };

  const { totalFee, deposit, feePerPlayer } = calculateFees();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.contactName || !formData.contactPhone || !formData.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required contact details.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Submitted!",
      description: `Your tee time for ${selectedDate?.toLocaleDateString()} at ${formatTime(selectedTime)} has been submitted. You will receive a confirmation email shortly.`,
    });
    
    console.log('Booking submitted:', {
      date: selectedDate,
      time: selectedTime,
      ...formData,
      fees: { totalFee, deposit, feePerPlayer }
    });
    
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calendar
        </Button>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
            <CardDescription className="text-green-100">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} at {formatTime(selectedTime)}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-base font-semibold">Player Type</Label>
                <RadioGroup 
                  value={formData.playerType} 
                  onValueChange={(value) => setFormData({...formData, playerType: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="member" id="member" />
                    <Label htmlFor="member">Club Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="visitor" id="visitor" />
                    <Label htmlFor="visitor">Visitor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="players">Number of Players</Label>
                  <Select 
                    value={formData.players} 
                    onValueChange={(value) => setFormData({...formData, players: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select players" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Player</SelectItem>
                      <SelectItem value="2">2 Players</SelectItem>
                      <SelectItem value="3">3 Players</SelectItem>
                      <SelectItem value="4">4 Players</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="holes">Number of Holes</Label>
                  <Select 
                    value={formData.holes} 
                    onValueChange={(value) => setFormData({...formData, holes: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select holes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9 Holes</SelectItem>
                      <SelectItem value="18">18 Holes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requirements or requests..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary & Payment */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Booking Summary & Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{formatTime(selectedTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Players:</span>
                    <span className="font-medium">{formData.players} players</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holes:</span>
                    <span className="font-medium">{formData.holes} holes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Player Type:</span>
                    <span className="font-medium capitalize">{formData.playerType}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Green Fee per Player:</span>
                    <span className="font-medium">${feePerPlayer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Green Fees:</span>
                    <span className="font-medium">${totalFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold text-green-600">
                    <span>Deposit Required (50%):</span>
                    <span>${deposit}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Remaining balance of ${totalFee - deposit} to be paid on arrival
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 sm:w-auto"
              >
                Pay Deposit & Confirm Booking (${deposit})
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default BookingForm;
