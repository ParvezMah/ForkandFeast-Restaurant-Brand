import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestaurantFormSchema } from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  console.log("Input is : ", input);
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});


  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const loading = false;
  const restaurantHai = true;
  return (
    <div className="max-w-6xl my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <form action="">
            <div className="md:grid grid-cols-2 space-y-2 md:space-y-0 text-left">
              {/* Restaurant Name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  placeholder="Enter Your restaurant name"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input 
                    type="text" 
                    name="city" 
                    placeholder="Enter Your City" 
                    value={input.city}
                    onChange={changeEventHandler}
                />
              </div>
              {/* Restaurant Name */}
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  placeholder="Enter Your Country"
                  value={input.country}
                  onChange={changeEventHandler}
                />
              </div>
              {/* Restaurant Name */}
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  placeholder="Enter Your Delivery Time"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                />
              </div>
              {/* Restaurant Name */}
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  placeholder="Enter Your Cuisines"
                  value={input.cuisines}
                  onChange={(e)=>setInput({...input, cuisines:e.target.value.split(",")})}
                />
              </div>
              {/* Restaurant Name */}
              <div>
                <Label>Upload Restaurant Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  placeholder="Enter Your restaurant Image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 w-fit">
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {" "}
                  <Loader2 className="animate-spin mr-2 w-5 h-5" /> Please Wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {restaurantHai
                    ? "Updated Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
