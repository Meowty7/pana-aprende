import { db } from "../../lib/db";
import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {

    const scores = db.prepare(`
                    SELECT u.username, SUM(s.score) AS total_score
                    FROM scores s
                    JOIN user u ON s.user_id = u.id
                    GROUP BY u.username
                    ORDER BY total_score DESC;`
                    ).all();

     return new Response(JSON.stringify(scores), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}