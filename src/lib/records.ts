import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AccountType } from "@/lib/contacts";

export type Registration = {
  id: string;
  accountType: AccountType;
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
};

export type WebsiteOrder = {
  id: string;
  reference: string;
  accountType: AccountType;
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  registered: boolean;
  area: string;
  details: string;
  createdAt: string;
};

type Database = {
  registrations: Registration[];
  orders: WebsiteOrder[];
};

const directory = process.env.DATA_DIR?.trim() || path.join(process.cwd(), "data");
const file = path.join(directory, "records.json");

let queue: Promise<unknown> = Promise.resolve();

function withDatabase<T>(change: (db: Database) => Promise<T> | T, persist: boolean): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDatabase();
    const result = await change(db);
    if (persist) await writeDatabase(db);
    return result;
  });
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readDatabase(): Promise<Database> {
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return {
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    };
  } catch {
    return { registrations: [], orders: [] };
  }
}

async function writeDatabase(db: Database) {
  await mkdir(directory, { recursive: true });
  const temp = path.join(directory, `records.${process.pid}.tmp`);
  await writeFile(temp, JSON.stringify(db, null, 2));
  await rename(temp, file);
}

function matches(entry: { email?: string; phone?: string }, email?: string, phone?: string) {
  return (email && entry.email === email) || (phone && entry.phone === phone);
}

export function referenceCode(): string {
  return randomBytes(3).toString("hex").toUpperCase();
}

export function memberMatch(email?: string, phone?: string): Promise<Registration | undefined> {
  return withDatabase(
    (db) => db.registrations.find((entry) => matches(entry, email, phone)),
    false,
  );
}

export function createRegistration(
  entry: Registration,
  notify: () => Promise<void>,
): Promise<"exists" | "saved"> {
  return withDatabase(async (db) => {
    if (db.registrations.some((current) => matches(current, entry.email, entry.phone))) {
      return "exists";
    }
    await notify();
    db.registrations.push(entry);
    return "saved";
  }, true);
}

export function createOrder(entry: WebsiteOrder, notify: () => Promise<void>): Promise<void> {
  return withDatabase(async (db) => {
    await notify();
    db.orders.push(entry);
  }, true);
}
