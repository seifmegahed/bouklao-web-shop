/**
 * This file is used to create an admin user in the database
 *
 * The program requires a .env file that contains the following variables:
 * - DATABASE_USER
 * - DATABASE_PASSWORD
 * - DATABASE_HOST
 * - DATABASE_PORT
 * - DATABASE_NAME
 *
 * - ADMIN_email
 * - ADMIN_PASSWORD
 *
 * You can find an example of the environment variables in the ../.env-e file.
 * Alternatively, you can pass the email and password as arguments
 *
 * You should not run this file from this directory, but from the parent directory (the one containing the .env file)
 * Use the script in the parent directory to run this file
 * before running this file make sure you run `pnpm install` in this directory
 *
 * @example
 * pnpm run admin
 *
 * @example
 * pnpm run admin admin@example.com Password123
 *
 */
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

const connectionString =
  !process.env.LOCAL_DB === "true"
    ? process.env.POSTGRES_URL
    : `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

const pool = new pg.Pool({
  connectionString,
});

const containsUppercase = (ch) => /[A-Z]/.test(ch);
const containsLowercase = (ch) => /[a-z]/.test(ch);

const checkPasswordComplexity = (password) => {
  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0;
  if (password.length < 8) return false;
  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
  }
  if (countOfLowerCase > 0 && countOfUpperCase > 0 && countOfNumbers > 0) {
    return true;
  }
  return false;
};

async function createAdminUser(email, password) {
  if (!email || !password) {
    console.error("Email and password are required.");
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO "admin" (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING id, email;
    `;

    const values = [email, hashedPassword, "Change me"];

    const result = await pool.query(query, values);
    const adminUser = result.rows[0];

    console.log("Admin user created:", adminUser);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

let [email, password] = process.argv.slice(2);

if (!email || !password) {
  email = process.env.ADMIN_EMAIL;
  password = process.env.ADMIN_PASSWORD;
}

if (!checkPasswordComplexity(password)) {
  console.error(
    "\n\
    Password should be at least 8 characters long\n\
    and should contain at least \n\
      one uppercase letter, \n\
      one lowercase letter, \n\
      and one number.\n\n",
  );
  process.exit(1);
}

if (email.length < 5) {
  console.error("\nEmail should be at least 5 characters long\n");
  process.exit(1);
}

createAdminUser(email, password)
  .then(() => {
    console.log("Admin user created successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating admin user:", err);
    process.exit(1);
  });
