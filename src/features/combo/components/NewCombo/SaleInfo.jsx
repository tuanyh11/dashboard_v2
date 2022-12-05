import React from "react";
import { useFormContext } from "react-hook-form";
import { DropdownCheckBox, Input } from "../../../../components";

const SaleInfo = () => {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  console.log(watch("products"));

  const onSale = [
    { value: true, display: "True" },
    { value: false, display: "False" },
  ];

  const isSale = JSON.parse(watch("saleInfo.isSale"));

  return (
    <div>
      <Input
        label={"Price"}
        error={errors?.price?.message}
        register={{
          ...register("price", {
            required: {
              value: true,
              message: "This field is required",
            },
            valueAsNumber: {
              value: true,
              message: "This field should be number",
            },
            min: {
              value: 1000,
              message: "This field should be at least 1000",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "This field should be a valid Numeric",
            },
          }),
        }}
      />

      <div className="my-10">
        <DropdownCheckBox
          label={"On sale"}
          data={onSale}
          register={{ ...register("saleInfo.isSale") }}
          disPlayItem={(item) => item.display.toString()}
          displayValue={(item) => item.value}
          type="radio"
        />
      </div>

      {isSale && (
        <Input
          label={"Sale Percent (%)"}
          error={errors?.saleInfo?.salePercent?.message}
          register={{
            ...register("saleInfo.salePercent", {
              onChange: (e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  const saleAmount =
                    (Number(e.target.value) / 100) * Number(getValues("price"));
                  setValue(
                    "saleAmount",
                    Math.round(Number(getValues("price")) - saleAmount)
                  );
                }
              },
              min: {
                value: 0,
                message: "this cannot be negative",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "This field should be a valid Numeric",
              },
            }),
          }}
        />
      )}
    </div>
  );
};

export default SaleInfo;
