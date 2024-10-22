import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";

const RestaurantDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg"
            alt="ResImage"
            className="object-cover w-full h-full rounded shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Tadoori Tadka</h1>
            <div className="flex gap-2 my-2">
              {["Biriyani", "Momos"].map((cuisine: string, idx: number) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5"/>
                <h1 className="flex items-center gap-2 font-medium">Delivery Time : <span className="text-[#d19254]">35 mins</span></h1>
              </div>
            </div>
          </div>
        </div>

        {/* Available Menu */}
        <AvailableMenu/>
      </div>
    </div>
  );
};

export default RestaurantDetail;
