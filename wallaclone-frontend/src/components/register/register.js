import React, { Component } from 'react';
import { Button, Form, Card } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			isregistered: false,
		};
	}

	handleName = (e) => {
		this.setState({
			name: e.target.value,
		});
	};

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
		const { name, email, password } = this.state;
		await this.props.handleRegister(name, email, password);
		this.setState({
			isregistered: true,
		});
	};

	render = () => {
		if (this.state.isregistered || this.props.user !== null) {
			return <Route render={(props) => <Redirect to="/profile" />} />;
		}

		const { name, email, password } = this.state;
		return (
			<div>
				<Card>
					<Card.Content header="Register" />
					<Card.Content>
						<Form onSubmit={this.submitForm}>
							<Form.Field>
								<label>Name</label>
								<input
									type="text"
									value={name}
									placeholder="Introduce tu nombre de usuario"
									onChange={this.handleName}
								/>
							</Form.Field>
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

export default Register;
