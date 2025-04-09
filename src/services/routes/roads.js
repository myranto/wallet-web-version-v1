import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from '../../security/PrivateRoute';
import { Backdrop, CircularProgress } from '@mui/material';

const Home = React.lazy(() => import('../../views/home/home'));
const Login = React.lazy(() => import('../../views/authentication/login'))
const Index = React.lazy(() => import('../../views/index'))
const Users = React.lazy(() => import('../../views/backoffice/users/Users'))
const AccountType = React.lazy(() => import('../../views/backoffice/account_type/AccountType'))
const Account = React.lazy(() => import('../../views/backoffice/account/Account'))
const TypeCharge = React.lazy(() => import('../../views/backoffice/charge_type/TypeCharge'))
const TypeOperation = React.lazy(() => import('../../views/backoffice/operation_type/TypeOperation'))
const Credit = React.lazy(() => import('../../views/backoffice/credit/Credit'))
const Charge = React.lazy(() => import('../../views/backoffice/charge/Charge'))
const Transfer = React.lazy(() => import('../../views/backoffice/transfer/Transfer'))
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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/index" replace />} />
          <Route path={"/login"} element={<Login />} />
          <Route exact path="/home" name="Page home" element={<PrivateRoute role={1} Component={Home} componentName={"Home"} />} />
          <Route path={"/index"} element={<PrivateRoute role={1} Component={Index} componentName={"Index"} />} />
          <Route path={"/users"} element={<PrivateRoute role={1} Component={Users} componentName={"User"} />} />
          <Route path={"/home/account_type"} element={<PrivateRoute role={1} Component={AccountType} componentName={"Account type"} />} />
          <Route path={"/home/account"} element={<PrivateRoute role={1} Component={Account} componentName={"Account"} />} />
          <Route path={"/home/charge_type"} element={<PrivateRoute role={1} Component={TypeCharge} componentName={"TypeCharge"} />} />
          <Route path={"/home/type_operation"} element={<PrivateRoute role={1} Component={TypeOperation} componentName={"TypeOperation"} />} />
          <Route path={"/home/credit"} element={<PrivateRoute role={1} Component={Credit} componentName={"Credit"} />} />
          <Route path={"/home/charge"} element={<PrivateRoute role={1} Component={Charge} componentName={"Charge"} />} />
          <Route path={"/home/transfer"} element={<PrivateRoute role={1} Component={Transfer} componentName={"Transfer"} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Roads