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
  

// export const useCartStore = create()(persist((set) => ({
//     count:0,
//     increment: () => {
//         set((state: any)=> ({count: state.count + 1}))
//     }
// }),
//     {
//         name: 'cart-name',
//         storage: createJSONStorage(()=> localStorage)
//     }
// ))

//Using typescript
// // Define the shape of your store
// interface CartStore {
//     count: number; // State property
//     increment: () => void; // Function to update the state
//   }

// export const useCartStore = create<CartStore>((set) => ({
//     count: 0,
//     increment: ()=> set((state)=> ({count:state.count + 1})),
// }))
