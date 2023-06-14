import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';

import rootReducer from './rootReducer';

const configureAppSotre = (): Store => {
	const store = configureStore({ reducer: rootReducer });
	return store;
};

export default configureAppSotre;
