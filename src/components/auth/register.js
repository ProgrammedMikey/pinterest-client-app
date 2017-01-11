  import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {browserHistory} from 'react-router';
class Register extends Component{

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Ooops !</strong>
            {this.props.errorMessage}
        </div>
      )
    }
  }

  componentWillMount(){
    if(this.props.authenticated === true){
      browserHistory.push("/");
    }
  }

  handleFormSubmit(formProps){
    this.props.registerUser(formProps);
  }


      render(){
        const {handleSubmit,fields:{name, email,password,passwordConfirmation}} = this.props;
          return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Username:</label>
                    <input className="form-control" {...name} />
                    {name.touched && name.error && <div className="text-danger">{name.error}</div>}
                </fieldset>
              <fieldset className="form-group">
              <label>Email:</label>
              <input type="email" className="form-control" {...email} />
              {email.touched && email.error && <div className="text-danger">{email.error}</div>}
              </fieldset>
              <fieldset className="form-group">
              <label>Password:</label>
               <input type="password" className="form-control" {...password}/>
               {password.touched && password.error && <div className="text-danger">{password.error}</div> }
              </fieldset>

              <fieldset className="form-group">
              <label>Password Confirmation:</label>
                <input  type="password" className="form-control" {...passwordConfirmation} />
                {passwordConfirmation.touched && email.error && <div className="text-danger">{passwordConfirmation.error}</div>}
              </fieldset>
              <button action="submit" className="btn btn-primary">Register</button>
              {this.renderAlert()}
            </form>

          );

      }

}

function validate(formProps){
const errors = {};

    if(! formProps.name){
        errors.name = "Please enter a username!";
    }

if(! formProps.email){
  errors.email = "Please enter an email!";
}

if(formProps.password !== formProps.passwordConfirmation){
  errors.password = "Password must match";
}

if(! formProps.passwordConfirmation){
  errors.passwordConfirmation = "Please Enter  a password confirmation";
}

return errors;

}

function mapStateToProps(state){
  return {
    errorMessage:state.auth.error,
    authenticated:state.auth.authenticated
  };
}

export default reduxForm({
  form :'register',
  fields:['name','email','password','passwordConfirmation'],
  validate:validate

},mapStateToProps,actions)(Register);
