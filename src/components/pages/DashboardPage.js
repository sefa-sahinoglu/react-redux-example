import React, { Component } from 'react';
import { Table, Button, Icon, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { allProductsSelector } from '../../reducers/products';
import { fetchProducts, deleteProduct } from '../../actions/product';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class DashboardPage extends Component {
	state = {
		deleteDialogOpen: false,
		selectedProduct: {},
		redirect: false
	};
	componentDidMount() {
		this.props.fetchProducts();
	}
	showDeletePrompt(value) {
		this.setState({
			deleteDialogOpen: !this.state.deleteDialogOpen,
			selectedProduct: value
		});
	}
	onDeleteClick() {
		this.props.deleteProduct(this.state.selectedProduct);
		this.setState({
			deleteDialogOpen: !this.state.deleteDialogOpen
		});
		let index = this.props.products.indexOf(this.state.selectedProduct);
		this.props.products.splice(index, 1);
	}
	onEditClick(value) {
		this.setState({ selectedProduct: value });
		this.setState({ redirect: true });
	}
	render() {
		const { redirect, selectedProduct } = this.state;
		if (redirect === true) {
			return (
				<Redirect
					to={{
						pathname: '/product/edit/' + this.state.selectedProduct._id,
						state: { product: selectedProduct }
					}}
				/>
			);
		}
		const { products } = this.props;
		let productList;
		if (products && products.length > 0) {
			productList = products.map((value, i) => (
				<Table.Row key={value._id}>
					<Table.Cell>{i + 1}</Table.Cell>
					<Table.Cell>{value.name}</Table.Cell>
					<Table.Cell>{value.quantity.toLocaleString('tr-TR')}</Table.Cell>
					<Table.Cell>{value.price.toLocaleString('tr-TR')}</Table.Cell>
					<Table.Cell>
						<Button onClick={() => this.showDeletePrompt(value)}>
							<Icon name="close" />Delete
						</Button>
						<Button onClick={() => this.onEditClick(value)}>
							<Icon name="edit" />Edit
						</Button>
					</Table.Cell>
				</Table.Row>
			));
		}
		return (
			<div>
				<div>
					<h1 style={{ float: 'left' }}>Dashboard Page</h1>
					<Button color="teal" as={Link} to="/product/new"  style={{ float:'right',marginTop:'5px' }}>
						Add New Product
					</Button>
					<Button color="grey" as={Link} to="/"  style={{ float:'right',marginTop:'5px' }}>
						Home
					</Button>
				</div>
				<Table columns={5} striped>
					<Confirm
						open={this.state.deleteDialogOpen}
						onCancel={() => {
							this.setState({ deleteDialogOpen: false });
						}}
						onConfirm={() => this.onDeleteClick()}
						confirmButton={'Yes, delete'}
					/>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>#</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Quantity</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Manage</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{productList}</Table.Body>
				</Table>
			</div>
		);
	}
}

DashboardPage.propTypes = {
	fetchProducts: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
	deleteProduct: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		products: allProductsSelector(state)
	};
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(DashboardPage);
