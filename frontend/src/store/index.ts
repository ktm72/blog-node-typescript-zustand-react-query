import { create } from "zustand";

export interface IFav {
  id: string;
  title: string;
}
type Store = {
  favs: IFav[] | [];
  addToFav: (data: IFav) => void;
  removeFromFav: (id: string) => void;
};

export const useStoreFav = create<Store>()((set) => ({
  favs: [],
  addToFav: (data: IFav) => set((state) => ({ favs: [...state.favs, data] })),
  removeFromFav: (id: string) =>
    set((state) => ({ favs: state.favs.filter((fav) => fav.id !== id) })),
}));
