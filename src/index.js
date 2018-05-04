import React from 'react';
import ReactDOM from 'react-dom';
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './App';
import DetailPage from './DetailPage';
import createBrowserHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';
const history = createBrowserHistory()
ReactDOM.render(
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/:sId" component={DetailPage} />
			</Switch>
		</Router>
		,document.getElementById('root'));
registerServiceWorker();
