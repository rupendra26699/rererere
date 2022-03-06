import { Navigate } from "react-router-dom";
import useAuthenticationStatus from "../../../Hooks/useAuthenticationStatus";

function AuthenitcatedRoute(props) {

    const isAuthenticated = useAuthenticationStatus();

    if (!isAuthenticated) {
        return <Navigate to="/" replace={true} />
    } else {
        return props.children;
    }


}

export default AuthenitcatedRoute;