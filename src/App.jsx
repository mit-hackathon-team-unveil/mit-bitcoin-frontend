import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { WalletProvider } from "./context/WalletContext"
import { ArticleProvider } from "./context/ArticleContext"
import { UserProvider } from "./context/UserContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import ArticlePage from "./pages/ArticlePage"
import PublishPage from "./pages/PublishPage"
import ProfilePage from "./pages/ProfilePage"
import AdminDashboard from "./pages/AdminDashboard"
import AboutPage from "./pages/AboutPage"
import "./index.css"

function App() {
  return (
    <Router>
      <WalletProvider>
        <UserProvider>
          <ArticleProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/article/:articleId" element={<ArticlePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/publish" element={<PublishPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ArticleProvider>
        </UserProvider>
      </WalletProvider>
    </Router>
  )
}

export default App

