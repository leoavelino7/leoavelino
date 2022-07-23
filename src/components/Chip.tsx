type TagsAllowed = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "span";

export const Chip: React.FC<React.HTMLAttributes<HTMLSpanElement> & { Tag?: TagsAllowed }> = ({
  children,
  className = "",
  Tag = "span",
  ...rest
}) => (
  <Tag className={`bg-primary text-paper font-poppins font-medium py-2 px-4 text-xs rounded-full ${className}`} {...rest}>
    {children}
  </Tag>
);
