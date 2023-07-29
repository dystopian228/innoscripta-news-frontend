import React, {useEffect} from "react";
import { Card} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {FormikHelpers} from "formik";
import {nullifyState, selectError, signUpUser} from "../../redux/slices/auth.slice";
import {signUpInitialValues, signUpValidationSchema} from "./auth.service";
import NewsyForm, {FieldProps} from "../../components/common/formik/Form";

const Signup: React.FC = () => {

    const dispatch = useDispatch();
    const error: string | null = useSelector(selectError);

    const cancelToken = axios.CancelToken;
    const tokenSource = cancelToken.source();

    useEffect(() => {
        dispatch(nullifyState());
        return () => {
            tokenSource.cancel();
        };
    }, []);


    const handleSubmit = (
        values: {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _formikApi: FormikHelpers<{
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        }>,
    ): void => {
        const {name, email, password, passwordConfirm} = values;
        // @ts-ignore
        dispatch(signUpUser({
            signUpRequest: {name: name, email: email, password, passwordConfirmation: passwordConfirm},
            cancelToken: tokenSource
        }));
    };

    const formFields: FieldProps[] = [
        {
            id: 'name',
            name: 'name',
            label: 'Name',
            placeholder: 'John Doe',
            required: true,
            type: 'text',
        },
        {
            id: 'email',
            name: 'email',
            label: 'Email',
            placeholder: 'johndoe@example.com',
            required: true,
            type: 'email',
        },
        {
            id: 'password',
            name: 'password',
            label: 'Password',
            placeholder: '',
            required: true,
            type: 'password',
        },
        {
            id: 'passwordConfirm',
            name: 'passwordConfirm',
            label: 'Confirm Password',
            placeholder: '',
            required: true,
            type: 'password',
        }
    ]


    return <div className="w-full h-full relative flex items-center justify-center bg-cover"
                style={{backgroundImage: "url('/auth_background.jpg')"}}>
        <Card className="w-4/12">
            <NewsyForm initialValues={signUpInitialValues} validationSchema={signUpValidationSchema} handleSubmit={handleSubmit} fields={formFields} tokenSource={tokenSource} error={error}/>
        </Card>
    </div>;
}

export default Signup;