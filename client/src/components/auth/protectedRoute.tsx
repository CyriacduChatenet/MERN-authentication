import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../contexts/user';
interface IProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProps> = ({children}) => {
    const { token } = useUser();

    if(token === '') {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            {children}
        </>
    )
};

export default ProtectedRoute;