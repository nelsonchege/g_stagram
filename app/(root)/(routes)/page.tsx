import SUggestedUser from "@/components/SUggestedUser";
import HomePost from "./_compontents/HomePost";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className="min-h-screen flex flex-col items-center">
          <h1 className="py-5 pl-10 font-extrabold text-4xl self-start">
            Home Feed
          </h1>
          <HomePost />
        </div>
      </div>
      <div className="hidden lg:block w-[30%] h-screen p-5">
        <h2 className="font-semibold text-xl">Suggested for you </h2>
        <div className="w-full py-3 mt-5">
          <SUggestedUser
            comment={"followed by w_g"}
            name={"Briano Roloff"}
            src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          />
          <SUggestedUser
            comment={"follows you"}
            name={"Myrtice Rantoul"}
            src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
          />
          <SUggestedUser
            comment={"followed by w_g"}
            name={"Livvie Kenaway"}
            src={"https://i.pravatar.cc/150?u=a04258a2462d826712d"}
          />
          <SUggestedUser
            comment={"follows you"}
            name={"Briggs McLagain"}
            src={"https://i.pravatar.cc/150?u=a04258114e29026708c"}
          />
        </div>
      </div>
    </div>
  );
}
