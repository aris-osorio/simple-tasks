import React, { useState, useEffect } from 'react'
import OptionsTasks from './optionsTask'
import Axios from 'axios'
import PubSub from 'pubsub-js'
import 'react-datepicker/dist/react-datepicker.css'


export default function PanelTask(props) {
    let moment = require('moment');
    let showList
    let tasks = []
    let order = []
    let splitText
    let count = 1
    let token

    const divStyle = {
        overflowY: 'auto',
        height: '330px',
    };

    const [task, setTasks] = useState("Initial")

    const mySubscriber = (msg, data) => {
        console.log("Actualizando estado my suscriber ")
        setTasks(data)
    };

    useEffect(() => {

        token = PubSub.subscribe('state', mySubscriber);
        getTasks();

    }, [token])

    const getTasks = () => {
        Axios.get(`https://academlo-todolist.herokuapp.com/tasks`,
            {
                params:
                {
                    page: count,
                    limit: 20
                }

            }).then(res => {

                tasks.push(res.data.results)

                if (count < res.data.totalPages) {
                    count++
                    getTasks()
                }
                else {
                    orderDate();
                }

            }).catch((error) => {
                console.log(error)
            });

    }

    const compareDate = (day) => {
        let dateData = moment(day.date).fromNow()
        let dateSplit = dateData.split(" ")
        let data
        let filter

        if (task !== "Old") {
            data = dateSplit[0]
            filter = "in"
        }
        else {
            data = dateSplit[2]
            filter = "ago"
        }

        return data === filter || moment().isSame(day.date, 'day')
    }

    const compareText = (txt) => {

        let bool = false

        if (txt.content.toLowerCase().includes(splitText.toLowerCase())) {
            let html = []
            bool = true

            let initial = txt.content.substr(0, txt.content.toLowerCase().indexOf(splitText.toLowerCase()))

            let underline = txt.content.substr(txt.content.toLowerCase().indexOf(splitText.toLowerCase()), splitText.length)

            let final = txt.content.substr(txt.content.toLowerCase().indexOf(splitText.toLowerCase()) + splitText.length, txt.content.length)

            html.push(
                <p className="card-text color-blue-1">
                    <span>{initial}</span>
                    <span style={{ backgroundColor: "#2c7eb4", color: "white" }}>{underline}</span>
                    <span>{final}</span>
                </p>
            )

            txt.content = html[0]
            console.log(txt.content)
        }

        return bool
    }

    const orderDate = () => {
        for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < tasks[i].length; j++) {
                order.push(tasks[i][j])
            }
        }

        if (task !== "Old") {
            order = order.sort(
                (a, b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
            )
        }
        else {
            order = order.sort(
                (a, b) => moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD')
            )
        }

        splitText = document.getElementById("input-search").value

        order = order.filter(compareDate)

        switch (task) {
            case "Today":
                let today = moment();
                order = order.filter(element => today.isSame(element.date, 'day'))
                break;

            case "Week":
                let week = moment();
                order = order.filter(element => week.isSame(element.date, 'week'))
                break;

            case "Month":
                let month = moment();
                order = order.filter(element => month.isSame(element.date, 'month'))
                break;

            case "Old":
                let Old = moment();
                order = order.filter(element => (false) === Old.isSame(element.date, 'day'))
                break;
            
                default:
                break;
        }

        order = order.filter(compareText)

        setTasks(order)
    }

    const printTask = () => {
        let html = []
        let key = 0


        for (let j = 0; j < task.length; j++) {
            html.push(
                <div key={key++} id={task[j]._id} className="col-sm-3 p-1">
                    <div className="card d-flex tasks-container">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title">{moment(task[j].date).format('MMMM Do YYYY')}</h5>
                                <span><OptionsTasks id={task[j]._id} date={task[j].date} content={task[j].content} /></span>
                            </div>
                            <div>
                                {task[j].content}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        showList = html
    }

    switch (task) {

        case "Initial":
            showList = (<h3>Loading tasks...</h3>)
            break;

        case "All":
            getTasks();
            break;

        case "Today":
            getTasks()
            break;

        case "Week":
            getTasks()
            break;

        case "Month":
            getTasks()
            break;

        case "Old":
            getTasks()
            break;

        default:
            printTask()
            break;
    }

    return (

        <div id="tasks" className="pt-3 pl-3 pr-3">
            <div className="row m-0" style={divStyle}>
                {showList}
            </div>
        </div>
    )
}