import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";

interface Props {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: React.ReactNode;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  contentClassName,
  endAdornment,
  className,
  children,
}) => {
  return (
    <div className={cn(className, "bg-white rounded-3xl")}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}
      <div className={cn(contentClassName)}>{children}</div>
    </div>
  );
};
