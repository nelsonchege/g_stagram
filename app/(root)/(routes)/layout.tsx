import BottomBar from "@/components/BottomBar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-full overflow-x-hidden absolute">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Layout;
