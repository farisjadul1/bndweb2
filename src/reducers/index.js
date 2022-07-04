import {combineReducers} from 'redux'
import JenisReducer from './jeni'
import KaosReducer from './kaos'
import AuthReducer from './auth'
import PesananReducer from './pesanan'
import LaporanReducer from './laporan'

export default combineReducers({
    JenisReducer,
    KaosReducer,
    AuthReducer,
    PesananReducer,
    LaporanReducer
})