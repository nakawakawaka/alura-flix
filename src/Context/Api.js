import { createContext, useContext, useState, useEffect } from "react";
import { videosService } from "Service/videos-service";

const ApiContext = createContext()

export const ApiProvider = ({ children }) => {
    const [Categoria, setCategoria] = useState([]);
    
    useEffect(() => {
        videosService.listaCategorias()
        .then(data => setCategoria(data))
        .catch(err => console.log(err));
    }, [])
    
    const cadastraCategoria = (novaCategoria) => {
        videosService.cadastraCategoria(novaCategoria.nome, novaCategoria.descricao, novaCategoria.cor, novaCategoria.codigo);
        setCategoria([...Categoria, novaCategoria])
    }
    
    const deletaCategoria = (id) => {
        videosService.removeCategoria(id)
        setCategoria(Categoria.filter(categoria => categoria.id !== id));
    }
    
    const editaCategoria = (edit, props) => {
        videosService.editaCategoria(edit, props.nome, props.descricao, props.cor, props.codigo);
        setCategoria(Categoria.map(categ => categ.id !== edit ? categ : props))
    }

    // Videos 
    const [banner, setBanner] = useState('');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        videosService.video(1)
          .then(data => setBanner(data))
          .catch(err => console.log(err))
      }, [])
    
      useEffect(() => {
        videosService.listaVideos()
          .then(data => setVideos(data))
          .catch(err => console.log(err))
      }, [])
    
      const mostraVideo = id => {
        videosService.video(id)
          .then(data => setBanner(data))
          .catch(err => console.log(err));
      }

      const cadastraVideo = (novoVideo) => {
        videosService.cadastraVideo(novoVideo.titulo, novoVideo.url, novoVideo.img, novoVideo.categSelec, novoVideo.descricao, novoVideo.codigo);
        setVideos([...videos, novoVideo])
      }

    return (
        <ApiContext.Provider value={{
            Categoria,
            cadastraCategoria,
            deletaCategoria,
            editaCategoria,
            banner,
            videos,
            mostraVideo,
            cadastraVideo
        }}>
            {children}
        </ApiContext.Provider>
    )
}

export function useAPI() {
    const context = useContext(ApiContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }