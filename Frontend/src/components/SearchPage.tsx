import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import HeroImg from "@/assets/hero_pizza.png";
import { Skeleton } from "./ui/skeleton";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<string[]>(["Biriyani", "Momos", "Jalebi"]);
  const filteredResults = searchResults.filter((result => result.toString().includes(searchQuery)))

   // Simulate loading delay (Remove this in real use case)
   useEffect(()=>{
    const timer = setTimeout(() => setLoading(false),2000);

    return ()=>clearTimeout(timer)
   },[])

  const params = useParams();
  console.log("clicked params : ", params);
  return (
    <div className="max-w-7xl mx-auto my-10">
      {/* <div className="bg-red-600 text-yellow-200">
        {" "}
        <h1>
          SearchPage ({searchText}) -{" "}
          <span>SearchPage Params Text is not coming</span>
        </h1>
      </div> */}

      <div className="flex flex-col md:flex-row justify-between my-10 gap-10">
        <FilterPage/>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search By restaurant & cuisines"
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>

          {/* Implement Here skeleton */}
          {
            loading ? <SearchPageSkeleton/>
                    : (
                      <div>
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                        <h2 className="font-medium text-lg">(2) Search Result Found</h2>
                        <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
                          {["Biriyani", "Momos", "Jalebi"].map((selectedFilter: string, idx: number) => (
                            <div key={idx} className="relative inline-flex gap-1 items-center max-w-full whitespace-nowrap">
                              <Badge className="text-[#D19254] flex justify-center items-center rounded hover:cursor-pointer pr-5" variant="outline">
                                {selectedFilter}
                                <X size={16} className="absolute text-[#D19254] right-1  hover:cursor-pointer"/>
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Restaurant Cards */}
                      <div className="grid md:grid-cols-3 gap-4">
                        {
                          [1,2,3].map((item:number, idx:number)=>(
                            <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative">
                                <AspectRatio ratio={16/6}>
                                  <img src={HeroImg} className="w-full h-full object-cover" alt="" />
                                </AspectRatio>
                                <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 opacity-70 rounded-lg py-1 px-3">
                                  <span className="text-sm font-medium text-gray-900 dark:bg-white">Featured</span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                              <h1 className="text-2xl text-start font-bold text-gray-900 dark:text-gray-100">Pizza Hut</h1>
                              {/* className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400" */}
                              <div className=" mt-2 gap-1 flex items-center  text-gray-600 dark:text-gray-400">
                                <MapPin size={16}/>
                                <p className="text-sm">City:{" "} <span className="font-medium">Delhi</span></p>
                              </div>
                              <div className=" mt-2 flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <Globe size={16}/>
                                <p className="text-sm">Country:{" "} <span className="font-medium">India</span></p>
                              </div>
                              <div className="flex gap-2 mt-4 flex-wrap">
                                {
                                  ["Biriyani", "Momos", "Jalebi"].map((cuisine:string, idx:number)=>(
                                    <Badge key={idx} className="font-medium px-2 py-1 rounded-full shadow-md">{cuisine}</Badge>
                                  ))
                                }
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t rounded dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                              <Link to={`/restaurant/${123}`}>
                                <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full transition-colors duration-200">View Menus</Button>
                              </Link>
                            </CardFooter>
                          </Card>
                          ))
                        }
          
                      </div>
                    </div>
                      )
          }
        </div>
      </div>
    </div>
  );
};

export default SearchPage;


const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
