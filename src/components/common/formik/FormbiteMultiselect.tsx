import {Field} from "formik";
import React from "react";
import Select from "react-select";

export interface FormbiteMultiselectProps {
    name: string;
    label: string;
    optionList: { value: string, label: string }[];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => void;
    className: string | null;
}

const FormbiteMultiselect: React.FC<FormbiteMultiselectProps> = (props) => {

    return (
        <Field name={props.name}>
            {(fieldProps: any) => {
                return <div className={props.className ?? undefined}>
                    <div className="mb-2 block"><label className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                       htmlFor={props.name}>{props.label}</label>
                    </div>
                    <Select
                        name={props.name}
                        closeMenuOnSelect={false}
                        isMulti
                        // @ts-ignore
                        options={props.optionList}
                        // getOptionValue={(option) => option.value}
                        onChange={(option) => {
                            props.setFieldValue(fieldProps.field.name, option.map((item: any) => item.value));
                        }}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={{
                            valueContainer: base => ({
                                ...base,
                                overflowX: "hidden"
                            }),
                            input: base => ({
                                ...base,
                            })
                        }}

                    />
                </div>
            }}
        </Field>
    )
        ;

};

export default FormbiteMultiselect;