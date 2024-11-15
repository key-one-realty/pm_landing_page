import React from "react";
import ImageContainer from "./ImageContainer";
import {
  FieldError,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import AddressAutoComplete from "../AddressAutoComplete";

type FormInputForm = {
  placeholder: string;
  inputIcon: string;
  name: string;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  inputType?: string;
  options?: Array<string>;
  value: any;
  fieldOptions?: RegisterOptions<any, string> | undefined;
  error?: FieldError;
};

const FormInput = ({
  placeholder,
  inputIcon,
  name,
  options,
  register,
  setValue,
  value,
  fieldOptions,
  error,
  inputType = "text",
}: FormInputForm) => {
  const handleInputType = () => {
    switch (inputType) {
      case "text":
        return (
          <input
            {...register(name, fieldOptions)}
            placeholder={placeholder}
            type={inputType}
            name={name}
            className={`form-input ${value != "" && "text-secondary-black"}`}
          />
        );

      case "textarea":
        return (
          <textarea
            {...register(name, fieldOptions)}
            placeholder={placeholder}
            name={name}
            rows={5}
            className={`form-input ${value != "" && "text-secondary-black"}`}
          ></textarea>
        );

      case "select":
        return (
          <select
            className={`form-input ${
              value != "" &&
              (value.toLowerCase() != "property type" ||
                value != "Enter Number of Rooms") &&
              "text-secondary-black"
            }`}
            {...register(name, fieldOptions)}
          >
            <option defaultValue={""} disabled>
              {placeholder}
            </option>
            {options &&
              options?.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
          </select>
        );

      case "location":
        return (
          <AddressAutoComplete
            inputType={inputType}
            name={name}
            placeholder={placeholder}
            register={register}
            setValue={setValue}
            value={value}
            fieldOptions={fieldOptions}
          />
        );

      default:
        return (
          <input
            {...register(name, fieldOptions)}
            placeholder={placeholder}
            type={inputType}
            name={name}
            className={`form-input ${value != "" && "text-secondary-black"}`}
          />
        );
    }
  };

  return (
    <div className="rounded-[10px] py-3 px-[18px] bg-form-input flex-between gap-6 w-full relative">
      <div
        className={`w-fit ${
          inputType == "textarea" && "flex justify-start items-start h-full"
        } `}
      >
        <ImageContainer
          src={inputIcon}
          alt={`Icon for ${name} input field`}
          w={24}
          h={27}
        />
      </div>
      <div className="w-11/12">
        {handleInputType()}
        {error && <span className="text-red-300 text-sm">{error.message}</span>}
      </div>
    </div>
  );
};

export default FormInput;
