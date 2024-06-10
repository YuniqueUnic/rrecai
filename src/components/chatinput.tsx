"use client";

import { cn } from "@/lib/util";
// components/ChatInput.tsx
import React, { useState } from "react";

interface ChatInputProps {
  buttonName?: string;
  actionOptions?: string[];
  onSend: (message: string) => void;
  onInputChange: (query: string) => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  onSelectChange: (option: string) => void;
  onFuncButtonClicked: (buttonName: string) => void;
}

const defualt_name = "Send";
let defualt_buttons = ["Add", "Del", "Full", "Markdonwn"];
const defualt_options = ["Message", "Info", "Todo", "Secret", "Idea"];

const ChatInput: React.FC<ChatInputProps> = ({
  buttonName = defualt_name,
  actionOptions = defualt_options,
  onSend,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onSelectChange,
  onFuncButtonClicked,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("Message");
  const [sendMethod, setSendMethod] = useState<"enter" | "ctrlEnter">(
    "ctrlEnter"
  );
  const [isFocused, setIsFocused] = useState(false);

  const [isFull, setIsFull] = useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    if (onInputFocus) {
      onInputFocus();
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (onInputBlur) {
      onInputBlur();
    }
    setIsFocused(false);
  };

  const textareaClass = isFocused ? "h-48" : "h-auto";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (sendMethod === "enter") {
      if (e.key === "Enter" && !e.ctrlKey) {
        onSend(inputValue);
        setInputValue("");
        e.preventDefault();
      } else if (e.key === "Enter" && e.ctrlKey) {
        setInputValue((prev) => prev + "\n");
      }
    } else if (sendMethod === "ctrlEnter") {
      if (e.key === "Enter" && e.ctrlKey) {
        onSend(inputValue);
        setInputValue("");
        e.preventDefault();
      } else if (e.key === "Enter" && !e.ctrlKey) {
        // do nothing
      }
    }
  };

  const handleSendWayChange = () => {
    setSendMethod((prev) => (prev === "enter" ? "ctrlEnter" : "enter"));
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    onSelectChange(e.target.value);
  };

  const handleFuncButtonClicked = (buttonName: string) => {
    onFuncButtonClicked(buttonName);
    switch (buttonName) {
      case "Add":
        break;
      case "Del":
        setInputValue("");
        break;
      case "Full":
        if (textAreaRef.current) {
          // if (!isFull) {
          //   setIsFull(true);
          //   console.log(screen.height);
          //   textAreaRef.current.style.height = screen.height - 152 + "px";
          //   handleFocus();
          // } else {
          //   setIsFull(false);
          //   textAreaRef.current.style.height = "auto";
          //   handleBlur();
          //   textAreaRef.current.focus();
          // }
        }
        break;
      case "Markdown":
        break;
      default:
        break;
    }
  };

  return (
    <div className="chat-input-container w-full flex flex-col">
      {/* Func Buttons */}
      <div className="flex justify-between place-items-center">
        <span className="overflow-y-hidden">
          <div className="join flex flex-row gap-2">
            {defualt_buttons.slice(1).map((button) => (
              <button
                key={button}
                className="btn btn-xs btn-outline"
                onClick={() => handleFuncButtonClicked(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </span>
        <span className="flex items-center">
          <button
            key={defualt_buttons[0]}
            className="btn btn-xs btn-circle btn-ghost bg-transparent"
            onClick={() => handleFuncButtonClicked(defualt_buttons[0])}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 20 22">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </span>
      </div>
      {/* Input */}
      <div className="mt-2 chat-input-container-2 flex flex-row">
        {/* Input */}
        <div className="flex-1 flex-col">
          <label className="form-control w-full">
            <textarea
              className={cn(
                " textarea textarea-bordered w-full col-span-3 resize-none",
                textareaClass
              )}
              placeholder="Enter '/' to call functions"
              ref={textAreaRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={inputValue}
              // inputMode="text"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </label>
        </div>
      </div>
      {/* Send button and options */}
      <div className="flex-none flex justify-between mt-2">
        <div className="flex place-items-end">
          <div className="flex align-middle gap-2">
            <div className="flex align-middle">
              <input
                type="checkbox"
                className="toggle toggle-md absolute opacity-0 align-middle"
                checked={sendMethod === "enter"}
                onChange={handleSendWayChange}
              />
              <kbd
                className={cn(
                  "kbd kbd-xs",
                  sendMethod === "enter" ? "bg-gray-200" : ""
                )}
              >
                {sendMethod === "enter" ? "" : "Ctrl"}
              </kbd>
            </div>
            <kbd className="kbd kbd-sm">Enter</kbd>
          </div>
        </div>
        <div className="join ">
          <select
            className="select select-bordered join-item"
            value={selectValue}
            onChange={handleSelectChange}
          >
            {actionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="btn btn-primary join-item" onClick={handleSend}>
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
