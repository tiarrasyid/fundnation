export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  deadline: string;
  mediaUrls: string[];
  creator: string;
  totalRaised: number;
  donationTarget: number;
  notes?: string;
}
