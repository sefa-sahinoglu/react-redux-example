import React, { Component } from 'react';
import EditProductForm from '../forms/EditProductForm';
import { connect } from 'react-redux';
import { updateProduct } from '../../actions/product';

class EditProductPage extends Component {
	submit = (data) => this.props.updateProduct(data).then(() => this.props.history.push('/dashboard'));
	render() {
		return (
			<div>
				<h1>Edit Product</h1>
				<EditProductForm product={this.props.location.state.product} submit={this.submit} />
			</div>
		);
	}
}

export default connect(null, { updateProduct })(EditProductPage);
