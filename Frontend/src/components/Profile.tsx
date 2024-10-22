import {
    Loader2,
    Locate,
    Mail,
    MapPin,
    MapPinHouse,
    Plus
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const loading = false;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader(); //FileReader object is created to read the file as a Data URL, which allows the file (image) to be used as a base64 string.
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilepicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update Profile API Implementation
    console.log({ profileData });
  };
  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Avatar className="relative w-20 md:w-28 h-20 md:h-28">
            <AvatarImage src={selectedProfilePicture}/>
            <AvatarFallback>CN</AvatarFallback>
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={fileChangeHandler}
              className="hidden"
            />
            {/*               className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer" */}
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 min-h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            value={profileData.fullname}
            onChange={changeHandler}
            name="fullname"
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
            <Mail className="text-gray-500" />
            <div className="w-full">
                <Label>Email</Label>
                <input
                    name="email"
                    value={profileData.email}
                    onChange={changeHandler}
                    className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none"
                    />
            </div>
        </div>
            <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                <Locate className="text-gray-500" />
                <div className="w-full">
                    <Label>Address</Label>
                    <input
                    name="address"
                    value={profileData.address}
                    onChange={changeHandler}
                    className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none"
                    />
                </div>
            </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
      <div>
        {
            loading ? (<Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 animate-spin"/>Please Wait</Button>)
                    : (<Button className="bg-orange hover:bg-hoverOrange">Update</Button>)
        }
      </div>
    </form>
  );
};

export default Profile;
