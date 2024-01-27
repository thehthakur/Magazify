import Filters from "@/components/Filters";
import Magazine_Entry from "@/components/Magazine_Entry";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Filters />
      <div className="flex justify-center my-8">
        <Link href="/magazines">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </div>
      <Magazine_Entry />
    </>
  );
}
