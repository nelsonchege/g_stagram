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
  let src;
  if (typeof session.user.image !== "string") {
    src = "";
  } else {
    src = session.user.image;
  }

  return (
    <div className="h-screen w-full overflow-x-hidden absolute">
      <Navbar />
      <div className="flex">
        <Sidebar src={src} />
        <div className="w-full">{children}</div>
      </div>
      <BottomBar src={src} />
    </div>
  );
};

export default Layout;
