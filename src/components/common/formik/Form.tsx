import FormbiteTextField from "./FormbiteTextField";
import {Alert, Button, Checkbox} from "flowbite-react";
import {Form, Formik} from "formik";
import React from "react";
import {CancelTokenSource} from "axios";
import {TextInputProps} from "flowbite-react/lib/esm/components/TextInput/TextInput";
import ChipCheckbox from "./ChipCheckbox";

interface FieldProps extends TextInputProps {
    id: string;
    label: string;
    name: string;
    componentType: 'checkbox' | 'textField';
}

export interface FieldGroup {
    title: string | null;
    fields: FieldProps[];
    className: string;
}

interface FormProps {
    initialValues: Record<string, any>;
    validationSchema: Record<string, any> | null;
    handleSubmit: Function;
    fieldGroups: FieldGroup[];
    tokenSource: CancelTokenSource;
    error: string | null;
    className: string;
    loading: boolean;
}

const NewsyForm: React.FC<FormProps> = (props) => {

    return <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={(values, formikApi) => {
            props.handleSubmit(values, formikApi, props.tokenSource);
        }}
    >
        {({
              errors,
              touched,
              handleSubmit,
              setFieldValue,
          }) => (
            <>
                <Form className={props.className}>
                    {props.fieldGroups.map((group) => (<div>
                        <h3 className="font-bold text-xl mb-6">{group.title}</h3>
                        <div className={group.className}>
                            {group.fields.map((field) => {
                                return <div>
                                    {field.componentType == 'textField' ?
                                        <FormbiteTextField
                                            key={field.name}
                                            label={field.label}
                                            name={field.name}
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            type={field.type}
                                            setFieldValue={setFieldValue}
                                            color={field.name && touched[field.name] && errors[field.name] ? 'failure' : ''}
                                            helperText={<>{field.name && touched[field.name] && errors[field.name] ? errors[field.name] : undefined}</>}
                                        /> : <ChipCheckbox name={field.name} label={field.label}
                                                           value={field.value as unknown as boolean}
                                                           setFieldValue={setFieldValue}/>}
                                </div>
                            })}
                        </div>
                        <hr className="font-bold my-6"/>
                    </div>))}
                    {props.error && <Alert
                        color="failure">
                            <span>
                                <p>
                                  {props.error}
                                </p>
                            </span></Alert>
                    }
                    <Button className="place-self-center from-primary via-purple-600 to-purple-700"
                            gradientDuoTone="purpleToBlue"
                            isProcessing={props.loading}
                            type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )}
    </Formik>

}

export default NewsyForm;