import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/user';

class RegisterPage extends React.Component {
	submit = (data) => this.props.register(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<div>
				<h1>Register</h1>
				<RegisterForm submit={this.submit} />
			</div>
		);
	}
}

RegisterPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default connect(null, { register })(RegisterPage);
