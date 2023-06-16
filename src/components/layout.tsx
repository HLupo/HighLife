import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen">
      <div className="w-full">{props.children}</div>
    </main>
  );
};
