import React from 'react';
import { Grid, Input, Select } from 'semantic-ui-react';

const mockedOptionsPrice = [
	{ key: 'as', value: 1, text: 'Ascendente' },
	{ key: 'des', value: -1, text: 'Descendente' },
	{ key: 'ninguno', value: 0, text: 'ninguno' },
];

const optionsTag = [
	{ key: 'Todos', value: '', text: 'Todos' },
	{ key: 'Bikes', value: 'Bikes', text: 'Bikes' },
	{ key: 'Books', value: 'Books', text: 'Books' },
	{ key: 'Electronics', value: 'Electronics', text: 'Electronics' },
	{ key: 'Fashion', value: 'Fashion', text: 'Fashion' },
	{ key: 'Home', value: 'Home', text: 'Home' },
	{ key: 'Jobs', value: 'Jobs', text: 'Jobs' },
	{ key: 'Mobile', value: 'Mobile', text: 'Mobile' },
	{ key: 'Motors', value: 'Motors', text: 'Motors' },
	{ key: 'RealEstate', value: 'RealEstate', text: 'RealEstate' },
	{ key: 'Services', value: 'Services', text: 'Services' },
	{ key: 'Others', value: 'Others', text: 'Others' },
];

const Filters = ({ onTagsChange, onSortChange, onNameChange }) => (
	<Grid columns={3} divided>
		<Grid.Row>
			<Grid.Column>
				<Input
					icon="search"
					type="text"
					onChange={onNameChange}
					placeholder="buscar por nombre"
				/>
			</Grid.Column>
			<Grid.Column>
				<Select
					placeholder="ordenar por precio"
					onChange={onSortChange}
					options={mockedOptionsPrice}
				/>
			</Grid.Column>
			<Grid.Column>
				<Select
					placeholder="Filtrar por tag"
					onChange={onTagsChange}
					options={optionsTag}
				/>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Filters;
