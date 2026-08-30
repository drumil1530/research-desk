export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <main className="flex min-h-svh flex-col">{children}</main>;
}
