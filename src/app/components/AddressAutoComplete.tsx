"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { autocomplete } from "../utils/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useDebounceValue } from "../utils/customHooks";

type AddressAutoCompleteProps = {
  name: string;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  placeholder: string;
  inputType: string;
  value: any;
  fieldOptions?: RegisterOptions<any, string> | undefined;
};

const AddressAutoComplete = ({
  register,
  setValue,
  name,
  placeholder,
  inputType,
  value,
  fieldOptions,
}: AddressAutoCompleteProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [places, setPlaces] = useState<PlaceAutocompleteResult[] | undefined>(
    []
  );
  const [userInput, setUserInput] = useState("");

  const debouncedAddressInput = useDebounceValue(userInput, 500);

  const handlePredictAddress = async () => {
    if (debouncedAddressInput && debouncedAddressInput != value) {
      const placePredictions = await autocomplete(debouncedAddressInput);

      setPlaces(placePredictions);
    } else {
      setPlaces([]);
    }
  };

  const handleOutsideClick: { (event: MouseEvent | TouchEvent): void } = (
    e: MouseEvent | TouchEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setPlaces([]);
      document.removeEventListener("mouseup", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    }
  };

  useEffect(() => {
    handlePredictAddress();

    if (typeof window != "undefined") {
      document.addEventListener("mouseup", handleOutsideClick);
      document.addEventListener("touchend", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    };
  }, [debouncedAddressInput]);

  const handleSelectPlace = (selectedPlace: PlaceAutocompleteResult) => {
    if (setValue) {
      setValue!(name, selectedPlace.description, { shouldValidate: true });
      setUserInput(selectedPlace.description);
      console.log(`Value Updated`);
    }
    register(name, { value: selectedPlace.description });
    console.log(`Selected Place: ${selectedPlace.description}`);
    setPlaces([]);
  };

  return (
    <div className="w-full">
      <input
        {...register(name, fieldOptions)}
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        placeholder={placeholder}
        type={inputType}
        name={name}
        className={`form-input ${userInput != "" && "text-secondary-black"}`}
        aria-label={placeholder}
        autoComplete="off"
      />

      <div
        ref={dropdownRef}
        className="absolute top-11 left-0 w-full flex-center-col bg-form-input z-40 rounded-b-[20px] max-h-64 overflow-y-auto shadow-lg"
      >
        {places?.map((place) => (
          <div
            className="p-2 w-11/12 cursor-pointer hover:bg-gray-200 transition-colors"
            key={place.place_id}
            onClick={() => handleSelectPlace(place)}
          >
            {" "}
            {place.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressAutoComplete;
