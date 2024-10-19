import { Navigate, Outlet } from 'react-router'
import { RouteHeader } from '../constant/routeAndHeader';
import FullLayout from '../layouts/full/FullLayout';
import Label from '../components/xaoasoft/label';
import Customizemenu from '../layouts/full/customizemenu/customizemenu';

const authData = RouteHeader().router.auth;
const SinglePage = RouteHeader().router.SinglePage;
const PrivateRoute = RouteHeader().router.Menu;

export const Router = [
    {
        path:'/',
        elemenet: <><Outlet /><Label /></>,
        children:[
            ...SinglePage
            // ,
            // {}
        ]
    },
    {
        path: '/auth/',
        element: <><Outlet /><Label /></>,
        children:[
            ...authData
        ]
    },
    {
        path: '/Private/',
        element: <div id='fullLayout'><FullLayout /><Customizemenu /></div>,
        children:[
            ...PrivateRoute
        ]
    }
];