import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type User = {
  id: string;
  name: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  balance: number;
  wallet: number;
  investements: number;
  referrer_id?: string;
  created_at: string;
  last_login?: string;
};

export type Investment = {
  id: string;
  user_id: string;
  product_id: number;
  amount: number;
  daily_gain: number;
  started_at: string;
  ends_at: string;
  days_elapsed: number;
  status: "active" | "completed";
  total_earned: number;
};

export type DailyGain = {
  id: string;
  user_id: string;
  investment_id: string;
  amount: number;
  credited_at: string;
};

export type DepositRequest = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  country: string;
  amount: number;
  network: string;
  proof_file: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  updated_at: string;
};

export type WithdrawalRequest = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  country: string;
  amount: number;
  network: string;
  fee_amount: number;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  updated_at: string;
};

export type AdminSettings = {
  telegram_link: string;
  payment_link: string;
  referral_level1: number;
  referral_level2: number;
  referral_level3: number;
  withdrawal_fee: number;
  min_withdrawal: number;
  min_deposit: number;
  investment_days: number;
};

export type Referral = {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  level: number;
  earned: number;
  created_at: string;
};

const dataDir = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateId(): string {
  return crypto.randomBytes(12).toString("hex");
}

// USERS
export async function createUser(name: string, phone: string, country: string, email: string, password: string): Promise<User> {
  await ensureDir();
  const users = await getUsers();
  if (users.find((u) => u.email === email)) throw new Error("Email already exists");
  
  const newUser: User = {
    id: generateId(),
    name,
    phone,
    country,
    email,
    password: hashPassword(password),
    balance: 500, // 500 FCFA welcome bonus
    wallet: 500,
    investements: 0,
    created_at: new Date().toISOString(),
  };
  
  users.push(newUser);
  await fs.writeFile(path.join(dataDir, "users.json"), JSON.stringify(users, null, 2));
  return newUser;
}

export async function getUsers(): Promise<User[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "users.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.id === id) || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.email === email) || null;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  
  users[index] = { ...users[index], ...updates, password: users[index].password };
  await fs.writeFile(path.join(dataDir, "users.json"), JSON.stringify(users, null, 2));
  return users[index];
}

export async function addUserBalance(id: string, amount: number): Promise<User> {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  user.balance += amount;
  user.wallet += amount;
  return updateUser(id, user);
}

export async function removeUserBalance(id: string, amount: number): Promise<User> {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  if (user.balance < amount) throw new Error("Insufficient balance");
  user.balance -= amount;
  user.wallet -= amount;
  return updateUser(id, user);
}

