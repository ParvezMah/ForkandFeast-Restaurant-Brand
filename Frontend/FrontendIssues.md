# Issue-1 : Zustand persist is not working while i'm trying to reloading my UI

##  Code 
```
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useCartStore = create(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state:any) => ({ count: state.count + 1 })),
      }),
      {
        name: "cart-name",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          console.log("Rehydrated state:", state); // Debugging hydration
        },
      }
    )
  );
```
![alt text](image.png)

## Solved
    -> Solution
    -> i did not add it that's why we are facing some error
        ```
        <Button onClick={increment} className="bg-orange hover:bg-hoverOrangerounded">Logout</Button>
        ```





# Issue-2 : internal server error when trying to signup ![alt text](image-1.png) - 12:44:35 • User Zustand Store
    -> useUserStore.ts
    -> ![alt text](image-2.png)
    -> const API_END_POINT = "http://localhost:8000/api/v1/user";
       axios.defaults.withCredentials = true