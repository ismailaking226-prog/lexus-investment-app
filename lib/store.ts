import { promises as fs } from "fs";
import path from "path";

export type Product = {
  id: number;
  name: string;
  amount: number;
  daily: number;
  total: number;
  image: string;
};

export type User = {
  id: number;
  name: string;
  phone: string;
  country: string;
  balance: number;
  investements: number;
  wallet: number;
};

export type DepositRequest = {
  id: number;
  userId: number;
  name: string;
  amount: number;
  phone: number | string;
  country: string;
  network: string;
  proof: string;
  date: string;
  status: "pending" | "approved" | "rejected";
};

export type WithdrawalRequest = {
  id: number;
  userId: number;
  name: string;
  amount: number;
  network: string;
  phone: number | string;
  country: string;
  date: string;
  status: "pending" | "approved" | "rejected";
};

export type AppData = {
  telegramLink: string;
  paymentLink: string;
  referral: { level1: number; level2: number; level3: number };
  products: Product[];
  users: User[];
  depositRequests: DepositRequest[];
  withdrawalRequests: WithdrawalRequest[];
  investments: Array<{
    id: number;
    userId: number;
    productId: number;
    amount: number;
    startedAt: string;
    status: "active" | "completed";
  }>;
};

const dataFilePath = path.join(process.cwd(), "data", "db.json");

