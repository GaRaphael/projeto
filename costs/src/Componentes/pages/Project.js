import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';

function Project(){

    const{id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
        },
    })
        .then((resp) => resp.json())
        .then((data) =>{ 
            setProject(data)
        })
        .catch((err) => console.log(err))
    }, [id])

    function toggleProjectForm(){

        setShowProjectForm(!showProjectForm)
    }

    return(
        <>
          <div className={styles.project_details}>
              <Container customClass="column">
                  <div  className={styles.details_container}>
                      <h1>Projeto: {project.name}</h1>
                      <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                  </div>
                  {!showProjectForm ? (
                      <div className={styles.info}>
                          <p>
                              <span>Categoria: </span>{project?.category?.name}
                          </p>
                          <p>
                              <span>Total de orçamento: </span>{project.budget}
                          </p>
                          <p>
                              <span>Total ultilizado: </span>{project.cost}
                          </p>
                      </div>
                  ):(
                      <div className={styles.info}>
                          <p>Detalhes</p>
                      </div>
                  )}
              </Container>
          </div>
        </> 
    )
}



export default Project;