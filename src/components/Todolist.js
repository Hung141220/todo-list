import Todo from "./Todo";

function Todolist({ todoList, onCheckBtnClick }) {
    return (
        <>
            {todoList.map((item, index) => {
                return <Todo key={item.id} todo={item} onCheckBtnClick={onCheckBtnClick}/>;
            })}
        </>
    );
}

export default Todolist;
