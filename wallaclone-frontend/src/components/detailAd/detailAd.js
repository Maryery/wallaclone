import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

class DetailAD extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ad: '',
		};
	}

	componentDidMount = async (event) => {
		console.log(this.props);
		const id = this.props.match.params._id;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(`http://localhost:4000/apiv1/ads/${id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					this.setState({
						ad: data.result,
					});
				} else {
					alert(data.error);
				}
			})
			.catch((error) => console.log('error', error));
	};
	render = () => {
		const { ad } = this.state;
		return (
			<div>
				<Card>
					<Image
						src={
							process.env.PUBLIC_URL +
							`http://localhost:4000/assets/img/${ad.image}`
						}
						wrapped
						ui={false}
					/>
					<Card.Content>
						<Card.Header> {ad.price}€</Card.Header>
						<Card.Meta> {ad.name}</Card.Meta>
						<Card.Description>{ad.description}</Card.Description>
					</Card.Content>
					<div class="extra content">
						<span class="right floated">{ad.tags}</span>
						<span>
							<i class="shopping cart icon"></i>
							{ad.type}
						</span>
					</div>
				</Card>
			</div>
		);
	};
}

export default DetailAD;
