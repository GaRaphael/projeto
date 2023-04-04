import {useEffect, useState} from 'react';
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './Form.module.css'


function FormContato({handleSubmit, ButtonText, projectData}){

    const[coment_categories, setComent_categories] = useState([]);

    useEffect(()=>{       
        fetch('http://localhost:5000/categories',{
            method: "POST",
            headers:{
                'Content-type' : 'application/json' 
            }
        })
        .then((resp)=> resp.json()) 
        .then((data)=> {
            setComent_categories(data)
        })
        .catch((err)=> console.log(err))

    },[])

    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(coment_categories)
    }  
    
    return(
      <form onSubmit={submit} className={styles.form}>
       
            <Input 
                type="text" 
                text="Digite seu nome"
                name="name"
                placeholder="Insira o seu nome"
                value={coment_categories.name ? coment_categories.name: ''}
            /> 
    
            <Input 
                type="text" 
                text="Digite o comentário"
                name="coment"
                placeholder="Digite o seu comentário"
                value={coment_categories.coment ?coment_categories.coment: ''}
            /> 
        
           <Select
                name = "coment_id"
                text= "Selecione o tipo de comentário"
                options={coment_categories}
                value={coment_categories.id ? coment_categories.id : ''}
            />
       
        <Submit text={ButtonText}/> 
      </form>
    )
}




export default FormContato