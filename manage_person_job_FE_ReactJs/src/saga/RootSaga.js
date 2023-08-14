import {all} from 'redux-saga/effects'
import {JobSaga} from './JobSaga'
import {DetailJobSaga} from './DetailJobSaga'
import {StatusSaga} from './StatusSaga'

export default function* rootSaga() {
    yield all([
      ...JobSaga,
    ])
    yield all([
      ...DetailJobSaga,
    ])
    yield all([
      ...StatusSaga
    ])
    // code after all-effect
  }