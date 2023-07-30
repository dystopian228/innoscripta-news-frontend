import {TextInputProps} from "flowbite-react/lib/esm/components/TextInput/TextInput";
import {Field} from "formik";
import {CustomFlowbiteTheme, Label, TextInput} from "flowbite-react";
import React from "react";

export interface FormBiteFieldProps extends TextInputProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => void;
    label: string;
}

const customTheme: CustomFlowbiteTheme['textInput'] = {
    "base": "flex",
    "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm focus:border-primary focus:ring-primary text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    "field": {
        "base": "relative w-full",
        "input": {
            "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary focus:ring-primary",
            "colors": {
                "gray": "bg-gray-50 border-gray-300 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary",
                "info": "border-primary bg-primary text-primary placeholder-primary focus:border-primary focus:ring-primary dark:border-primary dark:bg-primary dark:focus:border-primary dark:focus:ring-primary",
                "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
            },
        }
    }
};

const FormbiteTextField: React.FC<FormBiteFieldProps> = (props: FormBiteFieldProps) => {
    return (
        <Field name={props.name}>
            {(fieldProps: any) => (
                <div className={props.className}>
                    <div className="mb-2 block">
                        <Label
                            htmlFor={props.name}
                            value={props.label}
                        />
                    </div>
                    <TextInput
                        theme={customTheme}
                        onChange={(event: any) => {
                            props.setFieldValue(fieldProps.field.name, event.target.value);
                        }}
                        name={fieldProps.field.name}
                        value={fieldProps.field.value}
                        {...fieldProps}
                        {...props}
                    /></div>
            )
            }
        </Field>
    )
        ;
};

export default FormbiteTextField;