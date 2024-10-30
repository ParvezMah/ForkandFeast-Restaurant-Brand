import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { MenuFormSchema, menuSchema } from "@/schema/menuFormSchema";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>; //Dispatch<...>: Dispatch is a generic type that takes a SetStateAction and specifies that the state updater function will accept a value or function as described above.
}) => {

    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const loading = false;

    const [error, setError] = useState<Partial<MenuFormSchema>>({});

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);

        // Input result Validation
        const result = menuSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<MenuFormSchema>);
            return;
        }

        // API Implementation


      };

    useEffect(()=>{
        setInput({
            name: selectedMenu?.name || "",
            description: selectedMenu?.description || "",
            price: selectedMenu?.price || 0,
            image: undefined,
        })
    },[selectedMenu])

    return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Menu</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                <Label>Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="Enter menu name"
                />
                {error && (
                    <span className="text-xs font-medium text-red-600">
                    {error.name}
                    </span>
                )}
                </div>
                <div>
                <Label>Description</Label>
                <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Enter menu description"
                />
                {error && (
                    <span className="text-xs font-medium text-red-600">
                    {error.description}
                    </span>
                )}
                </div>
                <div>
                <Label>Price in (Rupees)</Label>
                <Input
                    type="number"
                    name="price"
                    value={input.price}
                    onChange={changeEventHandler}
                    placeholder="Enter menu price"
                />
                {error && (
                    <span className="text-xs font-medium text-red-600">
                    {error.price}
                    </span>
                )}
                </div>
                <div>
                <Label>Upload Menu Image</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={(e) =>
                    setInput({
                        ...input,
                        image: e.target.files?.[0] || undefined,
                    })
                    }
                />
                {error && (
                    <span className="text-xs font-medium text-red-600">
                    {error.image?.name}
                    </span>
                )}
                </div>
                <DialogFooter className="mt-5">
                {loading ? (
                    <Button disabled className="bg-orange hover:bg-hoverOrange">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait
                    </Button>
                ) : (
                    <Button className="bg-orange hover:bg-hoverOrange">
                    Submit
                    </Button>
                )}
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    );
};

export default EditMenu;
