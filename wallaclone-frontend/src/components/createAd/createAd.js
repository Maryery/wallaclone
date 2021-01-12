import React from 'react';
import { Button, Form, Container, Grid, Segment } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';

const ENDPOINT = 'http://localhost:4000/apiv1/ads';

class CreateAd extends React.Component {
	state = {
		name: '',
		type: '',
		price: '',
		description: '',
		tag: '',
		image: '',
		id: '',
	};

	handleName = (e) => {
		this.setState({
			name: e.target.value,
		});
	};

	handleType = (e) => {
		this.setState({
			type: e.target.value,
		});
	};

	handlePrice = (e) => {
		this.setState({
			price: e.target.value,
		});
	};

	handleDescription = (e) => {
		this.setState({
			description: e.target.value,
		});
	};

	handleTag = (e) => {
		this.setState({
			tag: e.target.value,
		});
	};

	handleImage = (e) => {
		console.log(e.target.files[0]);
		this.setState({
			image: e.target.files[0],
		});
	};

	submitForm = async (e) => {
		e.preventDefault();
		const { name, type, price, description, tag, image } = this.state;
		const data = new FormData();
		data.append('name', name);
		data.append('type', type);
		data.append('price', price);
		data.append('description', description);
		data.append('tags', [tag]);
		data.append('image', image);

		const requestOptions = {
			method: 'POST',
			body: data,
		};
		fetch(ENDPOINT, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					const id = data.result._id;
					this.setState({
						id: id,
					});
				} else {
					alert(data.error);
				}
			})
			.catch((error) => console.log('error', error));
	};

	render = () => {
		if (this.state.id !== '') {
			return (
				<Route render={(props) => <Redirect to={`/ad/${this.state.id}`} />} />
			);
		}
		const { name, type, price, description, tag } = this.state;
		return (
			<div>
				<Grid columns={1} divided>
					<Grid.Row stretched>
						<Grid.Column>
							<Segment>
								<Container textAlign="center">
									<h2>AÑADIR ANUNCIO</h2>
								</Container>
								<Form onSubmit={this.submitForm}>
									<label>Nombre del producto</label>
									<input
										type="text"
										value={name}
										placeholder="Nombre del articulo"
										onChange={this.handleName}
									/>
									<label>¿Compras o vendes?</label>
									<input
										value={type}
										list="types"
										placeholder="Choose type"
										onChange={this.handleType}
									/>
									<datalist id="types">
										<option value="buy" />
										<option value="sell" />
									</datalist>
									<label>Precio</label>
									<input
										value={price}
										type="number"
										min="0"
										label={{ basic: true, content: '€' }}
										labelPosition="right"
										placeholder="Introduce el precio del producto"
										onChange={this.handlePrice}
									/>
									<label>Descripción</label>
									<textarea
										value={description}
										id="w3review"
										name="w3review"
										rows="4"
										cols="50"
										onChange={this.handleDescription}
									></textarea>
									<label>Tag</label>
									<input
										value={tag}
										list="tag"
										placeholder="Tag"
										onChange={this.handleTag}
									/>
									<datalist id="tag">
										<option value="Bikes" />
										<option value="Books" />
										<option value="Electronics" />
										<option value="Fashion" />
										<option value="Home" />
										<option value="Jobs" />
										<option value="Mobile" />
										<option value="Motors" />
										<option value="RealEstate" />
										<option value="Services" />
										<option value="Others" />
									</datalist>
									<label>Imagen</label>
									<input
										type="file"
										id="img"
										name="img"
										accept="image/*"
										onChange={this.handleImage}
									></input>
									<br></br>
									<br></br>
									<Button type="submit" positive>
										Subir Producto
									</Button>
								</Form>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	};
}

export default CreateAd;
