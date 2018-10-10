import React, { Component } from 'react';
import NewProductForm from '../forms/NewProductForm';
import { connect } from 'react-redux';
import { createProduct } from '../../actions/product';

class NewProductPage extends Component {
	submit = (data) => this.props.createProduct(data).then(() => this.props.history.push('/dashboard'));
	render() {
		return (
			<div>
				<h1>New Product</h1>
				<NewProductForm submit={this.submit} />
			</div>
		);
	}
}

export default connect(null, { createProduct })(NewProductPage);