// DEPOSITS
export async function createDepositRequest(userId: string, amount: number, phone: string, network: string, proof_file: string): Promise<DepositRequest> {
  await ensureDir();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  
  const requests = await getDepositRequests();
  const newRequest: DepositRequest = {
    id: generateId(),
    user_id: userId,
    name: user.name,
    phone,
    country: user.country,
    amount,
    network,
    proof_file,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  requests.push(newRequest);
  await fs.writeFile(path.join(dataDir, "deposits.json"), JSON.stringify(requests, null, 2));
  return newRequest;
}

export async function getDepositRequests(): Promise<DepositRequest[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "deposits.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function approveDeposit(id: string, admin_id: string): Promise<DepositRequest> {
  const requests = await getDepositRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Deposit not found");
  
  const request = requests[index];
  if (request.status !== "pending") throw new Error("Request already processed");
  
  // Credit user balance
  await addUserBalance(request.user_id, request.amount);
  
  // Mark as approved
  request.status = "approved";
  request.updated_at = new Date().toISOString();
  request.admin_notes = `Approved by admin ${admin_id}`;
  
  requests[index] = request;
  await fs.writeFile(path.join(dataDir, "deposits.json"), JSON.stringify(requests, null, 2));
  return request;
}

export async function rejectDeposit(id: string, admin_id: string, reason: string): Promise<DepositRequest> {
  const requests = await getDepositRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Deposit not found");
  
  const request = requests[index];
  request.status = "rejected";
  request.updated_at = new Date().toISOString();
  request.admin_notes = `Rejected: ${reason}`;
  
  requests[index] = request;
  await fs.writeFile(path.join(dataDir, "deposits.json"), JSON.stringify(requests, null, 2));
  return request;
}

// WITHDRAWALS
export async function createWithdrawalRequest(userId: string, amount: number, network: string, phone: string): Promise<WithdrawalRequest> {
  await ensureDir();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  
  const settings = await getSettings();
  if (amount < settings.min_withdrawal) throw new Error(`Minimum withdrawal is ${settings.min_withdrawal} FCFA`);
  if (user.balance < amount) throw new Error("Insufficient balance");
  
  const requests = await getWithdrawalRequests();
  const fee = Math.round((amount * settings.withdrawal_fee) / 100);
  
  const newRequest: WithdrawalRequest = {
    id: generateId(),
    user_id: userId,
    name: user.name,
    phone,
    country: user.country,
    amount,
    network,
    fee_amount: fee,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  requests.push(newRequest);
  await fs.writeFile(path.join(dataDir, "withdrawals.json"), JSON.stringify(requests, null, 2));
  return newRequest;
}

export async function getWithdrawalRequests(): Promise<WithdrawalRequest[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "withdrawals.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function approveWithdrawal(id: string, admin_id: string): Promise<WithdrawalRequest> {
  const requests = await getWithdrawalRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Withdrawal not found");
  
  const request = requests[index];
  if (request.status !== "pending") throw new Error("Request already processed");
  
  // Debit user balance (amount + fee)
  await removeUserBalance(request.user_id, request.amount + request.fee_amount);
  
  // Mark as approved
  request.status = "approved";
  request.updated_at = new Date().toISOString();
  request.admin_notes = `Approved by admin ${admin_id}`;
  
  requests[index] = request;
  await fs.writeFile(path.join(dataDir, "withdrawals.json"), JSON.stringify(requests, null, 2));
  return request;
}

export async function rejectWithdrawal(id: string, admin_id: string, reason: string): Promise<WithdrawalRequest> {
  const requests = await getWithdrawalRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Withdrawal not found");
  
  const request = requests[index];
  request.status = "rejected";
  request.updated_at = new Date().toISOString();
  request.admin_notes = `Rejected: ${reason}`;
  
  requests[index] = request;
  await fs.writeFile(path.join(dataDir, "withdrawals.json"), JSON.stringify(requests, null, 2));
  return request;
}

// INVESTMENTS
export async function createInvestment(userId: string, productId: number, amount: number, dailyGain: number): Promise<Investment> {
  await ensureDir();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  if (user.balance < amount) throw new Error("Insufficient balance");
  
  const settings = await getSettings();
  const investments = await getInvestments();
  
  const startedAt = new Date();
  const endsAt = new Date(startedAt.getTime() + settings.investment_days * 24 * 60 * 60 * 1000);
  
  const newInvestment: Investment = {
    id: generateId(),
    user_id: userId,
    product_id: productId,
    amount,
    daily_gain: dailyGain,
    started_at: startedAt.toISOString(),
    ends_at: endsAt.toISOString(),
    days_elapsed: 0,
    status: "active",
    total_earned: 0,
  };
  
  // Debit user balance
  await removeUserBalance(userId, amount);
  user.investements += 1;
  await updateUser(userId, user);
  
  investments.push(newInvestment);
  await fs.writeFile(path.join(dataDir, "investments.json"), JSON.stringify(investments, null, 2));
  return newInvestment;
}

export async function getInvestments(): Promise<Investment[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "investments.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getInvestmentsByUserId(userId: string): Promise<Investment[]> {
  const investments = await getInvestments();
  return investments.filter((i) => i.user_id === userId);
}

// DAILY GAINS (Cron job)
export async function processDailyGains(): Promise<DailyGain[]> {
  const investments = await getInvestments();
  const gains: DailyGain[] = [];
  const gainsLog = await getDailyGains();
  const now = new Date();
  
  for (const investment of investments) {
    if (investment.status !== "active") continue;
    
    const startDate = new Date(investment.started_at);
    const endDate = new Date(investment.ends_at);
    
    if (now < startDate || now > endDate) {
      if (now > endDate) {
        investment.status = "completed";
      }
      continue;
    }
    
    // Check if gain was already credited today
    const today = now.toISOString().split("T")[0];
    const alreadyGainedToday = gainsLog.some(
      (g) => g.investment_id === investment.id && g.credited_at.split("T")[0] === today
    );
    
    if (!alreadyGainedToday) {
      const gain: DailyGain = {
        id: generateId(),
        user_id: investment.user_id,
        investment_id: investment.id,
        amount: investment.daily_gain,
        credited_at: now.toISOString(),
      };
      
      // Add to user balance
      await addUserBalance(investment.user_id, investment.daily_gain);
      
      // Update investment
      investment.days_elapsed += 1;
      investment.total_earned += investment.daily_gain;
      
      gainsLog.push(gain);
      gains.push(gain);
    }
  }
  
  // Update investments
  await fs.writeFile(path.join(dataDir, "investments.json"), JSON.stringify(investments, null, 2));
  await fs.writeFile(path.join(dataDir, "daily_gains.json"), JSON.stringify(gainsLog, null, 2));
  
  return gains;
}

export async function getDailyGains(): Promise<DailyGain[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "daily_gains.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// REFERRALS
export async function createReferral(referrerId: string, referredUserId: string): Promise<Referral> {
  const referrals = await getReferrals();
  const settings = await getSettings();
  
  const newReferral: Referral = {
    id: generateId(),
    referrer_id: referrerId,
    referred_user_id: referredUserId,
    level: 1,
    earned: 0,
    created_at: new Date().toISOString(),
  };
  
  referrals.push(newReferral);
  await fs.writeFile(path.join(dataDir, "referrals.json"), JSON.stringify(referrals, null, 2));
  return newReferral;
}

export async function getReferrals(): Promise<Referral[]> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "referrals.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// SETTINGS
export async function getSettings(): Promise<AdminSettings> {
  await ensureDir();
  try {
    const data = await fs.readFile(path.join(dataDir, "settings.json"), "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      telegram_link: "https://t.me/+74TGsMBlIwwyYTI0",
      payment_link: "https://payliv.shop/pay/plv_rkermm7f-",
      referral_level1: 25,
      referral_level2: 3,
      referral_level3: 2,
      withdrawal_fee: 15,
      min_withdrawal: 800,
      min_deposit: 2000,
      investment_days: 180,
    };
  }
}

export async function updateSettings(updates: Partial<AdminSettings>): Promise<AdminSettings> {
  const settings = await getSettings();
  const updated = { ...settings, ...updates };
  await fs.writeFile(path.join(dataDir, "settings.json"), JSON.stringify(updated, null, 2));
  return updated;
}

// STATS
export async function getStats() {
  const users = await getUsers();
  const deposits = await getDepositRequests();
  const withdrawals = await getWithdrawalRequests();
  const investments = await getInvestments();
  
  const countries = ["Bénin", "Cameroun", "Côte d'Ivoire", "Burkina Faso", "Niger"];
  const countryStats = countries.map((country) => {
    const countryUsers = users.filter((u) => u.country === country);
    const totalVolume = countryUsers.reduce((sum, u) => sum + u.balance, 0);
    return {
      country,
      users: countryUsers.length,
      volume: totalVolume,
    };
  });
  
  return {
    total_users: users.length,
    pending_deposits: deposits.filter((d) => d.status === "pending").length,
    pending_withdrawals: withdrawals.filter((w) => w.status === "pending").length,
    total_deposits: deposits.filter((d) => d.status === "approved").reduce((sum, d) => sum + d.amount, 0),
    total_withdrawals: withdrawals.filter((w) => w.status === "approved").reduce((sum, w) => sum + w.amount, 0),
    active_investments: investments.filter((i) => i.status === "active").length,
    total_volume: users.reduce((sum, u) => sum + u.balance, 0),
    country_stats: countryStats,
  };
}
