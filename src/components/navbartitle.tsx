"use client";
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
    <div>
      {/* Avatar Swap */}
      <div className="flex flex-row">
        <label className="swap align-middle justify-center justify-items-center">
          <input type="checkbox" onChange={onSwapChange} />
          <div className="swap-on">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <Image src={swapOnSrc} alt={swapOnAlt} width={8} height={8} />
              </div>
            </div>
          </div>
          <div className="swap-off">
            <div className="avatar offline">
              <div className="w-10 rounded">
                <Image src={swapOffSrc} alt={swapOffAlt} width={8} height={8} />
              </div>
            </div>
          </div>
        </label>
        {/* Infos */}
        <div className="mx-4 flex-none">
          <kbd className="kbd kbd-sm">{title}</kbd>
          <div className="font-extrabold text-sm">{info}</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTitle;
export { NavbarTitle };
