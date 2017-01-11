import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { socialLogin } from '../../actions/index'

class AuthSocial extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.socialLogin();
    }

    render() {
        return (
            <div className="form-footer center-align">
                <hr/>
                <h4>Or Sign Up With</h4>
                <button onClick={this.handleClick()} className="btn btn-accent btn-auth auth-twitter">facebook</button>
            </div>
        );
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ socialLogin }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthSocial);
