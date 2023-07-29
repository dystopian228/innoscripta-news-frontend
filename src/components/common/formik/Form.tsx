import FormbiteTextField from "./FormbiteTextField";
import {Alert, Button} from "flowbite-react";
import {Form, Formik} from "formik";
import React from "react";
import {CancelTokenSource} from "axios";
import {TextInputProps} from "flowbite-react/lib/esm/components/TextInput/TextInput";

export interface FieldProps extends TextInputProps {
    id: string;
    label: string;
    name: string;
}

interface FormProps {
    initialValues: Record<string, any>;
    validationSchema: Record<string, any>;
    handleSubmit: Function;
    fields: FieldProps[];
    tokenSource: CancelTokenSource;
    error: string | null;
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
              setFieldValue,
          }) => (
            <>
                <Form className="flex flex-col gap-4">
                    {props.fields.map((field) => {
                        return <div>
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
                            />
                        </div>
                    })}
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
                            isProcessing={false}
                            type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )}
    </Formik>

}

export default NewsyForm;