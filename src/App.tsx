import SideNav from './components/SideNav/SideNav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import AskAI from './components/AskAI/AskAI'

function App() {
  return (
    <>
      <SideNav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
      <AskAI />
    </>
  )
}

export default App
