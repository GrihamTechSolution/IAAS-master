export interface EmailSubscription {
  id: number;
  email: string;
  token: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  updated: Date;
  created: Date;
}