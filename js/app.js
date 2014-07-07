/**
 * @jsx React.DOM
 */

var React = require('react');

var App = require('./components/App.react');

React.renderComponent(
  <App />,
  document.getElementById('should')
);
