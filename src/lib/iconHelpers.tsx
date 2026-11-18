import {
  AlertTriangle,
  Bike,
  Bus,
  Car,
  DollarSign,
  Footprints,
  Globe,
  Lamp,
  Leaf,
} from 'lucide-react';

export const safetyIcon = <AlertTriangle className="h-4 w-4" />;
export const economicIcon = <DollarSign className="h-4 w-4" />;
export const environmentalIcon = <Leaf className="h-4 w-4" />;
export const accessToDestinationsIcon = <Globe className="h-4 w-4" />;
export const modeShiftIcon = <Car className="h-4 w-4" />;

export const goalIcons = {
  safety: safetyIcon,
  economic: economicIcon,
  environmental: environmentalIcon,
  accessToDestinations: accessToDestinationsIcon,
  modeShift: modeShiftIcon,
} as const;

export const measureModeIcons = {
  bike: <Bike className="h-5 w-5" />,
  pedestrian: <Footprints className="h-5 w-5" />,
  transit: <Bus className="h-5 w-5" />,
  vehicle: <Car className="h-5 w-5" />,
} as const;
