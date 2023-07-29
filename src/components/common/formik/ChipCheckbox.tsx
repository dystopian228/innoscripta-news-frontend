import React, {useState} from 'react';
import {Field} from "formik";

interface ChipCheckboxProps {
    name: string;
    value: boolean
    label: string;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => void;
}

const ChipCheckbox: React.FC<ChipCheckboxProps> = (props) => {

    return (
        <Field name={props.name}>
            {(fieldProps: any) => {
                return (<div
                    className={`flex items-center justify-center h-8 rounded px-3 font-medium text-sm cursor-pointer ease-in-out duration-300
                  ${fieldProps.field.value ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={(event: any) => {
                        props.setFieldValue(fieldProps.field.name, !fieldProps.field.value);
                    }}
                >
                    <span className={`whitespace-nowrap ${props.value ? 'line-through' : ''}`}>
                    {props.label}
                  </span>
                    <input
                        name={fieldProps.field.name}
                        type="checkbox"
                        checked={fieldProps.field.value}
                        onChange={(event: any) => {
                            props.setFieldValue(fieldProps.field.name, event.target.value);
                        }}
                        className="hidden"
                    />
                </div>);
            }}
        </Field>
    );
}

export default ChipCheckbox;