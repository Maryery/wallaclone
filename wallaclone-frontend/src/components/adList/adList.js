import React from 'react';
import { Grid } from 'semantic-ui-react';
import Ad from '../ad/ad';

const AdList = ({ ads }) => (
	<Grid columns={3} divided>
		<Grid.Row>
			{ads.map((ad, index) => (
				<Grid.Column key={index}>
					<Ad ad={ad} />
				</Grid.Column>
			))}
		</Grid.Row>
	</Grid>
);

export default AdList;
