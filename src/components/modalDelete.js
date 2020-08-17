import React,{useEffect,useState} from 'react';
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
export default function ModalDelete()
{

  const [modalIsOpen,setIsOpen] = useState([false,""]);
  
  function openModal(msg, data) 
  {
    console.log("Modal delete ok")
    setIsOpen([true, data]);
  }
 
  function closeModal()
  {
    setIsOpen([false,""]);
  }

  useEffect(() => {

    var token = PubSub.subscribe('Modal-Delete', openModal);

  }, [])

  const deleteTask=()=>
  {
        Axios.delete(`https://academlo-todolist.herokuapp.com/tasks/`+modalIsOpen[1], 
        {   

        }).then(res =>
        {
            console.log(res)
            toast.success('Tarea eliminada con exito')
            PubSub.publish('state', document.getElementById("select-tasks").value)        
            
        }).catch((error)=>
        {   
            toast.error(modalIsOpen[1])
            console.log(error)
        });

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
                    <h2 className="color-blue-1">Delete Task</h2>
                </div>
                <div className="form-group">
                    <p className="color-blue-1">Are you sure to delete this task?</p>
                </div>
                <div className="form-group d-flex">
                    <button className="btn-task mr-1" onClick={deleteTask}>Yes</button>
                    <button className="btn-task ml-1" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </Modal>
      </div>
    );
}
 
