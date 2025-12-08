// Fintech Layer Types for LUMA

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  cashback: number;
  points: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'refund' | 'cashback' | 'points';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  metadata?: {
    orderId?: string;
    productId?: string;
    [key: string]: any;
  };
}

export interface CreditScore {
  score: number; // 0-900
  tier: 'beginner' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'titanium';
  factors: {
    paymentBehavior: number; // 0-100
    shoppingReliability: number; // 0-100
    returnRate: number; // 0-100
    pointsTier: number; // 0-100
    profileCompleteness: number; // 0-100
  };
  bnplLimit: number;
  lastUpdated: string;
}

export interface PointsSystem {
  userId: string;
  totalPoints: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'titanium';
  xp: number;
  xpToNextLevel: number;
  dailyTasks: DailyTask[];
  weeklyTasks: WeeklyTask[];
  monthlyRewards: MonthlyReward[];
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: string;
}

export interface WeeklyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  icon: string;
}

export interface MonthlyReward {
  id: string;
  title: string;
  description: string;
  reward: string;
  unlockDate: string;
  claimed: boolean;
}

export interface BNPLAccount {
  userId: string;
  creditLimit: number;
  usedLimit: number;
  availableLimit: number;
  orders: BNPLOrder[];
  interestRate: number;
  freezeEnabled: boolean;
}

export interface BNPLOrder {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  totalAmount: number;
  installments: BNPLInstallment[];
  status: 'active' | 'completed' | 'frozen' | 'defaulted';
  startDate: string;
  autoPayEnabled: boolean;
  scoreImpact: number;
}

export interface BNPLInstallment {
  id: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'frozen';
  paidAt?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  type: 'cashback_boost' | 'discount_coupon' | 'free_shipping' | 'exclusive_deal';
  pointsCost: number;
  value: string;
  image: string;
  available: boolean;
  expiresAt?: string;
}

export interface KYCVerification {
  userId: string;
  status: 'not_started' | 'in_progress' | 'verified' | 'rejected';
  level: 'basic' | 'intermediate' | 'advanced';
  documents: KYCDocument[];
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface KYCDocument {
  id: string;
  type: 'passport' | 'id_card' | 'selfie' | 'address_proof';
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  url?: string;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface SpendingAnalytics {
  period: 'week' | 'month' | '90days';
  totalSpent: number;
  categories: SpendingCategory[];
  topPurchases: {
    productName: string;
    amount: number;
    date: string;
  }[];
  cashbackEarned: number;
  pointsEarned: number;
}
