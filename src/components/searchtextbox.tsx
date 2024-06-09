"use client";
// components/SearchTextBox.tsx
import React, { useState, useRef, useEffect } from "react";

interface SearchTextBoxProps {
  onSearch: (query: string) => void;
}

const SearchTextBox: React.FC<SearchTextBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="flex items-center gap-4">
      {/* For small screens */}
      <div className="relative sm:hidden flex items-center">
        {isExpanded ? (
          <div className="flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              className="input input-bordered w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => setIsExpanded(false)} // Collapse on blur
            />
            <button
              className="btn btn-ghost btn-circle ml-2"
              onClick={() => setIsExpanded(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsExpanded(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* For larger screens */}
      <div className="hidden sm:flex items-center gap-2">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
    </div>
  );
};

export default SearchTextBox;
