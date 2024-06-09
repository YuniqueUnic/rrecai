"use client";

// components/ChatInput.tsx
import React, { useState } from "react";
import { cn } from "../lib/util";

interface ChatInputProps {
  buttonName?: string;
  actionOptions?: string[];
  onSend: (message: string) => void;
  onChange: (query: string) => void;
}

const defualt_name = "Send";
const defualt_options = ["Message", "Info", "Todo", "Secret", "Idea"];

const ChatInput: React.FC<ChatInputProps> = ({
  buttonName = defualt_name,
  actionOptions = defualt_options,
  onSend,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("Sci-fi");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className="chat-input-container min-w-full flex flex-row">
      {/* Input */}
      <div className="flex-1 flex">
        <label className="form-control w-full">
          <input
            className="input input-bordered h-12 w-full"
            placeholder="Enter '/' to call functions"
            value={inputValue}
            onChange={handleChange}
          />
          <div className="label">
            <span className="label-text-alt">
              Enter <kbd className="kbd">/</kbd> to call functions
            </span>
            <span className="place-items-end">ALT</span>
          </div>
        </label>
      </div>

      {/* button and options */}
      <div className="flex-none ml-4">
        <div className="join join-vertical">
          <button
            className="btn btn-primary min-h-full join-item"
            onClick={handleSend}
          >
            {buttonName}
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
