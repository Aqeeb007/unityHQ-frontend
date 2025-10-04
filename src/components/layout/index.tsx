import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="p-1">
        <Navbar />
      </div>
      <div className="flex px-1 gap-4">
        <Sidebar />
        <div className="flex-1 container mx-auto p-6 space-y-6">{children}</div>
      </div>
    </div>
  );
};
