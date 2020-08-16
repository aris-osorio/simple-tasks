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
export default function ModalNew()
{
  let content 
  const [startDate, setStartDate] = useState(new Date());
  const [modalIsOpen,setIsOpen] = useState(false);
  
  function openModal(msg, data) 
  {
    console.log("Modal New OK")
    setIsOpen(true);
  }
 
  function closeModal()
  {
    setIsOpen(false);
  }

  useEffect(() => {

    var token = PubSub.subscribe('Modal-New', openModal);

  }, [])

  const addTask=()=>
  {
        Axios.post(`https://academlo-todolist.herokuapp.com/tasks`, 
        {
            content: content.value, 
            date: startDate,

        }).then(res => 
            {
                console.log(res.data);
                toast.success('Tarea Agregada con exito')
                PubSub.publish('state', document.getElementById("select-tasks").value)

            }).catch((error) => {
                console.log(error)
                toast.error('Error al agregar tarea')
                
        });
        console.log(content.value+" "+startDate)
        
        setStartDate(new Date())
        closeModal();
  }

 
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div className="p-3">
               <div className="form-group">
                   <h2 className="color-blue-1">Add new task</h2>
               </div>   
            </div>    
            <div className="p-3">  
                <div className="form-group">
                    <label htmlFor="Inputcontent1" className="color-blue-1">Content</label>
                    <br></br>
                    <input type="text" className="input-txt" ref={txt => content = txt} id="Inputcontent1"  placeholder="Put your tasks here"></input>
                </div>
                <div className="form-group">
                        <label htmlFor="Inputdate1" className="color-blue-1">Date</label>
                        <br></br>
                        <DatePicker className="input-txt" id="Imputdate1" selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div className="form-group d-flex">
                    <button className="btn-task" onClick={addTask}>Save task</button>
                    <button className="btn-task" onClick={closeModal}>Cancel</button>
                </div>
             </div>
        </Modal>
      </div>
    );
}
 
