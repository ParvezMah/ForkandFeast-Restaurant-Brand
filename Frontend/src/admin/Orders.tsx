import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      {/* Restaurant orders will display here */}
      <div className="space-y-8 ">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl gap-4 p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex-1 mb-6 sm:mb-0 text-start">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Lorem
            </h1>
            <p className="text-gray-600 dark:text-red-400 mt-2">
              <span className="font-semibold">Address : </span>Lorem ipsum dolor
              sit
            </p>
            <p className="text-gray-600 dark:text-red-400 mt-2">
              <span className="font-semibold">Total Amount : </span>160
            </p>
          </div>
          <div className="w-full sm:w-1/3 text-start">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Pending",
                  "Confirmed",
                  "Preparing",
                  "OutForDelivery",
                  "Delivered",
                ].map((status: string, idx: number) => (
                  <SelectItem key={idx} value={status.toLowerCase()}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;