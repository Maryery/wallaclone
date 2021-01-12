import React from 'react';
import AdList from '../adList/adList';
import Filters from '../filters/filters';
import Paginator from '../paginator/paginator';

const ENDPOINT = 'http://localhost:4000/apiv1/ads';

class Home extends React.Component {
	state = {
		ads: [],
		tagFilter: '',
		sortPrice: 0,
		nameFilter: '',
	};

	handleTagsChange = (e, data) => {
		this.setState({
			tagFilter: data.value,
		});
		this.callApi(data.value, this.state.sortPrice, this.state.nameFilter);
	};

	handleSortChange = (e, data) => {
		this.setState({
			sortPrice: data.value,
		});
		this.callApi(this.state.tagFilter, data.value, this.state.nameFilter);
	};

	handleNameChange = (e, data) => {
		console.log(data.value);
		this.setState({
			nameFilter: data.value,
		});
		this.callApi(this.state.tagFilter, this.state.sortPrice, data.value);
	};

	componentDidMount() {
		this.callApi();
	}

	callApi(tagFilter = '', sort = 0, nameFilter = '') {
		fetch(`${ENDPOINT}?tags=${tagFilter}&sort=${sort}&name=${nameFilter}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					ads: data,
				});
			});
	}

	render() {
		return (
			<div>
				<Filters
					onTagsChange={this.handleTagsChange}
					onSortChange={this.handleSortChange}
					onNameChange={this.handleNameChange}
				></Filters>
				<AdList ads={this.state.ads}></AdList>
				<Paginator></Paginator>
			</div>
		);
	}
}

export default Home;
