import './App.css';
import { Routes,Route } from 'react-router';
import Home from './components/Home';
import CreateMcqSingle from './components/CreateMcqSingle';
import QuizList from './components/QuizList';
import PlayQuiz from './components/PlayQuiz';

function App() {
  return (
    <div className='app'>      
    {/* defining the routes */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mcq-single' element={<CreateMcqSingle/>} />
        <Route path='/quizzes' element={<QuizList/>} />
        <Route path='/play' element={<PlayQuiz/>} />
      </Routes>
    </div>
    
  );
}

export default App;
