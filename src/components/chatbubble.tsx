import Image from "next/image";
import { cn } from "@/lib/util";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  delivered: boolean;
}

const defualt_alt = "Next.js + Tailwind CSS + TypeScript";
const defualt_src =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

function showTimestamp(timestamp: string, lastRecord: Message): boolean {
  if (!lastRecord) {
    return true;
  }

  if (lastRecord) {
    if (timestamp === lastRecord.timestamp) {
      return false;
    }
  }
  return true;
}

interface ChatBubbleProps {
  index: number;
  message: Message;
  showTimestamp: boolean;
  showfooter: boolean;
  alt?: string;
  src?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  index,
  message,
  showTimestamp,
  showfooter,
  alt = defualt_alt,
  src = defualt_src,
}) => {
  // 使用导入的 JSON 数据
  return (
    <div>
      {/* 假设 messageData 是一个数组，我们使用 map 函数来渲染每个消息 */}
      {/* {messages.map((message, index) => (
      ))} */}
      <div key={message.id} className="chat chat-start ">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image width={10} height={10} alt={alt} src={src} />
          </div>
        </div>
        <div className="chat-header">
          {index === 0 ? message.sender : null}
          {showTimestamp || !message.delivered ? (
            <time className="text-xs opacity-30 mx-2">{message.timestamp}</time>
          ) : null}
        </div>
        <div
          className={cn(
            "chat-bubble",
            message.delivered ? "chat-bubble-primary" : "chat-bubble-error"
          )}
        >
          {message.text}
        </div>
        {showfooter && <div className="chat-footer opacity-50">Delivered</div>}
      </div>
    </div>
  );
};

export default ChatBubble;
export { showTimestamp, ChatBubble };
