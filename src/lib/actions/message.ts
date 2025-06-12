import apiClientAction from "./apiClientAction";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function getConversations() {
    try {
        const conversations = await apiClientAction(`${BACKEND_URL}/conversations`, "GET");
        return conversations.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}

// export async function getMessages(receiverId: string): Promise<Message[]> {
//     try {
//         const messages = await apiClientAction(`${BACKEND_URL}/messages`, "GET", {
//             data: {receiverId}
//         });
//         return messages;
//     } catch (error) {
//         throw new Error(error instanceof Error ? error.message : "Something went wrong");
//     }
// }