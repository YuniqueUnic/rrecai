"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/util";

import {
  messagesjson,
  NavbarTitle,
  ChatBubble,
  ThemeController,
  ExpandableButton,
  SearchTextBox,
  ChatInput,
} from "@/components/components";

const bgshow = false;

const headerColor = bgshow ? "bg-red-300" : null;
const chatColor = bgshow ? "bg-blue-300" : null;
const chatbgColor = bgshow ? "bg-cyan-300" : null;
const footerColor = bgshow ? "bg-green-300" : null;

let theme = "light";
const user_name = "Anakin";

const handleEvent = (query: string) => {
  console.log("event changed:", query);
  // Handle the input change logic
};

export default function Home() {
  const [inputAreaHight, setInputAreaHight] = useState(120);

  const handleInputBlur = () => {
    setInputAreaHight(120);
  };

  const handleInputFocus = () => {
    setInputAreaHight(223);
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
            <SearchTextBox onSearch={handleEvent} />
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
          "chat-container z-0 flex-grow min-w-full overflow-y-scroll flex flex-col",
          chatbgColor
        )}
        style={{ marginBottom: inputAreaHight }}
      >
        <div
          className={cn("flex flex-col min-h-fit min-w-full p-2", chatColor)}
        >
          {/* Messages */}
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
        </div>
      </div>

      {/* Message edit Footer */}
      <div
        id="messageEditFooter"
        // ref={footerInputRef}
        className={cn(
          "chat-input-container flex-none w-full p-2 fixed bottom-0 max-h-screen flex flex-row border-t",
          footerColor
        )}
      >
        <ChatInput
          onSend={handleEvent}
          onInputChange={handleEvent}
          onSelectChange={handleEvent}
          onFuncButtonClicked={handleEvent}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
        />
      </div>
    </main>
  );
}
