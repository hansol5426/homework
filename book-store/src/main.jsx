import { createRoot } from 'react-dom/client'
import BookStore from './pages/BookStore'
import LoginUser from './components/LoginUser'


createRoot(document.getElementById('root')).render(
  <BookStore />
)
