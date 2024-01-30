import React, { useEffect, useState } from "react";
import { IFav, useStoreFav } from "../../store";
import { Button } from "keep-react";

interface DrawerType {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<DrawerType> = ({
  setClicked,
  clicked,
}): React.ReactNode => {
  const { favs: storedFavs, removeFromFav } = useStoreFav();
  const [favs, setFavs] = useState<IFav[] | []>([]);

  useEffect(() => {
    const updatedFavorites = JSON.parse(
      sessionStorage.getItem("favorite") || "[]"
    );
    setFavs(updatedFavorites);
  }, [storedFavs]);

  const HandleRemove = (id: string) => {
    removeFromFav(id);
    const filtered = favs.filter((fav) => fav.id !== id);
    sessionStorage.setItem("favorite", JSON.stringify(filtered));
  };

  return (
    <div className="flex ">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer"
        checked={clicked}
        onChange={() => setClicked((p) => !p)}
      />
      <div className="fixed top-0 right-0 z-20 w-64 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
        <label
          htmlFor="drawer-toggle"
          className="absolute top-0 right-46 inline-block p-2 text-white bg-indigo-500 text-center cursor-pointer"
        >
          X
        </label>
        <div className="px-6 py-4">
          <ul className="mt-10">
            {favs.length > 0
              ? favs.map((fav, idx) => (
                  <li
                    key={fav?.id}
                    className="flex justify-between gap-1 items-center py-2"
                  >
                    <a
                      href={`/blog/${fav?.id}`}
                      className="text-sm font-normal"
                    >
                      <span className="font-bold">{idx + 1}</span>. {fav?.title}
                    </a>
                    <Button
                      onClick={() => HandleRemove(fav?.id)}
                      size="sm"
                      type="primary"
                      circle={true}
                    >
                      x
                    </Button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
