import '../styles/globals.css'
import ContextProvider from '../utils/Context';
// import { ToastContainer } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
import "../components/DashboardGrid/DashboardGrid.css";
import "../components/DashboardTable/DashboardTable.css";
function MyApp({ Component, pageProps }) {
  return <ContextProvider><Component {...pageProps} /></ContextProvider>
}

export default MyApp
