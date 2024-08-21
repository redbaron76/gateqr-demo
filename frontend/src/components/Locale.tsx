import React, { type PropsWithChildren } from "react";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const Locale: React.FC<PropsWithChildren<Props>> = ({
  as,
  children,
  className,
}) => {
  const Tag = as || "span";
  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: children as string }}
      className={className}
    />
  );
};

export default Locale;
