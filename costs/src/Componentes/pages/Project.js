import {v4 as uuidv4} from 'uuid';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import FormProjeto from '../project/FormProjeto';
import ServiceForm from '../service/ServiceForm';
import Message from '../layout/Mensagem';
import ServiceCard from '../service/ServiceCard';

function Project(){

    const{id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const[services,Setservices] = useState([])
    const [type, setType] = useState()

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
            Setservices(data.services)
        })
        .catch((err) => console.log(err))
    }, [id])

    function editPost(project){
        setMessage('')
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }


        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then(data =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('sucess')
        })
        .catch(err => console.log(err))
    }
    
    function createService(project){
        setMessage('')
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    } 

    function removeService(id,cost){
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        ) 
        
        const projectUpdated = project
        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:"PATCH",
            headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(projectUpdated)
        })
        .then(resp => resp.json())
        .then(data =>{
            setProject(projectUpdated)
            Setservices(servicesUpdate)
            setMessage('Serviço removido com sucesso!')
            setType('sucess')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){

        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){

        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
          <div className={styles.project_details}>
              <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div  className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}
                    </button>
                {!showProjectForm ? (
                    <div className={styles.info}>
                        <p>
                            <span>Categoria: </span>{project?.category?.name}
                        </p>
                        <p>
                            <span>Total de orçamento: R$</span>{project.budget}
                        </p>
                        <p>
                            <span>Total ultilizado: R$</span>{project.cost}
                        </p>
                    </div>
                ):(
                    <div className={styles.info}>
                        <FormProjeto 
                        handleSubmit={editPost} 
                        ButtonText="Concluir edição" 
                        projectData={project} 
                        />
                    </div>
                )}
                </div>
                <div className={styles.serviceform_container}>
                    <h2>Adicionar um serviço:</h2>
                    <button
                    className={styles.btn} 
                    onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={styles.info}>
                        {showServiceForm && (
                            <ServiceForm
                            handleSubmit={createService}
                            ButtonText="Adicionar serviço"
                            projectData={project}
                            />
                        )}
                     </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service)=>(
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />   
                            )) 
                        }
                        {services.length ===0 && <p>Não há serviços</p>}
                    </Container>
                </Container>
            </div> 
        </> 
    )
}



export default Project;