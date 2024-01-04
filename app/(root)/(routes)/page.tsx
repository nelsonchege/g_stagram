import SUggestedUser from "@/components/SUggestedUser";
import HomePost from "./_compontents/HomePost";
import SuggestedUsers from "@/components/SuggestedUsers";

export default async function Home() {
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
        <SuggestedUsers />
      </div>
    </div>
  );
}
