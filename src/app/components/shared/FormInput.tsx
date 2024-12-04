import React from "react";
import ImageContainer from "./ImageContainer";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import AddressAutoComplete from "../AddressAutoComplete";
import PhoneInput from "react-phone-number-input";

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
  error?: FieldErrors<any>;
  hideIcon?: boolean;
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
  hideIcon = false,
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
            aria-placeholder={placeholder}
            required
            className={`form-input ${
              value != "" &&
              value.toLowerCase() != "property type" &&
              value.toLowerCase() != "number of rooms" &&
              "text-secondary-black"
            }`}
            {...register(name, fieldOptions)}
          >
            <option value={""} disabled>
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

      case "phone":
        return (
          <PhoneInput
            className="bg-transparent outline-none font-montserrat text-lg w-full font-semibold mix-blend-darken"
            defaultCountry="AE"
            placeholder="Enter Phone Number"
            value={value}
            onChange={(e) => setValue!(name, e, { shouldValidate: true })}
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
    <div className="w-full">
      <div className="rounded-[10px] py-3 px-[18px] bg-form-input flex-between gap-6 w-full h-full relative">
        {!hideIcon && (
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
        )}
        <div className="w-11/12">{handleInputType()}</div>
      </div>
      {error && error[name] && (
        <span className="text-red-500 text-sm w-full flex-start">
          {error[name].message?.toString()}
        </span>
      )}
    </div>
  );
};

export default FormInput;
