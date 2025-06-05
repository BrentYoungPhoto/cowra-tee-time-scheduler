
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';

interface CartHireOptionsProps {
  playerType: string;
  holes: string;
  cartHire: string;
  onCartHireChange: (value: string) => void;
}

const CartHireOptions = ({ playerType, holes, cartHire, onCartHireChange }: CartHireOptionsProps) => {
  const getCartPrices = () => {
    const isMember = playerType === 'member';
    const is18Holes = holes === '18';
    
    if (isMember) {
      return {
        price: is18Holes ? 30 : 20,
        label: is18Holes ? 'Member 18 Hole Cart - $30' : 'Member 9 Hole Cart - $20'
      };
    } else {
      return {
        price: is18Holes ? 40 : 30,
        label: is18Holes ? 'Visitor 18 Hole Cart - $40' : 'Visitor 9 Hole Cart - $30'
      };
    }
  };

  const cartPrice = getCartPrices();

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="flex items-center">
          <Car className="w-5 h-5 mr-2 text-green-600" />
          Cart Hire (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div>
          <Label htmlFor="cartHire">Golf Cart</Label>
          <Select value={cartHire} onValueChange={onCartHireChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select cart option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Cart</SelectItem>
              <SelectItem value="cart">{cartPrice.label}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartHireOptions;
