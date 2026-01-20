import React from "react";

export default function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={"bg-white rounded-2xl p-4 shadow-card " + className}>{children}</div>;
}
