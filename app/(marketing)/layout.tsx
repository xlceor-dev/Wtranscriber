
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grow w-full h-full flex">{children}</div>
    );
  }