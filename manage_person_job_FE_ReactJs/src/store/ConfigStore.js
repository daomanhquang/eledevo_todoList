import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/RootSaga'
import logger from 'redux-logger'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store 
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware,logger)
})
// then run the saga
sagaMiddleware.run(rootSaga)

export default store