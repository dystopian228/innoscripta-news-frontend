import React, {useEffect} from "react";
import {Card} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {nullifyState, selectError, signInUser} from "../../redux/slices/auth.slice";
import axios from "axios";
import {FormikHelpers} from "formik";
import NewsyForm, {FieldProps} from "../../components/common/formik/Form";
import {signInInitialValues, signInValidationSchema} from "./auth.service";

const Login: React.FC = () => {

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

    const formFields: FieldProps[] = [
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
    ]


    return <div className="w-full h-full relative flex items-center justify-center bg-cover"
                style={{backgroundImage: "url('/auth_background.jpg')"}}>
        <Card className="w-4/12">
            <NewsyForm initialValues={signInInitialValues} validationSchema={signInValidationSchema}
                       handleSubmit={handleSubmit} fields={formFields} tokenSource={tokenSource} error={error}/>
        </Card>
    </div>;
}

export default Login;