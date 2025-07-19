import React from 'react';
import '../assets/css/todoList.css';


function TodoInnerList({todotext, doneBtn, completed,checked,handleCheck,delBtn}) {
    return (
        <>
            <div className='innerBoxList'
            style={{ background: completed ? "rgba(255, 255, 255, 0.6)" : "white"}}
                >
                <div className='list-check'>
                    <input type='checkbox' 
                           name='checkbox'
                           checked={checked}
                           onChange={handleCheck} 
                           />
                </div>
                <div className='list-text'>
                    <p id='listText'
                        style={{ 
                            textDecoration: completed ? "line-through" : "none",
                            color: completed ? "gray" : "black"
                        }} 
                    >{todotext}</p>
                </div>
                <div className='list-button'>
                    <button type='button' className='btn btn-success' onClick={doneBtn} disabled={completed} >완료</button>
                    <button type='button' className='btn btn-danger' onClick={delBtn} >삭제</button>
                </div>
            </div>
        </>
    );
}

export default TodoInnerList;