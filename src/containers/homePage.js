var React = require('react');
var connect = require("react-redux").connect;

var homePage = function() {
	return (
		<div>
			<h1>Home Page</h1>
		</div>
	);
}

var mapStateToProps = function(state) {
	return {

	};
}

var mapDispatchToProps = function(dispatch) {
	return {

	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(homePage);