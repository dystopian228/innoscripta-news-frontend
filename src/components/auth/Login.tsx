import React, {useEffect} from "react";
import {Card} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {nullifyState, selectError, selectStatus, signInUser} from "../../redux/slices/auth.slice";
import axios from "axios";
import {FormikHelpers} from "formik";
import NewsyForm, {FieldGroup} from "../common/formik/Form";
import {signInInitialValues, signInValidationSchema} from "./auth.service";
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";

const Login: React.FC = () => {

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
            email: string;
            password: string;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _formikApi: FormikHelpers<{
            email: string;
            password: string;
        }>,
    ): void => {
        const {email, password} = values;
        // @ts-ignore
        dispatch(signInUser({
            loginRequest: {email: email, password},
            cancelToken: tokenSource
        }));
    };

    const fieldGroups: FieldGroup[] = [
        {
            title: 'Log in',
            className: '',
            fields: [
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
            ]
        }
    ];


    return <div className="w-full h-full relative flex items-center justify-center bg-cover"
                style={{backgroundImage: "url('/auth_background.jpg')"}}>
        <Card className="w-4/12">
            <NewsyForm className="flex flex-col gap-4" initialValues={signInInitialValues}
                       validationSchema={signInValidationSchema}
                       handleSubmit={handleSubmit} fieldGroups={fieldGroups} tokenSource={tokenSource} error={error} loading={status === ApiResponseEnum.LOADING}/>
        </Card>
    </div>;
}

export default Login;