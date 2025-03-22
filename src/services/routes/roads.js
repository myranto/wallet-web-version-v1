import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

const Home = React.lazy(()=> import('../../views/home/home'));
const Login = React.lazy(()=> import('../../views/authentication/login'))
const Index = React.lazy(()=> import('../../views/index'))
const Roads = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route exact path="/home" name="Page home" element={<Home />} />
                <Route path={"/index"} element={<Index/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default Roads