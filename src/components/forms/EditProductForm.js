import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InlineError from '../messages/InlineError';

export default class EditProductForm extends Component {
	state = {
		data: {
			_id: this.props.product._id,
			name: this.props.product.name,
			quantity: this.props.product.quantity,
			price: this.props.product.price
		},
		loading: false,
		errors: {}
	};

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch((err) => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = (data) => {
		const errors = {};
		if (!data.name) errors.name = "Can't be blank";
		if (!data.quantity) errors.quantity = "Can't be blank";
		if (!data.price) errors.price = "Can't be blank";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<Form onSubmit={this.onSubmit} noValidate="novalidate" loading={loading}>
				{errors.global && (
					<Message negative>
						<Message.Header>Something went wrong!</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				<Form.Field error={!!errors.email}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						value={data.name}
						onChange={this.onChange}
					/>
					{errors.name && <InlineError text={errors.name} />}
				</Form.Field>
				<Form.Field error={!!errors.quantity}>
					<label htmlFor="quantity">Quantity</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						placeholder="Quantity"
						value={data.quantity}
						onChange={this.onChange}
					/>
					{errors.quantity && <InlineError text={errors.quantity} />}
				</Form.Field>
				<Form.Field error={!!errors.price}>
					<label htmlFor="price">Price</label>
					<input
						type="number"
						id="price"
						name="price"
						placeholder="Price"
						value={data.price}
						onChange={this.onChange}
					/>
					{errors.price && <InlineError text={errors.price} />}
				</Form.Field>
				<Button role="button" primary>
					Update
				</Button>
				<Button as={Link} to="/dashboard">Redirect to Dashboard</Button>
			</Form>
		);
	}
}
EditProductForm.propTypes = {
	submit: PropTypes.func,
	product: PropTypes.object.isRequired
};
