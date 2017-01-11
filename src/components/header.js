import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import {Link} from 'react-router';
class Header extends Component {

    userInfo(){
        if(this.props.userinfo){
            return (
                <li className="nav-item pull-xs-right" key={1}>
                    <Link className="nav-item nav-link" to="#">{this.props.userinfo.name}</Link>
                </li>
            );
        }
    }

    renderLinks(){
        if(this.props.authenticated){
            return[
                <li className="nav-item pull-xs-left" key={2}>
                    <Link className="nav-item nav-link" to="/post/add">Add New Pin</Link>
                </li>,
                <li className="nav-item pull-xs-right" key={3}>
                    <Link className="nav-item nav-link" to="/logout">Logout</Link>
                </li>,

            ];
        }else{
            return [
                <li className="nav-item pull-md-right" key={2}>
                    <Link className="nav-link" to="/register">&nbsp;Register</Link>
                </li>,
                <li className="nav-item pull-md-right" key={1}>
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            ];
        }
    }

    render (){
        console.log(this.props.userinfo);
        return (
            <div>
                <Navbar color="faded" light>
                <Link to="/" className="navbar-brand">Pin-It</Link>
                    <Nav className="float-right" navbar>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                    {this.userInfo()}

                </ul>
                        </Nav>
                </Navbar>
            </div>
        )

    }


}
function mapStateToProps(state){
    return {
        authenticated:state.auth.authenticated,
        userinfo:state.auth.userinfo
    };
}

export default connect(mapStateToProps)(Header)