import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {JobManage,StatusManage} from './view/indexView'
const rootRouter = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<JobManage/>}/>
            <Route path='/statusmanage' element={<StatusManage/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default rootRouter