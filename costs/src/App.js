import{BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './Componentes/pages/Home';
import Empresa from './Componentes/pages/Empresa';
import Contato from './Componentes/pages/Contato';
import Container from './Componentes/layout/Container';
import Navbar from './Componentes/layout/NavBar';
import Footer from './Componentes/layout/Footer';
import Projetos from './Componentes/pages/Projetos';
import NovoProjeto from './Componentes/pages/Novoprojeto';
import Project from './Componentes/pages/Project';


function App() {
  return (
      <Router>
        <Navbar/>
        <Switch>
          <Container customClass="min_height">
            <Route exact path = '/'> <Home/> </Route>
            <Route path = '/projects'> <Projetos/> </Route>
            <Route path = '/empresa'> <Empresa/> </Route>
            <Route path = '/novoprojeto'> <NovoProjeto/> </Route>
            <Route path = '/project/:id'> <Project/> </Route>
            <Route path = '/contato'> <Contato/> </Route>
          </Container>
        </Switch>
        <Footer/>
      </Router>
  )
}

export default App;
