import styles from './Projeto.module.css';
import {useHistory} from 'react-router-dom'
import FormProjeto from '../project/FormProjeto';

function NovoProjeto(){

    const history = useHistory()

    function createPost(project){
        project.cost = 0;
        project.services = [];
        
        fetch('http://localhost:5000/projects',{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            history.push('/projects',{message:'Projeto criado com sucesso'})
        })
        .catch((err)=> console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <h1>Novo Projeto</h1>
            <p>Crie um novo projeto para depois adicionar os serviços!</p>
            <FormProjeto handleSubmit={createPost} ButtonText="Criar Projeto"/>
        </div>
    )
}


export default NovoProjeto;