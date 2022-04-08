import React from 'react';

export default class Signup extends React.Component {
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
        <h1>Hello World Signup</h1>
      </div>
    );
  }
}
