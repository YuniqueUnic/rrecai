import { invoke } from "@tauri-apps/api/tauri";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  delivered: boolean;
}

async function postMessage(message: Message) {
  await invoke("post_message", { message: message })
    .then((res) => {
      console.log("message posted", res);
    })
    .catch(console.error);
}

async function getMessages(): Promise<Message[]> {
  const messages: Message[] = await invoke("get_messages");
  return messages;
}

export type { Message };
export { postMessage, getMessages };
