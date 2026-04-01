import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.API_GROQ_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `Ты эксперт в области IT и программирования. Ты помогаешь пользователям по вопросам и задачам, связанным с IT и программированием.
    Основные правила: 
    - обращайся к пользователю "Господин"
    - если пользователь отклоняется от IT темы назови его "Некудышным импровизатором"
`;

export async function askDeepSeek(userMessage: string): Promise<string> {
    const response = await client.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT},
            { role: 'user', content: userMessage},
        ],
    });

    return response.choices[0]?.message?.content ?? 'Не удалось получить ответ';
}