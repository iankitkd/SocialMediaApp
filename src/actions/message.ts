import serverApiRequest from "@/lib/serverApiRequest";
import { appEnv } from "@/lib/env";

const BACKEND_URL = appEnv.BACKEND_API_URL;

export async function getConversations() {
    try {
        const conversations = await serverApiRequest(`${BACKEND_URL}/conversations`, "GET");
        return conversations.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}

// export async function getMessages(receiverId: string): Promise<Message[]> {
//     try {
//         const messages = await serverApiRequest(`${BACKEND_URL}/messages`, "GET", {
//             data: {receiverId}
//         });
//         return messages;
//     } catch (error) {
//         throw new Error(error instanceof Error ? error.message : "Something went wrong");
//     }
// }