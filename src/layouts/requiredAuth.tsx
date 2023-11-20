// ProtectedRoute.js
import { useAppSelector } from '../hooks'
import { Outlet, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'

export const RequireAuth: React.FC = () => {

    
    // GET Dipatch
    const navigate = useNavigate();

    // Get User previous location history
    const location = useLocation();
    // console.log(location);
    

    // Check the store for any existing user? Return children routes : Direct them to login page
    const { email } = useAppSelector((state) => state.userAuth)

    const onIdle = () => {
        navigate("/login");
    }

    // Enable timer
    useIdleTimer({ disabled: !email, crossTab: true, timeout: (60000 * 5), onIdle })

    if (email == null ||email == undefined||email == "") {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    else {
        return (
            // Render the protected routes
                <Outlet />
        )
    }
}
