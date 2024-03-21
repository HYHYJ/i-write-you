import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const Main = lazy(() => import('pages/Main'));
const RootLayout = lazy(() => import('layout/RootLayout'));
const Login = lazy(() => import('pages/Login'));
const Join = lazy(() => import('pages/Join'));
const Hotel = lazy(() => import('pages/Hotel'));
const NonMember = lazy(() => import('pages/NonMember'));
const NotFound = lazy(() => import('pages/NotFound'));

const openRouter = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="Join" element={<Join />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="nonMember/:id" element={<NonMember />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);

export default openRouter;
