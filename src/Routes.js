import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { validaCampos } from 'Models/Cadastro';
import Home from './Paginas/Home';
import NovoVideo from './Paginas/NovoVideo';
import NovaCategoria from './Paginas/NovaCategoria';
import Footer from './component/Footer';
import Header from 'component/Header';
import ValidacoesFormulario from 'Context/ValidacoesFormulario';
import { ApiProvider } from 'Context/Api';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />

      <ApiProvider>
        <section>
          <ValidacoesFormulario.Provider value={{
            titulo: validaCampos,
            url: validaCampos,
            img: validaCampos,
            categSelec: validaCampos,
            codigo: validaCampos,
            nome: validaCampos,
            cor: validaCampos,
          }}>
            <Routes>
              <Route index element={<Home />} />

              <Route path='novovideo' element={<NovoVideo validacoes={{ titulo: validaCampos }} />} />
              <Route path='novacategoria' element={<NovaCategoria />} />

              <Route path='*' element={<div>Pagina não encontrada</div>} />
            </Routes>
          </ValidacoesFormulario.Provider>
        </section>
      </ApiProvider>

      <Footer />
    </BrowserRouter>
  );
}

