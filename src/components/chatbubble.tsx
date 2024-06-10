// components/ChatBubble.tsx
import React from "react";
import Image from "next/image";
import { cn, parseTimestamp, formatTimestamp } from "@/lib/util";
import { Message } from "@/communicate/usermessage";

const defaultAlt = "Next.js + Tailwind CSS + TypeScript";
const defaultSrc =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

function showTimestamp(
  currentTimestamp: string,
  lastTimestamp?: string,
  spanSeconds: number = 1
): boolean {
  if (!lastTimestamp) {
    return true;
  }

  const currentTime = parseTimestamp(currentTimestamp);
  const lastTime = parseTimestamp(lastTimestamp);
  const spanMilliseconds = spanSeconds * 1000;

  return currentTime - lastTime > spanMilliseconds;
}

interface ChatBubbleProps {
  user: string;
  message: Message;
  lastMessage?: Message;
  spanSeconds?: number;
  alt?: string;
  src?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  user,
  message,
  lastMessage,
  spanSeconds = 60,
  alt = defaultAlt,
  src = defaultSrc,
}) => {
  const isUserSended = message.sender === user;

  const bubbleColorClass = (isDelivered: boolean) => {
    if (isUserSended) {
      return isDelivered ? "" : "chat-bubble-error";
    } else {
      return isDelivered ? "chat-bubble-primary" : "chat-bubble-error";
    }
  };

  const isShowTimestamp = showTimestamp(
    message.timestamp,
    lastMessage?.timestamp,
    spanSeconds
  );

  const formattedTimestamp = formatTimestamp(message.timestamp);

  const isShowName = (message: Message, lastMessage?: Message) => {
    if (!lastMessage) {
      return true;
    }
    return message.sender !== lastMessage.sender;
  };

  return (
    <div
      key={message.id}
      className={cn("chat", isUserSended ? "chat-end" : "chat-start")}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image width={40} height={40} alt={alt} src={src} />
        </div>
      </div>
      <div className="chat-header">
        {/* 根据 isUserSended 确定时间戳和发送者名称的顺序 */}
        {isUserSended ? (
          <>
            {isShowTimestamp && (
              <time className="text-xs opacity-30 mx-2">
                {formattedTimestamp}
              </time>
            )}
            {isShowName(message, lastMessage) && message.sender}
          </>
        ) : (
          <>
            {isShowName(message, lastMessage) && message.sender}
            {isShowTimestamp && (
              <time className="text-xs opacity-30 mx-2">
                {formattedTimestamp}
              </time>
            )}
          </>
        )}
      </div>
      <div className={cn("chat-bubble", bubbleColorClass(message.delivered))}>
        {message.text}
      </div>
      {isUserSended && !message.delivered && (
        <div className="chat-footer opacity-30">Not Delivered</div>
      )}
    </div>
  );
};

export default ChatBubble;
export { showTimestamp, ChatBubble };
