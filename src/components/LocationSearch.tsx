import type { Place } from "../api/Place";
import { useState } from "react";
import { search } from "../api/search";
import { Fragment } from "react";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await search(term);
    setPlaces(result);

    setTerm("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <h1 className="font-bold mt-6">Found locations</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button
                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded cursor-pointer"
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className="border-b w-full col-span-2"></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
