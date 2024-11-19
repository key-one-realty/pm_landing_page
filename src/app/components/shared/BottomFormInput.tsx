"use client";
import React, { useCallback } from "react";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type BottomFormInputProps = {
  name: string;
  placeholder: string;
  inputType?: string;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  fieldOptions?: RegisterOptions<any, string> | undefined;
  error?: FieldErrors<any>;
};

const BottomFormInput = ({
  name,
  placeholder,
  register,
  fieldOptions,
  error,
  inputType = "text",
}: BottomFormInputProps) => {
  const handleInputType = useCallback(() => {
    switch (inputType) {
      case "text":
        return (
          <input
            {...register(name, fieldOptions)}
            name={name}
            placeholder={placeholder}
            type={inputType}
            className="text-lg font-semibold text-white outline-none border-none bg-transparent w-full"
          />
        );
      case "textarea":
        return (
          <textarea
            {...register(name, fieldOptions)}
            name={name}
            placeholder={placeholder}
            rows={3}
            className="text-lg w-full font-semibold text-white outline-none border-none bg-transparent"
          />
        );

      default:
        return (
          <input
            {...register(name, fieldOptions)}
            name={name}
            placeholder={placeholder}
            type={inputType}
            className="text-lg font-semibold text-white outline-none border-none bg-transparent w-full"
          />
        );
    }
  }, []);

  return (
    <>
      <div className="w-full py-4 border-b border-b-white">
        {handleInputType()}
      </div>
      {error && error[name] && (
        <span className="text-red-300 text-sm">
          {error[name].message?.toString()}
        </span>
      )}
    </>
  );
};

export default BottomFormInput;
