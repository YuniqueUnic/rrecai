"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/util";
import messagesjson from "../../dev/data/message.json";
import { NavbarTitle } from "@/components/navbartitle";
import { showTimestamp, ChatBubble } from "@/components/chatbubble";
import { ThemeController } from "@/components/themecontroller";
import { ExpandableButton } from "@/components/expandableBbutton";
import SearchTextBox from "@/components/searchtextbox";
import ChatInput from "@/components/chatinput";

const bgshow = false;

const headerColor = bgshow ? "bg-red-300" : null;
const chatColor = bgshow ? "bg-blue-300" : null;
const chatbgColor = bgshow ? "bg-cyan-300" : null;
const footerColor = bgshow ? "bg-green-300" : null;

const user_name = "Anakin";

export default function Home() {
  let theme = "light";

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Handle search logic here
  };

  const handleSend = (message: string) => {
    console.log("Message sent:", message);
    // Handle the message sending logic
  };

  const handleChange = (query: string) => {
    console.log("Input changed:", query);
    // Handle the input change logic
  };

  return (
    <main className="app-layout flex flex-col h-screen hero">
      {/* Header Navbar */}
      <div
        className={cn(
          "chat-navbar-container grid-row flex-none flex flex-col min-h-fit min-w-full top-0 sticky border-b",
          headerColor
        )}
      >
        <header className="navbar flex flex-row justify-between min-h-fit min-w-full">
          {/* Navbar Start - Expandable icon button */}
          <div className="navbar-start">
            <ExpandableButton
              key={"ExpandableButton"}
              onChange={() => {
                console.log("ExpandableButton clicked");
              }}
            />
          </div>
          {/* Navbar Center - Title */}
          <div className="navbar-center pt-2">
            <NavbarTitle
              key={"NavbarTitle"}
              onSwapChange={() => {
                console.log("NavbarTitle clicked");
              }}
            />
          </div>
          {/* Navbar End */}
          <div className="flex flex-row flex-none navbar-end">
            <div className="z-10">
              {/* Search */}
              <SearchTextBox onSearch={handleSearch} />
            </div>
            {/* Theme controller */}
            <ThemeController
              key={"themeContoller"}
              themeValue="dark"
              onThemeChange={(themeValue) => {
                if (theme !== "light") {
                  theme = "light";
                } else {
                  theme = "dark";
                }
                console.log("ThemeController clicked: ", theme);
              }}
            />
          </div>
        </header>
      </div>

      {/* Chat area */}
      <div
        className={cn(
          "chat-container z-0 flex-grow min-w-full overflow-y-scroll flex flex-col mb-28",
          chatbgColor
        )}
      >
        <div>
          <div
            className={cn("flex flex-col min-h-fit min-w-full p-2", chatColor)}
          >
            {/* Message Receiver */}
            <div id="message-list">
              {messagesjson.map((message, index) => (
                <ChatBubble
                  key={message.id}
                  user={user_name}
                  message={message}
                  lastMessage={messagesjson[index - 1] || null}
                  spanSeconds={300}
                />
              ))}
            </div>

            {/* Message Sender */}
            {/* <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    width={10}
                    height={10}
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Message edit Footer */}
      <div
        className={cn(
          "chat-input-container flex-none min-w-full p-2 fixed bottom-0 max-h-full flex flex-row border-t",
          footerColor
        )}
      >
        <ChatInput onSend={handleSend} onChange={handleChange} />
      </div>
    </main>
  );
}
