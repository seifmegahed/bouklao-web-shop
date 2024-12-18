import { sql } from "@vercel/postgres";
import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = env.LOCAL_DB
  ? drizzle(
      /**
       *  Mocking DB connection in test env
       *  Waiting for drizzle >= 0.35.0 to be LTS
       *  for the const db = drizzle.mock() feature
       *
       *  Keep an for release on orm.drizzle.team
       */
      env.NODE_ENV === "test"
        ? ({} as postgres.Sql<Record<string, unknown>>)
        : conn,
      {
        schema,
      },
    )
  : vercelDrizzle(sql, { schema });
