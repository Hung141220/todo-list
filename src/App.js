import Todolist from "./components/Todolist";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [textInput, setTextInput] = useState("");
    useEffect(() => {
        const storageTodoApp = localStorage.getItem("TODO_APP");
        if (storageTodoApp) setTodoList(JSON.parse(storageTodoApp));
    }, []);
    useEffect(() => {
        localStorage.setItem("TODO_APP", JSON.stringify(todoList));
    }, [todoList]);

    const onTextInputChange = useCallback((e) => {
        console.log(1);
        return setTextInput(e.target.value);
    }, []);

    const onAddBtnClick = useCallback(
        (e) => {
            setTodoList([
                { id: v4(), name: textInput, isCompleted: false },
                ...todoList,
            ]);
            setTextInput("");
        },
        [textInput, todoList]
    );

    const onCheckBtnClick = useCallback((id) => {
        setTodoList((prevState) => {
            return prevState.map((item) =>
                item.id === id ? { ...item, isCompleted: true } : item
            );
        });
    }, []);

    return (
        <>
            <h3>Danh sách cần làm</h3>
            <Textfield
                name="add-todo"
                placeholder="Thêm việc cần làm"
                value={textInput}
                onChange={onTextInputChange}
                elemAfterInput={
                    <Button
                        isDisabled={!textInput}
                        appearance="primary"
                        style={{ marginRight: 4 }}
                        onClick={onAddBtnClick}>
                        Thêm
                    </Button>
                }></Textfield>
            <Todolist todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
        </>
    );
}

export default App;
