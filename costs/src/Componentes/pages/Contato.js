import styles from '../project/Form.module.css';
import Input from '../form/Input';
import Submit from '../form/Submit';
import { useState } from 'react';
import FormContato from '../project/FormContato';
import Message from '../layout/Mensagem';

function Contato({handleSubmit, ButtonText, projectData}){

    const [message, setMessage] = useState() ; 
    const [type, setType] = useState();
    const [coment_categories,setComent_categories] = useState([]);

    function submitC(e){
        e.preventDefault()
        projectData.coment_categories.push(coment_categories)
        handleSubmit(projectData)
    }

    function CreateComent(){

    fetch('http://localhost:5000/coment_categories',{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(coment_categories),
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            setMessage('Comentario feito com sucesso')
            setType('sucess')
        })
        .catch((err)=> console.log(err))
    }
    return(
        <div className={styles.project_container}>
            <h1>Deixe o seu comentário</h1>
            <p>Dê para nós um feedback de como foi a sua experiencia!</p>
            <FormContato handleSubmit={CreateComent} ButtonText="Criar Comentário"/>
        </div>
    )
}


export default Contato;








  

