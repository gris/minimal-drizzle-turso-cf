
import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { Hono } from 'hono';
import { users } from './schema';

const DATABASE_AUTH_TOKEN=""
const DATABASE_URL="http://127.0.0.1:8080"

export const app = new Hono();

app.get('/users', async (ctx) => {
  try {
    const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
    const db = drizzle(client);

    const results =  await db.select().from(users).all()
    console.log(results)
    return ctx.json(results);
  } catch (error) {
    console.log(error)
  }
	return ctx.json({});
});

export default app;