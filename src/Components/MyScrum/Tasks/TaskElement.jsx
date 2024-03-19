import React, { useState } from 'react';
import { UserStore } from '../../../Stores/UserStore.jsx';
import './TaskElement.css';
import darkCross from '../../../multimedia/dark-cross-01.png';
import restoreIcon from '../../../multimedia/restoreIcon.png';
import { useNavigate } from 'react-router-dom';



const TaskElement = ({ task }) => {

    const navigate = useNavigate();
    const key = task.id;

    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    const DEVELOPER = 100;
    const SCRUM_MASTER = 200;
    const PRODUCT_OWNER = 300;

    const typeOfUser = UserStore.getState().user.typeOfUser;

    const taskElementId = task.taskId;
    const taskElementTitle = task.title;
    const taskElementDescription = task.description;
    const taskElementErased = task.erased;


    const addPriorityClass = () => {
        if (task.priority === LOW) {
            return 'low';
        } else if (task.priority === MEDIUM) {
            return 'medium';
        } else if (task.priority === HIGH) {
            return 'high';
        }
    }

    const addTaskErasedClass = () => {
        if (task.erased) {
            return 'erased';
        }
    }

    const addEraseButton = () => {
        if ( (typeOfUser === SCRUM_MASTER && !taskElementErased) || (typeOfUser === PRODUCT_OWNER && !taskElementErased) ) {
            return <img src={darkCross} className='apagarButton' dataset={taskElementId} alt='erase' onClick={handleEraseButton} />
        } 
    }

    const addDeleteAndRestoreButton = () => {
        if (typeOfUser === PRODUCT_OWNER && taskElementErased) {
            return (
            <>
                <img src={darkCross} className='permanent-delete-button' dataset={taskElementId} onClick={handleEraseButton} alt='delete' />
                <img src={restoreIcon} className='restore-button' dataset={taskElementId} alt='delete' />
            </>
            )
        }
    }

    const handleTaskToEdit = (event) => {
        navigate('/my-scrum/edit-task', { state: { task: task } });
    }

    const handleEraseButton = (event) => {
        console.log('Erase button:', event.target);
    }
   

    return (
        <div key={key} className={`task ${addPriorityClass()} ${addTaskErasedClass()} not-draggable`} id={key} draggable="true" onDoubleClick={handleTaskToEdit} > 
            <div className='post-it'>
                <h3>{taskElementTitle}</h3>
                <div className='post-it-text'>
                    <p>{taskElementDescription}</p>
                </div>
                {addEraseButton()}
                {addDeleteAndRestoreButton()}
            </div>
        </div>
    );
}
export default TaskElement;