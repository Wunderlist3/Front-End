import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { axiosWithAuth } from "../../axiosWithAuth";

import { Modal } from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSquare, faCheckSquare, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class ListItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            listID: '',
            list: {},
            tasks: [],
            taskTitle: '',
            setDate: '',
            modal: false,
            modalState: 'add',
        }
    }

    componentDidMount() {

        axiosWithAuth()
            .get(`/api/users/${localStorage.getItem('userID')}`)
            .then(res => {
                this.setState({
                    user: res.data,
                })
                this.getListID()
            })
            .then(() => {
                axiosWithAuth()
                    .get(`/api/todos/${this.state.listID}`)
                    .then(res => {
                        this.setState({
                            list: res.data,
                        })
                    })
                    .catch(err => {
                        console.log('Get Request: ListItem.js: Error: ', err)
                    })
            })
            .catch(err => {
                console.log('Get Request: Main: User Data: Error: ', err)
            })

    }

    getListID = () => {
        const urlParams = new URLSearchParams(window.location.search)
        this.setState({
            listID: urlParams.get('id')
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    deleteList = () => {
        axiosWithAuth()
            .delete(`/api/todos/${this.state.list.id}`)
            .then(res => {
                console.log('Delete Request: ListItem.js: Result: ', res)
                this.props.history.push('/my')
            })
            .catch(err => {
                console.log('Delete Request: ListItem.js: Error: ', err)
            })
    }

    editList = () => {
        axiosWithAuth()
            .put(`/api/todos/${this.state.list.id}`, {
                title: this.state.listTitle,
                task: 'task',
                setDate: 'today',
            })
            .then(res => {
                console.log('Put Request: ListItem.js: Result: ', res)
                this.setState({
                    lists: this.state.lists,
                })
            })
            .catch(err => {
                console.log('Put Request: ListItem.js: Error: ', err)
            })
    }

    handleChanges = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const obj = {
            taskTitle: this.state.taskTitle,
            setDate: this.state.setDate,
        }
        this.state.tasks.push(obj)
        this.setState({
            tasks: this.state.tasks,
        })
        this.toggle()
    }

    handleNameSubmit = e => {
        e.preventDefault()
        this.editList()
    }

    TaskItem = props => {
        const [complete, setComplete] = React.useState(false)
        const handleClick = () => {
            setComplete(!complete)
        }
        if (complete === false) {
            return (
                <div key={props.task.id} style={{ width: '50%', margin: '0 64px 32px', }}>
                    <div
                        onClick={handleClick}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <div style={{ display: 'block', marginRight: '16px', textAlign: 'left' }}>
                            <div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>{props.task.taskTitle}</div>
                            <div style={{ fontSize: '16px', fontWeight: 400, color: '#757575' }}>{props.task.setDate}</div>
                        </div>
                        <FontAwesomeIcon icon={faSquare} style={{ fontSize: '24px' }} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div key={props.task.id} style={{ width: '50%', margin: '0 64px 32px', }}>
                    <div
                        onClick={handleClick}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'line-through',}}
                    >
                        <div style={{ display: 'block', marginRight: '16px', textAlign: 'left' }}>
                            <div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>{props.task.taskTitle}</div>
                            <div style={{ fontSize: '16px', fontWeight: 400, color: '#757575' }}>{props.task.setDate}</div>
                        </div>
                        <FontAwesomeIcon icon={faCheckSquare} style={{ fontSize: '24px' }} />
                    </div>
                </div>
            )
        }
    }

    Tasks = () => {
        return (
            <div style={{ margin: '0 32px' }}>
                <form
                    onSubmit={this.handleNameSubmit}
                    style={{ fontSize: '32px', fontWeight: 600, textAlign: 'left' }}
                >
                    <input
                        id="listTitle"
                        label="Type to name the to-do"
                        name="listTitle"
                        placeholder={`${this.state.list.title}`}
                        className="taskTitleInput"
                        onChange={this.handleChanges}
                    />
                </form>

                {this.state.tasks.map(task => {
                    return (
                        <this.TaskItem task={task} />
                    );
                })}

            </div>
        );
    }

    Modal = () => {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.54)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="createListModal">
                        <div>
                            <input
                                id="listTitle"
                                label="Type to name the to-do"
                                name="taskTitle"
                                placeholder="Type to create a to-do"
                                className="listTitleInput"
                                autoFocus
                                onChange={this.handleChanges}
                            />
                            <input
                                type=""
                                id="form-input"
                                name=""
                                className="listTitleInput"
                                onChange={this.handleChanges}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <button className="cancelNewListButton" onClick={this.toggle}>Cancel</button>
                            <button className="createNewListButton" onClick={this.handleSubmit}>Create</button>{' '}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <>
                <header className="listItemHeader">
                    <div className="headerCtn">
                        <div className="headerLeftIconCtn">
                            <NavLink to="/my">
                                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '24px' }} />
                            </NavLink>
                        </div>
                        <div onClick={this.deleteList} className="headerRightIconCtn">
                            <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '24px', marginLeft: '24px' }} />
                        </div>
                    </div>
                </header>
                <this.Tasks />
                <this.Modal />
                <footer>
                    <div className="footerListItem">
                        <div onClick={this.toggle}>
                            <FontAwesomeIcon icon={faPlus} className="button createButton" />
                        </div>
                    </div>
                </footer>
            </>
        );
    }

}

export default ListItem;
