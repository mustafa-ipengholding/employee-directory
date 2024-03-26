import { Route, Routes } from 'react-router-dom';
import './App.css';
import Employee from './component/Employee';

function App() {
  return (
    <div>
      <Routes>
          <Route exact path = "/" Component={Employee} />
     </Routes>
    </div>
  );
}

export default App;
