const { Component } = require("react");

const withRequest = () => (Component) => (props) => {
  return <Component {...props}></Component>;
};

export default withRequest;
