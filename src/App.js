import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import SignupSuccess from './components/signup/signup-success';
import Notification from './Notification';



function App() {
  return (
    <>
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
