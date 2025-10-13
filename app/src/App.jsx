import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from  'react-router-dom'
import Login from './pages/Login/Index'
import Main from "./pages/Main/Index"
import { useUser } from './hooks/useUser'
import Details from "./pages/Details/Index"
import ChartPage from './components/ChartPage'
import MapPage from './components/MapPage'
import { useData } from './hooks/useData'
function App() {

  const {state,isUserLoading} = useUser()
  const {data,isLoading} = useData()
  console.log(state)

  if(isUserLoading){
    return <div>Loading</div>
  }



  return (
    <Router>
      <Routes>
        <Route path = "/" element = {state.username !== null ? <Main /> : <Navigate replace to = "/login" /> } />
        <Route path = "/login" element={<Login />} />
        <Route path = "/data/:name" element={<Details />} />
        <Route path = "/chart" element={<ChartPage />} />
        <Route path = "/map" element={<MapPage data = {data} />} />
      </Routes>
    </Router>
  )
}

export default App
