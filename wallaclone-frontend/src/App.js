import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import CreateAd from './components/createAd/createAd';
import DetailAd from './components/detailAd/detailAd';
import Header from './components/header/header';
import Profile from './components/profile/profile';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		this.apiLogin = this.apiLogin.bind(this);
		this.apiRegister = this.apiRegister.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {}

	apiLogin = async (email, password) => {
		const requestOptions = {
			method: 'POST',
			credential: 'include',
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await fetch('http://localhost:4000/login', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					user: data.result,
				});
				localStorage.setItem('user', JSON.stringify(data.result));
			})

			.catch((error) => alert(`error: ${error}`));
	};

	apiRegister = async (name, email, password) => {
		const requestOptions = {
			method: 'POST',
			credential: 'include',
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await fetch('http://localhost:4000/register', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					user: data.result,
				});
				localStorage.setItem('user', JSON.stringify(data.result));
			})

			.catch((error) => alert(`error: ${error}`));
	};

	logout = async () => {
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	};

	render() {
		let { user } = this.state;
		if (user === null) {
			user = localStorage.getItem('user');
			if (user !== null) {
				user = JSON.parse(localStorage.getItem('user'));
			}
		}

		return (
			<Router>
				<Header user={user} handleLogout={this.logout}></Header>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route
						path="/login"
						component={() => <Login user={user} handleLogin={this.apiLogin} />}
					/>
					<Route
						path="/register"
						component={() => (
							<Register user={user} handleRegister={this.apiRegister} />
						)}
					/>
					<Route path="/profile" component={() => <Profile user={user} />} />
					<Route path="/createAd" component={CreateAd} />
					<Route path="/ad/:_id" component={DetailAd} />
				</Switch>
			</Router>
		);
	}
}

export default App;
