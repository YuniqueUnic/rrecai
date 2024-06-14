// components/Sidebar.js
import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <button
        className="p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`fixed top-0 left-0 h-full bg-gray-800 p-6 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/about" className="text-white">About</Link>
          <Link href="/settings" className="text-white">Settings</Link>
        </nav>
      </div>
      <div className="flex-grow p-6">
        {/* 其他内容 */}
      </div>
    </div>
  );
};

export default Sidebar;
