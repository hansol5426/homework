import React from 'react';
import '../assets/css/todoList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import TodoInnerList from './TodoInnerList';

function TodoList(props) {

    // 입력창 상태
    const [insert, setInsert] = useState('');
    // 리스트 상태
    const [todoList, setTodoList] = useState([]);


    // 투두 등록
    const add = ()=>{
        // 입력값 없으면 입력해달라고 요청
        if(!insert.trim()){
            alert('할 일을 입력해주세요.');
            return;
        }

        // 투두 객체 생성
        const todo = {
            text:insert,
            completed :false,
            checked:false
        };

        // 새로운 투두 추가
        setTodoList([...todoList,todo]);
        // 입력창 비우기
        setInsert('');
    }

    // 체크박스 상태 변경
    const handleCheck = (index)=>{
        // 해당 인덱스의 투두만 체크
        const newTodoList = todoList.map((todo,i)=>
        i === index ? {...todo, checked: !todo.checked} : todo);

        setTodoList(newTodoList);
    }


    // 투두 완료처리
    const done = (index)=>{
        // 체크 안하고 완료 누르면 체크하라고 띄우기
        if(!todoList[index].checked){
            alert('완료해야 할 일정을 체크해주세요.')
            return;
        }

        // 체크된 인덱스 완료 처리
        const selectedDone = todoList.map((todo,i)=>
        i === index ? {...todo, completed: true, checked: false} : todo);

        setTodoList(selectedDone);
        
    }


    // 투두 삭제처리
    const del = (index)=>{
        // 체크 안하고 삭제 누르면 체크하라고 띄우기
        if(!todoList[index].checked){
            alert('삭제해야 할 일정을 체크해주세요.')
            return;
        }

        // 삭제할건지 확인
        if(window.confirm('정말 삭제하시겠습니까?')){
            // 체크된 인덱스 목록에서 제거
            const selectedDel = todoList.filter((_,i) => i !== index);
            setTodoList(selectedDel);
        }
    }        


    // 투두 일괄완료처리
    const allDone = ()=>{
        // 완료되지 않은 항목 중 체크된 항목 있는지 검사
        const isChecked = todoList.some(todo => todo.checked && !todo.completed);
        // 아무 것도 체크 되어있지 않다면 띄우기
        if(!isChecked){
            alert('일괄완료할 일정을 체크해주세요.')
            return;
        }

        // 체크된 항목만 완료
        const selectedAllDone = todoList.map(todo=>
            todo.checked && !todo.completed ? 
            {...todo, completed:true, checked:false } : todo);

            setTodoList(selectedAllDone);

    }


    // 할 일, 한 일, 달성률 계산
    const todoCount = todoList.filter(todo=>!todo.completed).length;
    const doneCount = todoList.filter(todo=>todo.completed).length;
    const rate = todoList.length > 0 ? Number(((doneCount / todoList.length )*100).toFixed(2)):0;


    return (
        <>
            <div className='container'>
                <header className='header'>
                    <h2>TodoList</h2>
                </header>
                <div className='h-txt'>
                    <p>할 일 :{todoCount}건 </p>
                    <p>한 일 :{doneCount}건 </p>
                    <p>달성률 :{rate}% </p>
                </div>
                <div className='todo-text'>
                    <input type='text' className='form-control' value={insert} onChange={(e)=>setInsert(e.target.value)} />
                    <button type='button' className='btn btn-primary' onClick={add}>등록</button>
                    <button type='button' className='btn btn-success' onClick={allDone}>일괄완료</button>
                </div>
                <div className='innerBox'>
                    {
                        todoList?.map((todo,index)=>
                            <TodoInnerList 
                            key={index} 
                            todotext={todo.text}
                            doneBtn={()=>done(index)}
                            completed={todo.completed}
                            checked ={todo.checked}
                            handleCheck={()=>handleCheck(index)}
                            delBtn={()=>del(index)}>
                            </TodoInnerList>                              
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default TodoList;