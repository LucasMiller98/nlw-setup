import './styles/global.css'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import 'react-toastify/dist/ReactToastify.css';
import './lib/dayjs'
import { ToastContainer } from 'react-toastify';

export function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer
        autoClose={5000}
        className='toast-container'
      />
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>    
  )
}

