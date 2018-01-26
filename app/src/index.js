const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app/App.react').default;

ReactDOM.render(
    <App />,
    document.getElementById('react-app')
);