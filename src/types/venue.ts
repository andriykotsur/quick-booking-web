import { VenueType } from '@/enums/venue'

export type Venue = {
  id: string;
  name: string;
  location: string;
  type: VenueType;
}
