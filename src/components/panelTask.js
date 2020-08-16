import React, { useState, useEffect } from 'react'
import OptionsTasks from './optionsTask'
import Axios from 'axios'
import PubSub from 'pubsub-js'
import 'react-datepicker/dist/react-datepicker.css'
import { SplitButton } from 'react-bootstrap'


export default function PanelTask(props) 
{
    let moment = require('moment');
    let showList
    let tasks = []
    let order = []
    let count = 1

    const [task, setTasks] = useState("Initial")
    console.log(task)

    const mySubscriber = (msg, data) => {

        setTasks(data)
    };

    useEffect(() => {

        const token = PubSub.subscribe('state', mySubscriber);
        getTasks();

    }, [])

    const getTasks = () => 
    {
            Axios.get(`https://academlo-todolist.herokuapp.com/tasks`,
            {
                params:
                {
                    page: count,
                    limit: 20
                }

            }).then(res => {

                tasks.push(res.data.results)

                if (count < res.data.totalPages) 
                {
                    count++
                    getTasks()
                }
                else 
                {
                    orderDate();
                }

            }).catch((error) => {
                console.log(error)
            });
    }
    const compareDate = (day) =>
    {
        let dateData = moment(day.date).fromNow()
        let dateSplit = dateData.split(" ")
        let data 
        let filter 

        if(task != "Old")
        {
            data = dateSplit[0]
            filter = "in"
        }
        else
        {
            data = dateSplit[2]
            filter = "ago"
        }

        return data == filter ||  moment().isSame(day.date, 'day')
    }

    const orderDate = () => 
    {
        for (let i = 0; i < tasks.length; i++) 
        {
            for (let j = 0; j < tasks[i].length; j++) 
            {
                order.push(tasks[i][j])
            }
        }

        if(task != "Old")
        {
            order = order.sort(
                (a, b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
            )                              
        }
        else
        {
            order = order.sort(
                (a, b) => moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD')
            )
        }

        order = order.filter(compareDate)  

        switch (task) 
        {
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
                order = order.filter(element => (false) == Old.isSame(element.date, 'day'))   
                break;
        }

        setTasks(order)
    }

    const printTask = () => {
        let html = []
        let key = 0


        for (let j = 0; j < task.length; j++) 
        {
            html.push(
                <div key={key++} id={task[j]._id} className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{moment(task[j].date).format('MMMM Do YYYY')}</h5>
                            <p className="card-text">{task[j].content}</p>
                        </div>
                        <OptionsTasks id={task[j]._id} date={task[j].date} content={task[j].content}/>
                    </div>
                </div>
            )
        }

        return html
    }

    switch (task) 
    {
       
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
            showList = printTask()
            break;
    }

    return (

        <div id="tasks" className="border bg-light p-1 ">
            <div className="row m-0">
                {showList}
            </div>
        </div>
    )
}