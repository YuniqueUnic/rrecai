"use client"

import { CounterAddButton, Greet } from "@/components/greet";
import { ReactNode } from "react";
import { Suspense } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function AboutLayout({
    children,
  }: {
    children: ReactNode
  }) {

    // const albums = use(fetchData("/albums"));

    return (
        <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <a>Im from layout</a>
        <Suspense fallback={<Loading />}>
            <Greet load_sec={4} />
        </Suspense>
        <CounterAddButton onButtonClicked={()=>{

            console.log(process.env.NEXT_PUBLIC_DEV_TYPE);

        }}></CounterAddButton>
        <nav></nav>
        {children}
      </section>
    )
  }

  const Loading = ()=>{
    return <h2>🌀 Loading...</h2>;
  }

 