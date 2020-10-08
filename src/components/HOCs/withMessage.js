const { Component } = require("react")

const withMessage = (Component) => (props) => {
    return <Component {...props} message={`Test message`} ></Component>
};

export default withMessage;