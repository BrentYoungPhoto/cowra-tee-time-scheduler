
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ShoppingCart } from 'lucide-react';

interface EquipmentHireOptionsProps {
  holes: string;
  equipment: {
    pullBuggy: string;
    electricBuggy: string;
    hireClubs: string;
  };
  onEquipmentChange: (type: string, value: string) => void;
}

const EquipmentHireOptions = ({ holes, equipment, onEquipmentChange }: EquipmentHireOptionsProps) => {
  const is18Holes = holes === '18';

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
          Equipment Hire (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="pullBuggy">Pull Buggy</Label>
          <Select 
            value={equipment.pullBuggy} 
            onValueChange={(value) => onEquipmentChange('pullBuggy', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Pull Buggy</SelectItem>
              <SelectItem value="pullBuggy">Pull Buggy - $5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="electricBuggy">Electric Buggy (Must Book)</Label>
          <Select 
            value={equipment.electricBuggy} 
            onValueChange={(value) => onEquipmentChange('electricBuggy', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Electric Buggy</SelectItem>
              <SelectItem value="electricBuggy">Electric Buggy - $20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="hireClubs">Hire Clubs</Label>
          <Select 
            value={equipment.hireClubs} 
            onValueChange={(value) => onEquipmentChange('hireClubs', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Hire Clubs</SelectItem>
              <SelectItem value="standard">
                {is18Holes ? 'Standard Clubs 18 Holes - $30' : 'Standard Clubs 9 Holes - $20'}
              </SelectItem>
              <SelectItem value="premium">
                {is18Holes ? 'Premium Clubs 18 Holes - $40' : 'Premium Clubs 9 Holes - $30'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentHireOptions;
