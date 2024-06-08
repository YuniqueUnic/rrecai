"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/util";
import messagesjson from "../../dev/data/message.json";
import NavbarTitle from "@/components/navbartitle";
import { showTimestamp, ChatBubble } from "@/components/chatbubble";
import { ThemeController } from "@/components/themecontroller";
import { ExpandableButton } from "@/components/expandableBbutton";
import { fromTheme } from "tailwind-merge";

const bgshow = false;

const headerColor = bgshow ? "bg-red-300" : null;
const chatColor = bgshow ? "bg-blue-300" : null;
const chatbgColor = bgshow ? "bg-cyan-300" : null;
const footerColor = bgshow ? "bg-green-300" : null;

export default function Home() {
  let theme = "light";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 card">
      {/* Header Navbar */}
      <div className={cn("flex flex-col min-h-fit min-w-full", headerColor)}>
        <header className="navbar flex flex-row justify-between min-h-fit min-w-full">
          {/* Expandable icon button */}
          <ExpandableButton
            key={"ExpandableButton"}
            onChange={() => {
              console.log("ExpandableButton clicked");
            }}
          />
          {/* Title */}
          <NavbarTitle
            key={"NavbarTitle"}
            onSwapChange={() => {
              console.log("NavbarTitle clicked");
            }}
          />
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
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
        </header>
        <div id="HeaderLine" className="flex flex-col w-full">
          {/* <div className="divider divider-center m-0 p-0 bg-current"></div> */}
          <line
            className={cn(
              "bg-current w-full max-h-0.5 h-0.5",
              theme !== "light" ? "opacity-0" : "opacity-40"
            )}
          />
        </div>
      </div>
      {/* Chat area */}
      <div
        className={cn(
          "flex flex-1 flex-col min-w-full align-bottom",
          chatbgColor
        )}
      >
        <div className="flex flex-1"></div>
        <div className="flex-none align-bottom">
          {/* Chat area */}
          <div
            className={cn("flex flex-col min-h-fit min-w-full p-2", chatColor)}
          >
            <div className="flex flex-col min-h-fit min-w-full">
              {/* Message Receiver */}
              <div>
                {messagesjson.map((message, index) => (
                  <ChatBubble
                    key={message.id}
                    index={index}
                    message={message}
                    showTimestamp={showTimestamp(
                      message.timestamp,
                      messagesjson[index - 1] || undefined
                    )}
                    showfooter={index === messagesjson.length - 1}
                  />
                ))}
              </div>

              {/* Message Sender */}
              <div className="chat chat-end">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message edit Footer */}
      <div className={cn("flex flex-row w-full p-2", footerColor)}>
        <div className="flex-1">
          <label className="form-control">
            {/* <div className="label">
            <span className="label-text">Your bio</span>
            <span className="label-text-alt">Alt label</span>
          </div> */}
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder=" Enter ''/'' to call functions"
            ></textarea>
            <div className="label">
              <span className="label-text-alt">
                Enter <kbd className="kbd">/</kbd> to call functions
              </span>
              <span className="place-items-end">Alt label</span>
            </div>
          </label>
        </div>
        <div className="flex-none min-h-full ml-4">
          <button className="btn btn-primary h-full">Neutral</button>
        </div>
      </div>
    </main>
  );
}
