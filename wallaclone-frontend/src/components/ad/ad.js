import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const Ad = ({ ad }) => (
	<Card>
		<Image
			src={
				process.env.PUBLIC_URL + `http://localhost:4000/assets/img/${ad.image}`
			}
			as="a"
			href={`ad/${ad._id}`}
			target="_blank"
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
);

export default Ad;
