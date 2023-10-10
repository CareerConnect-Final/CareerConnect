import './AuthComponent.scss'
import React from 'react';

const AuthComponent = () => {

  return (
    <div className="wrapper fadeInDown" style={style}>
      <div id="formContent" style={style}>
        {/* Tabs Titles */}
        <h2 className="active"> Sign In </h2>
        <h2 className="inactive underlineHover">Sign Up </h2>

        {/* Icon */}
        <div className="fadeIn first"></div>

        {/* Login Form */}
        <form>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        {/* Remind Passowrd */}
        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
