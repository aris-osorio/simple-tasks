import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import Modal from 'react-modal';
import PubSub from 'pubsub-js'
import Axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    height: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

toast.configure();
Modal.setAppElement('#root')
export default function ModalEdit() {
  let content
  let placeHolder
  const [startDate, setStartDate] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState([false, ["", "", ""]]);

  function openModal(msg, data) {
    console.log("Modal edit ok")
    setStartDate(new Date(data[1]))
    setIsOpen([true, data]);
  }

  function closeModal() {
    setIsOpen([false, ["", "", ""]]);
  }

  useEffect(() => {

    PubSub.subscribe('Modal-Edit', openModal);

  }, [])

  const editTask = () => {
    Axios.put(`https://academlo-todolist.herokuapp.com/tasks/` + modalIsOpen[1][0],
      {

        content: content.value,
        date: startDate,


      }).then(res => {
        console.log(res)
        toast.info('Task saved successfully')
        PubSub.publish('state', document.getElementById("select-tasks").value)

      }).catch((error) => {
        toast.error('Error saving task')
        console.log(error)
      });
    console.log(modalIsOpen[1][0] + " " + content.value + " " + startDate)
    closeModal();
  }

  if (modalIsOpen[1][2] != "") {
    placeHolder = modalIsOpen[1][2].props
    placeHolder = placeHolder.children[0].props.children + placeHolder.children[1].props.children + placeHolder.children[2].props.children
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
          <div className="position-relative">
            <p className="font-weight-light position-absolute txt-s-modal color-blue-1">S</p>
            <p className="font-weight-light position-absolute txt-simple-modal color-blue-1">SIMPLE</p>
            <p className="font-weight-light position-absolute txt-task-modal color-blue-1">TASK</p>
          </div>
          <div className="form-group">
            <h2 className="color-blue-1">Edit task</h2>
          </div>
        </div>
        <div className="p-3">
          <div className="form-group">
            <label htmlFor="Inputcontent1" className="color-blue-1">Content</label>
            <br></br>
            <input type="text" className="input-txt" ref={txt => content = txt} id="Inputcontent1" placeholder={placeHolder}></input>
          </div>
          <div className="form-group">
            <label htmlFor="Inputdate1" className="color-blue-1">Date</label>
            <br></br>
            <DatePicker className="input-txt" id="Imputdate1" selected={startDate} onChange={date => setStartDate(date)} />
          </div>
          <div className="form-group d-flex">
            <button className="btn-task mr-1" onClick={editTask}>Save Task</button>
            <button className="btn-task ml-1" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}