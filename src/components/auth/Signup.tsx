import React, {useEffect} from "react";
import {Card} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {FormikHelpers} from "formik";
import {nullifyState, selectError, signUpUser, selectStatus} from "../../redux/slices/auth.slice";
import {signUpInitialValues, signUpValidationSchema} from "./auth.service";
import NewsyForm, {FieldGroup} from "../common/formik/Form";
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";

const Signup: React.FC = () => {

    const dispatch = useDispatch();
    const error: string | null = useSelector(selectError);
    const status = useSelector(selectStatus);
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

    const fieldGroups: FieldGroup[] = [
        {
            title: 'Sign up',
            className: '',
            fields: [
                {
                    id: 'name',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'John Doe',
                    required: true,
                    type: 'text',
                    componentType: 'textField'
                },
                {
                    id: 'email',
                    name: 'email',
                    label: 'Email',
                    placeholder: 'johndoe@example.com',
                    required: true,
                    type: 'email',
                    componentType: 'textField'
                },
                {
                    id: 'password',
                    name: 'password',
                    label: 'Password',
                    placeholder: '',
                    required: true,
                    type: 'password',
                    componentType: 'textField'
                },
                {
                    id: 'passwordConfirm',
                    name: 'passwordConfirm',
                    label: 'Confirm Password',
                    placeholder: '',
                    required: true,
                    type: 'password',
                    componentType: 'textField'
                }
            ]
        }
    ];


    return <div className="w-full h-full relative flex items-center justify-center bg-cover"
                style={{backgroundImage: "url('/auth_background.jpg')"}}>
        <Card className="w-4/12">
            <NewsyForm className="flex flex-col gap-4" initialValues={signUpInitialValues}
                       validationSchema={signUpValidationSchema} handleSubmit={handleSubmit} fieldGroups={fieldGroups}
                       tokenSource={tokenSource} error={error} loading={status === ApiResponseEnum.LOADING}/>
        </Card>
    </div>;
}

export default Signup;