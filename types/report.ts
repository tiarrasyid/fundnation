// Di types/report.ts
export interface Report {
  projectId: string;
  userId: string;
  reason: "rules_violation" | "spam_abuse" | "ip_violation"; // Enum untuk alasan
  timestamp: Date;
  evidence?: string; // Opsional jika perlu bukti
}