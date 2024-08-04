import { db } from "../../lib/db"; // Replace with actual path to your database module
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    try {
        // Parse form data
        const { user_id: userId, score: scoreValue } = await context.request.json();

        // Validate userId and score
        if (typeof userId !== "string" || !userId) {
            return new Response(
                JSON.stringify({ error: "Invalid or missing user ID" }),
                { status: 400 }
            );
        }

        const score = Number(scoreValue);
        if (isNaN(score) || score <= 0) {
            return new Response(
                JSON.stringify({ error: "Invalid score value" }),
                { status: 400 }
            );
        }

        // Insert score into the database
        const user_logged =  db.prepare("SELECT * FROM session where user_id = ?").get(userId)

        if(user_logged) {
            db.prepare("INSERT INTO scores (user_id, score) VALUES(?, ?)").run(
                userId,
                score
            );
        } else {
            return new Response(
                JSON.stringify({
                    error: "No user logged in",
                }),
                {
                    status: 400
                }
            );
        }

        return new Response(
            JSON.stringify({
              message: 'Datos recibidos con éxito'
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return new Response(
                JSON.stringify({ error: 'Error al procesar la solicitud' }),
                { status: 500 }
            );
        }
        return new Response(
            JSON.stringify({ error: 'Error al procesar la solicitud' }),
            { status: 500 }
        );
    }
}