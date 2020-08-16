import React,{useEffect,useState} from 'react';
import DatePicker from 'react-datepicker'
import Modal from 'react-modal';
import PubSub from 'pubsub-js'
import Axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 

Modal.setAppElement('#root') 
export default function ModalEdit()
{
  let content
  let moment = require('moment');
  const [startDate, setStartDate] = useState(new Date());
  const [modalIsOpen,setIsOpen] = useState([false,["","",""]]);
  const token = PubSub.subscribe('Modal-Edit', openModal);
  
  function openModal(msg, data) 
  {
    console.log(data)
    console.log(startDate)
    setStartDate(new Date(data[1]))
    setIsOpen([true, data]);
  }
 
  function closeModal()
  {
    setIsOpen([false,["","",""]]);
  }

  useEffect(() => {

    

  }, [])

  const editTask=()=>
  {
        Axios.put(`https://academlo-todolist.herokuapp.com/tasks/`+modalIsOpen[1][0], 
        {   
            
                content: content.value, 
                date: startDate,
            

        }).then(res =>
        {
            console.log(res)
            toast.success('Tarea guardada con exito')
            PubSub.publish('state', document.getElementById("select-tasks").value)        
            
        }).catch((error)=>
        {   
            toast.error('Hubo un error al Editar la tarea')
            console.log(error)
        });
        console.log(modalIsOpen[1][0] +" "+content.value+ " " +startDate)
        closeModal();
 }

 
    return (
      <div>
        <Modal
          isOpen={modalIsOpen[0]}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="p-3">
               <div className="form-group">
                   <h2 className="color-blue-1">Edit task</h2>
               </div>   
            </div>    
            <div className="p-3">  
                <div className="form-group">
                    <label htmlFor="Inputcontent1" className="color-blue-1">Content</label>
                    <br></br>
                    <input type="text" className="input-txt" ref={txt => content = txt} id="Inputcontent1"   placeholder={modalIsOpen[1][2]}></input>
                </div>
                <div className="form-group">
                        <label htmlFor="Inputdate1" className="color-blue-1">Date</label>
                        <br></br>
                        <DatePicker className="input-txt" id="Imputdate1" selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div className="form-group d-flex">
                    <button className="btn-task" onClick={editTask}>Save Task</button>
                    <button className="btn-task" onClick={closeModal}>Cancel</button>
                </div>
             </div>
        </Modal>
      </div>
    );
}