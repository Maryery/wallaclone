import React, { Component } from 'react';
import { Image, Modal, Grid, Segment } from 'semantic-ui-react';

class Profile extends Component {
	render = () => {
		const { user } = this.props;
		return (
			<div>
				<Grid columns={1} divided>
					<Grid.Row stretched>
						<Grid.Column>
							<Segment>
								<Modal.Header>
									<h2>Mi Perfil</h2>
								</Modal.Header>
								<h4>Hola {`${user.name}`}</h4>
								<br></br>
								<Modal.Content image>
									<Image
										wrapped
										size="medium"
										src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
									/>
								</Modal.Content>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	};
}

export default Profile;
