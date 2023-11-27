import BottomBar from "@/components/BottomBar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getServerAuthSession } from "@/server/auth/authOptions";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/signIn");
  }
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
