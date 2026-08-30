type FormErrorProps = React.PropsWithChildren;

export default function FormError({ children }: FormErrorProps) {
  if (!children) return null;

  return (
    <p className="px-3 py-1.5 text-destructive-foreground border border-destructive/30 bg-destructive/5 [&>svg]:text-destructive text-sm rounded-lg">
      {children}
    </p>
  );
}
