import React, { Component } from 'react';
import { Button, Form, Card } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			islogged: false,
		};
		this.submitForm = this.submitForm.bind(this);
	}

	handleEmail = (e) => {
		this.setState({
			email: e.target.value,
		});
	};

	handlePassword = (e) => {
		this.setState({
			password: e.target.value,
		});
	};

	submitForm = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		await this.props.handleLogin(email, password);
		this.setState({
			islogged: true,
		});
	};

	render = () => {
		if (this.state.islogged || this.props.user !== null) {
			return <Route render={(props) => <Redirect to="/profile" />} />;
		}

		const { email, password } = this.state;
		return (
			<div>
				<Card>
					<Card.Content header="Login" />
					<Card.Content>
						<Form onSubmit={this.submitForm}>
							<Form.Field>
								<label>Email</label>
								<input
									type="text"
									value={email}
									placeholder="Introduce email"
									onChange={this.handleEmail}
								/>
							</Form.Field>
							<Form.Field>
								<label>Password</label>
								<input
									type="password"
									value={password}
									placeholder="Introduce tu contraseña"
									onChange={this.handlePassword}
								/>
							</Form.Field>
							<Button type="submit" value="Login">
								Submit
							</Button>
						</Form>
					</Card.Content>
				</Card>
			</div>
		);
	};
}

export default Login;
