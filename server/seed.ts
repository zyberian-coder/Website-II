
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcrypt";
import { users } from "../shared/schema";

async function main() {
  const { DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!DATABASE_URL || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error(
      "Missing required environment variables for seeding: DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD"
    );
  }

  console.log("Seeding database with admin user...");

  const client = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  // Check if admin user already exists
  const existingUsers = await db
    .select()
    .from(users)
    .where({ username: ADMIN_USERNAME });

  if (existingUsers.length > 0) {
    console.log("Admin user already exists. Seeding skipped.");
    process.exit(0);
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

  // Insert the admin user
  await db.insert(users).values({
    username: ADMIN_USERNAME,
    password: hashedPassword,
  });

  console.log("✅ Database seeded successfully with admin user!");
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Database seeding failed:", err);
  process.exit(1);
});
