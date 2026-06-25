import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index'
import ToastContainer from './components/common/ToastContainer'  // ✅ Import

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />  {/* ✅ Add this */}
        </>
    )
}

export default App