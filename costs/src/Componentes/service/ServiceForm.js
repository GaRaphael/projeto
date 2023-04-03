import styles from '../project/Form.module.css'
import { useState } from 'react';
import Input from '../form/input';
import Submit from '../form/Submit';


function ServiceForm({handleSubmit, ButtonText, projectData}){

    const [service,setService] = useState([])

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service,[e.target.name] : e.target.value})
       
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
              type="text"
              text = "Nome do serviço"
              nome = "name"
              placeholder="Insira o nome do serviço"
              handleOnChange={handleChange}
              //value={service.name ? service.name: ''}
            />
             <Input 
              type="number"
              text = "Custo do serviço"
              nome = "cost"
              placeholder="Insira o custo do serviço"
              handleOnChange={handleChange}
            />
             <Input 
              type="text"
              text = "Descrição do serviço"
              nome = "description"
              placeholder="Descreva o serviço"
              handleOnChange={handleChange}
            />
            <Submit text={ButtonText} />
        </form>
    )
}




export default ServiceForm;