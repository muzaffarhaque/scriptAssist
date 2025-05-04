import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RocketDetails ,Login} from './pages';
import "./style.scss";


const ProtectedRoute = ({ children }:any) => {
    const token = localStorage.getItem('token_script');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};
export const routes = [
	{
		path: '/',
		element: <App />,
		errorElement:<NotFound/>,
		children: [
			{
				path: '/',
				element: <ProtectedRoute children={<Landing/>}/>
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/rocket-detail/:id',
				element: <ProtectedRoute children={<RocketDetails/>}/>
			},
			// {
			// 	path: "/profile",
			// 	element: <ProtectedRoute children={<Profile/>}/>
			// },
			// {
			// 	path:'/*',
			// 	element:<ErrorPage/>
			// },
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer/>
		</QueryClientProvider>
	</StrictMode>
);
