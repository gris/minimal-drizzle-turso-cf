
import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { Hono } from 'hono';
import { users } from './schema';

const DATABASE_AUTH_TOKEN=""
const DATABASE_URL=""
const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
export const db = drizzle(client);

export const app = new Hono();

app.get('/users', async (ctx) => {
  try {
    const results =  await db.select().from(users).all()
    console.log(results)
    return ctx.json(results);
  } catch (error) {
    console.log(error)
  }
	return ctx.json({});
});

export default app;