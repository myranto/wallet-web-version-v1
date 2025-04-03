import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from '../../security/PrivateRoute';
import { Backdrop, CircularProgress } from '@mui/material';

const Home = React.lazy(() => import('../../views/home/home'));
const Login = React.lazy(() => import('../../views/authentication/login'))
const Index = React.lazy(() => import('../../views/index'))
const Users = React.lazy(() => import('../../views/backoffice/users/Users'))
const AccountType = React.lazy(() => import('../../views/backoffice/account_type/AccountType'))
const Loading = () => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
const Roads = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/index" replace />} />
          <Route path={"/login"} element={<Login />} />
          <Route exact path="/home" name="Page home" element={<PrivateRoute role={1} Component={Home} componentName={"Home"} />} />
          <Route path={"/index"} element={<PrivateRoute role={1} Component={Index} componentName={"Index"} />} />
          <Route path={"/users"} element={<PrivateRoute role={1} Component={Users} componentName={"User"} />} />
          <Route path={"/home/acount_type"} element={<PrivateRoute role={1} Component={AccountType} componentName={"Account type"} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Roads