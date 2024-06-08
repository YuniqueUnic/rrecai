"use client";
import React from "react";
import Image from "next/image";

interface NavbarTitleProps {
  title?: string;
  info?: string;
  onSwapChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  swapOnSrc?: string;
  swapOffSrc?: string;
  swapOnAlt?: string;
  swapOffAlt?: string;
}

const NavbarTitle: React.FC<NavbarTitleProps> = ({
  title = "Name",
  info = "9643.9",
  onSwapChange,
  swapOnSrc = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  swapOffSrc = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  swapOnAlt = "avatar",
  swapOffAlt = "avatar",
}) => {
  // const [isActive, setIsActive] = useState(swapActive);

  // const toggleSwapActive = () => {
  //   setIsActive(!isActive);
  // };

  // useEffect(() => {
  //   console.log("isActive updated: ", isActive);
  // }, [isActive]);

  return (
    <div className="flex-1">
      {/* Title */}
      {/* placeholder */}
      <a className="flex-auto"></a>

      {/* Avatar Swap */}
      <label className="swap swap-flip mt-2">
        <input type="checkbox" onChange={onSwapChange} />
        <div className="swap-on">
          {/* avatar */}
          <div className="avatar online">
            <div className="w-10 rounded-full">
              <Image src={swapOnSrc} alt={swapOnAlt} width={12} height={12} />
            </div>
          </div>
        </div>
        <div className="swap-off">
          {/* avatar */}
          <div className="avatar">
            <div className="w-10">
              <Image src={swapOffSrc} alt={swapOffAlt} width={12} height={12} />
            </div>
          </div>
        </div>
      </label>
      {/* Infos */}
      <div className="mx-4">
        <kbd className="kbd kbd-sm">{title}</kbd>
        <div className="stat-value text-sm">{info}</div>
        {/* <div className="stat-desc">21% more than last month</div> */}
      </div>
      {/* placeholder */}
      <a className="flex-auto"></a>
    </div>
  );
};

export default NavbarTitle;
