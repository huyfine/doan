import { LoginLayout } from '../components/Layout';
import { SignupLayout } from '../components/Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Menu from '../pages/Menu';
import Payment from '../pages/Payment';
import QRPayment from '../pages/Payment/QRPayment';
import Dashboard from '../pages/Admin/Dashboard';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/payment', component: Payment },
    { path: '/payment/qr', component: QRPayment },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/signup', component: Signup, layout: SignupLayout },
    { path: '/admin/*', component: Dashboard },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes }; 