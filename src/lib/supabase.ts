import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const client = url && key ? createClient(url, key) : null

export async function logChat(sessionId: string, userMessage: string, botResponse: string) {
  if (!client) return
  await client.from('chat_logs').insert({ session_id: sessionId, user_message: userMessage, bot_response: botResponse })
}
