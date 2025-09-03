import { useTranslation } from "react-i18next"
import Button from '@mui/material/Button';
import Task from "./Task";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { tasksActions } from "../redux";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
export default function ToDoList(){
    const tasks=useSelector(state=>state.tasks)
    const prog=useSelector(state=>state.prog)
    const [id ,setId]=useState(1)
    const [show,setShow]=useState(false)
    const {t}=useTranslation()
    const dispatch=useDispatch()
    

    function handleShow(){
        setShow(true)
    }

    function handleAddTask(task){
        const newTask={
            id:id,
            done:false,
            title:task.title,
            description:task.description
        }
        dispatch(tasksActions.addTask(newTask))
        setId(pre=>pre+1)
        setShow(false)
    }

    function getTaskPos(id){
        return tasks.findIndex(task=>task.id===id)
    }

    function handleDragEnd(event){
        const {active,over}= event

        if(active.id===over.id)
            return

        const org=getTaskPos(active.id)
        const newPos=getTaskPos(over.id)

        dispatch(tasksActions.reorderTasks({oldIndex:org,newIndex:newPos}))
    }

    const sensors=useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor,{
            coordinateGetter:sortableKeyboardCoordinates
        })
    )

    

    return(
        <>
    <div className="flex flex-col items-center rounded-2xl border mt-7 border-purple-500 w-full max-w-4xl mx-auto py-8 px-6 shadow-lg bg-white dark:bg-gray-900 transition">
        
        {show && 
        <Modal>
            <TaskForm onSubmit={handleAddTask}>
                <Button 
                onClick={()=>setShow(false)}
                variant="contained"
                color="error"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition"
                >
                    {t("Cancel")}
                </Button>
                <Button
                type="submit"
                variant="contained"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition"
                >
                    {t("Submit")}
                </Button>
            </TaskForm>
        </Modal>
        }
        
        <Button
            onClick={handleShow}
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
            {t("Click to add")}
        </Button>

        <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
        >
            <SortableContext 
            items={tasks}
            strategy={verticalListSortingStrategy}
            >
                <div className="mt-8 w-full space-y-4">
                    {tasks.map((item) => (
                        <Task task={item} key={item.id} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>

        

        {
            tasks.length ===0?
                <p className="text-center text-purple-600 text-4xl mt-4">{t("No Tasks Yet")}!</p>:
                tasks.length===prog?
            <p className="text-center text-purple-600 text-4xl mt-4">
                {t("Tasks Completed")}!
            </p>:<progress
        max={tasks.length}
        value={prog}
        className="w-full h-4 rounded-lg mt-4 overflow-hidden bg-purple-100 dark:bg-gray-700 [&::-webkit-progress-bar]:bg-purple-100 [&::-webkit-progress-value]:bg-purple-500 [&::-moz-progress-bar]:bg-purple-500 shadow-md"
        />
        }

        
        
    </div>
</>
    )
}