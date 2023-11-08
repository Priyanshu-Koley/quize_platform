import './App.css';
import { Routes,Route } from 'react-router';
import Home from './components/Home';
import CreateMcqSingle from './components/CreateMcqSingle';
import QuizeList from './components/QuizeList';
import PlayQuize from './components/PlayQuize';

function App() {
  return (
    <div className='app'>      
    {/* defining the routes */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mcq-single' element={<CreateMcqSingle/>} />
        <Route path='/quizes' element={<QuizeList/>} />
        <Route path='/play' element={<PlayQuize/>} />
      </Routes>
    </div>
    
  );
}

export default App;
