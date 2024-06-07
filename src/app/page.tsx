import Image from "next/image";
import Greet, { ChangeTitleButton, CounterButton } from "../components/greet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Greet />
      <ChangeTitleButton></ChangeTitleButton>
      <CounterButton></CounterButton>
      <div className="card">
        <Image
          src="../vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </div>
    </main>
  );
}
