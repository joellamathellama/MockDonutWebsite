import * as React from 'react';
import {connect} from 'react-redux';
import {RoadWork} from '../alerts/roadWork.jsx';

const homePage = () => (
	<div id="homeContainer">
	</div>
);

const mapStateToProps = (state) => {
	return {

	};
}

const mapDispatchToProps = (dispatch) => {
	return {

	};
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(homePage);