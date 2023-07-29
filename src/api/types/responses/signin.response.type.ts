import User from "./data.user.type";

type SignInResponse = {
    user: User;
    accessToken: string;
};
export default SignInResponse;