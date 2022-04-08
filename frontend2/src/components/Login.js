import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h1>Hello World Login</h1>
      </div>
    );
  }
}
