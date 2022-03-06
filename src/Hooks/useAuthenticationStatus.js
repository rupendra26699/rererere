
import { useSelector } from "react-redux";


function useAuthenticationStatus() {
    //return Boolean(useSelector((state) => state.userState.isLoggedIn))
    const isUserLoggedin = useSelector((state) => state.userState.isLoggedIn);
    return Boolean(isUserLoggedin);
}

export default useAuthenticationStatus;