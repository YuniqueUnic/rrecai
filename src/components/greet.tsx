"use client";

import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function requestIncrement(num: number) {
  invoke("increase_counter", { increment: num })
    .then((res) => {
      console.log("current num is ", res);
    })
    .catch(console.error);
}

export default function Greet() {
  useEffect(() => {
    invoke<string>("greet", { name: "Hello tauri - Next.js" })
      .then(console.log)
      .catch(console.error);
  }, []);
  return <div>Greetings!</div>;
}

export function ChangeTitleButton() {
  return (
    <button
      className="inline-block cursor-auto btn"
      onClick={() => {
        invoke("setKV", { title: "Hello tauri - Next.js" })
          .then(() => {
            console.log("setKV success");
          })
          .catch(console.error);
      }}
    >
      Change title
    </button>
  );
}

export function CounterButton() {
  // 使用 useRef 创建对输入元素的引用，并注解其类型为 HTMLInputElement
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrement = () => {
    // 确保 inputRef 当前指向的元素不为空
    if (inputRef.current) {
      const incrementValue = parseInt(inputRef.current.value, 10);
      console.log("the value of incrementNum: ", incrementValue);
      requestIncrement(incrementValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center card">
      <div className="card-title justify-center">
        {/* 这里使用 span 来代替不存在的 <text> 标签 */}
        <span id="incrementNum">Counter:</span>
        {/* 添加 ref 属性到 input 元素上 */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="card-body">
        <button
          className="inline-block cursor-pointer rounded-md bg-gray-400 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-gray-900"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
