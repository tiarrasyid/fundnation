export interface Project {
  progressPercentage: any;
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
  status: "active" | "done";
  isWithdrawn?: boolean;
  withdrawalDate?: string;
}