const defaultData: AppData = {
  telegramLink: "https://t.me/+74TGsMBlIwwyYTI0",
  paymentLink: "https://payliv.shop/pay/plv_rkermm7f-",
  referral: { level1: 25, level2: 3, level3: 2 },
  products: [
    { id: 1, name: "Lexus S", amount: 2000, daily: 300, total: 54000, image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80" },
    { id: 2, name: "Lexus RX", amount: 5000, daily: 800, total: 144000, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80" },
    { id: 3, name: "Lexus ES", amount: 15000, daily: 2400, total: 432000, image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80" },
    { id: 4, name: "Lexus IS", amount: 35000, daily: 5600, total: 1008000, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80" },
    { id: 5, name: "Lexus GX", amount: 50000, daily: 8500, total: 1530000, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80" },
    { id: 6, name: "Lexus LC", amount: 100000, daily: 17000, total: 3060000, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80" },
    { id: 7, name: "Lexus LX", amount: 250000, daily: 45000, total: 8100000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80" },
    { id: 8, name: "Lexus UX", amount: 500000, daily: 100000, total: 18000000, image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80" },
    { id: 9, name: "Lexus F Sport", amount: 800000, daily: 200000, total: 36000000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80" },
  ],
  users: [
    { id: 1, name: "Louis Martin", phone: "+22964000001", country: "Bénin", balance: 1250000, investements: 3, wallet: 1250000 },
    { id: 2, name: "Awa Diallo", phone: "+22964000002", country: "Bénin", balance: 250000, investements: 1, wallet: 250000 },
    { id: 3, name: "Moussa Adam", phone: "+22799000001", country: "Niger", balance: 800000, investements: 2, wallet: 800000 },
    { id: 4, name: "Kouassi Yao", phone: "+22507880011", country: "Côte d’Ivoire", balance: 540000, investements: 1, wallet: 540000 },
  ],
  depositRequests: [
    { id: 1, userId: 2, name: "Awa Diallo", amount: 25000, phone: "+22964000002", country: "Bénin", network: "Orange Money", proof: "deposit-01.jpg", date: "2026-10-10", status: "pending" },
  ],
  withdrawalRequests: [
    { id: 1, userId: 3, name: "Moussa Adam", amount: 15000, network: "Orange Money", phone: "+22799000001", country: "Niger", date: "2026-10-09", status: "pending" },
  ],
  investments: [
    { id: 1, userId: 1, productId: 1, amount: 2000, startedAt: "2026-10-01T08:00:00.000Z", status: "active" },
    { id: 2, userId: 1, productId: 3, amount: 15000, startedAt: "2026-10-05T08:00:00.000Z", status: "active" },
  ],
};

async function ensureStorage() {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
  }
}

export async function readData(): Promise<AppData> {
  await ensureStorage();
  const raw = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(raw) as AppData;
}

export async function writeData(data: AppData) {
  await ensureStorage();
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function getProducts() {
  const data = await readData();
  return data.products;
}

export async function getUsers() {
  const data = await readData();
  return data.users;
}

export async function getStats() {
  const data = await readData();
  const countries = ["Bénin", "Cameroun", "Côte d’Ivoire", "Burkina Faso", "Niger"];
  const totals = countries.map((country) => {
    const users = data.users.filter((user) => user.country === country);
    return {
      country,
      users: users.length,
      net: `${(users.reduce((sum, user) => sum + user.balance, 0) / 100000).toFixed(1)}M FCFA`,
    };
  });

  return {
    users: data.users.length,
    deposits: data.depositRequests.length,
    withdrawals: data.withdrawalRequests.length,
    totalVolume: data.users.reduce((sum, user) => sum + user.balance, 0),
    countries: totals,
  };
}

export async function getTelegramLink() {
  const data = await readData();
  return data.telegramLink;
}

export async function setTelegramLink(link: string) {
  const data = await readData();
  data.telegramLink = link;
  await writeData(data);
  return data.telegramLink;
}

export async function getPaymentLink() {
  const data = await readData();
  return data.paymentLink;
}

export async function setPaymentLink(link: string) {
  const data = await readData();
  data.paymentLink = link;
  await writeData(data);
  return data.paymentLink;
}

export async function addDepositRequest(payload: Omit<DepositRequest, "id" | "status" | "date"> & { amount: number; userId?: number; name?: string; country?: string; proof?: string; network?: string; phone?: string | number; }) {
  const data = await readData();
  const user = data.users.find((item) => item.id === payload.userId) ?? data.users[0];
  const request: DepositRequest = {
    id: Date.now(),
    userId: payload.userId ?? user.id,
    name: payload.name ?? user.name,
    amount: Number(payload.amount),
    phone: payload.phone ?? user.phone,
    country: payload.country ?? user.country,
    network: payload.network ?? "Orange Money",
    proof: payload.proof ?? "proof.jpg",
    date: new Date().toISOString().slice(0, 10),
    status: "pending",
  };
  data.depositRequests.unshift(request);
  await writeData(data);
  return request;
}

export async function addWithdrawalRequest(payload: Omit<WithdrawalRequest, "id" | "status" | "date"> & { userId?: number; name?: string; network?: string; phone?: string | number; country?: string; amount?: number; }) {
  const data = await readData();
  const user = data.users.find((item) => item.id === payload.userId) ?? data.users[0];
  const request: WithdrawalRequest = {
    id: Date.now(),
    userId: payload.userId ?? user.id,
    name: payload.name ?? user.name,
    amount: Number(payload.amount ?? 0),
    network: payload.network ?? "Orange Money",
    phone: payload.phone ?? user.phone,
    country: payload.country ?? user.country,
    date: new Date().toISOString().slice(0, 10),
    status: "pending",
  };
  data.withdrawalRequests.unshift(request);
  await writeData(data);
  return request;
}

export async function approveDeposit(id: number) {
  const data = await readData();
  const request = data.depositRequests.find((item) => item.id === id);
  if (!request) return null;
  const user = data.users.find((item) => item.id === request.userId);
  if (!user) return null;
  user.balance += request.amount;
  user.wallet += request.amount;
  request.status = "approved";
  data.depositRequests = data.depositRequests.filter((item) => item.id !== id);
  await writeData(data);
  return { user, request };
}

export async function rejectDeposit(id: number) {
  const data = await readData();
  const request = data.depositRequests.find((item) => item.id === id);
  if (!request) return null;
  request.status = "rejected";
  data.depositRequests = data.depositRequests.filter((item) => item.id !== id);
  await writeData(data);
  return request;
}

export async function approveWithdrawal(id: number) {
  const data = await readData();
  const request = data.withdrawalRequests.find((item) => item.id === id);
  if (!request) return null;
  const user = data.users.find((item) => item.id === request.userId);
  if (!user) return null;
  if (user.balance < request.amount) return { error: "Solde insuffisant" };
  user.balance -= request.amount;
  user.wallet -= request.amount;
  request.status = "approved";
  data.withdrawalRequests = data.withdrawalRequests.filter((item) => item.id !== id);
  await writeData(data);
  return { user, request };
}

export async function rejectWithdrawal(id: number) {
  const data = await readData();
  const request = data.withdrawalRequests.find((item) => item.id === id);
  if (!request) return null;
  request.status = "rejected";
  data.withdrawalRequests = data.withdrawalRequests.filter((item) => item.id !== id);
  await writeData(data);
  return request;
}

export async function addInvestment(productId: number, userId: number, amount: number) {
  const data = await readData();
  const product = data.products.find((item) => item.id === productId);
  if (!product) return null;
  const user = data.users.find((item) => item.id === userId);
  if (!user) return null;
  if (user.balance < amount) return { error: "Solde insuffisant" };
  const newInvestment = {
    id: Date.now(),
    userId,
    productId,
    amount,
    startedAt: new Date().toISOString(),
    status: "active",
  };
  data.investments.unshift(newInvestment);
  user.balance -= amount;
  await writeData(data);
  return newInvestment;
}

export async function listInvestments() {
  const data = await readData();
  return data.investments;
}

export async function getReferral() {
  const data = await readData();
  return data.referral;
}

export async function updateReferral(levels: { level1: number; level2: number; level3: number }) {
  const data = await readData();
  data.referral = levels;
  await writeData(data);
  return data.referral;
}

export async function getPendingRequests() {
  const data = await readData();
  return {
    deposits: data.depositRequests.filter((item) => item.status === "pending"),
    withdrawals: data.withdrawalRequests.filter((item) => item.status === "pending"),
  };
}

export async function getHistory() {
  const data = await readData();
  return {
    deposits: data.depositRequests.filter((item) => item.status !== "pending"),
    withdrawals: data.withdrawalRequests.filter((item) => item.status !== "pending"),
  };
}
