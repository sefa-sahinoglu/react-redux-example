import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import EditProductPage from './components/pages/EditProductPage';
import NewProductPage from './components/pages/NewProductPage';
const App = () => (
	<div className="ui container">
		<Route path="/" exact component={HomePage} />
		<Route path="/login" exact component={LoginPage} />
		<Route path="/register" exact component={RegisterPage} />
		<Route path="/dashboard" exact component={DashboardPage} />
		<Route path="/product/edit/:id" exact component={EditProductPage}></Route>
		<Route path="/product/new" exact component={NewProductPage}></Route>
	</div>
);

export default App;
