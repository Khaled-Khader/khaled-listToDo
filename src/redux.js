import { configureStore,createSlice } from "@reduxjs/toolkit";

const tasksSlice=createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        addTask:(state,action)=>{
            state.push(action.payload)
        },
        editTask:(state,action)=>{
            return state.map(task=>
                task.id===action.payload.id?action.payload:task
            )
        },
        isDone:(state,action)=>{
            
            const task=state.find(task=>task.id===action.payload)
            if(task){
                task.done=!task.done
            }
        },
        removeTask:(state,action)=>{
            return state.filter(task=>task.id!=action.payload)
        },
        reorderTasks: (state, action) => {
            const { oldIndex, newIndex } = action.payload;
            const [moved] = state.splice(oldIndex, 1);
            state.splice(newIndex, 0, moved);
        }
    }
})

const progressSlice=createSlice({
    name:"prog",
    initialState:0,
    reducers:{
        setProgress: (state, action) => {
            if(action.payload){
                return state + 1
            }else{
                return state>0?state -  1:0
            }
},
    }
})

export const store=configureStore({
    reducer:{
        tasks:tasksSlice.reducer,
        prog:progressSlice.reducer
    }
})
export const progAction=progressSlice.actions
export const tasksActions=tasksSlice.actions

