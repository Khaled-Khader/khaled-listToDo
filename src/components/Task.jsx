    import { useTranslation } from "react-i18next";
    import { useState, memo } from "react";
    import { useDispatch } from "react-redux";
    import { Button } from "@mui/material";
    import CelebrationPortal from './CelebrationPortal';
    import { tasksActions } from "../redux";
    import { progAction } from "../redux";
    import Modal from "./Modal";
    import TaskForm from "./TaskForm";
    import { useSortable } from "@dnd-kit/sortable";
    import { CSS } from "@dnd-kit/utilities";

    const audio = new Audio("/mixkit-conference-audience-clapping-strongly-476.wav");

    function Task({ task}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        willChange: "transform", // smoother dragging
    };

    function handleDone() {
        const newDone=!task.done
        if (newDone) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Play error:", err));
        setShow(true);
        setTimeout(() => setShow(false), 8000);
        }
        dispatch(tasksActions.isDone(task.id));
        dispatch(progAction.setProgress(newDone))
    }

    function handleRemove() {
        dispatch(tasksActions.removeTask(task.id));
    }

    function handleEdit(updatedTask) {
        setShow(false);
        audio.pause();
        audio.currentTime = 0;
        dispatch(tasksActions.editTask(updatedTask));
        setShowModal(false);
    }

    function openEdit() {
        setShow(false);
        audio.pause();
        audio.currentTime = 0;
        setShowModal(true);
    }

    return (
        <>
        {showModal && (
            <Modal>
            <TaskForm onSubmit={handleEdit} defaultValues={task}>
                <Button variant="contained" color="error" onClick={() => setShowModal(false)}>
                {t("Cancel")}
                </Button>
                <Button variant="contained" type="submit">
                {t("Submit")}
                </Button>
            </TaskForm>
            </Modal>
        )}

        <CelebrationPortal show={show} />

        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-col md:flex-row justify-between items-start md:items-center 
                    bg-purple-50 dark:bg-gray-800 border border-purple-400 dark:border-gray-600 
                    rounded-2xl p-4 shadow hover:shadow-lg w-full"
        >
            {/* Drag Handle + Content */}
            <div className="flex-1 min-w-0 mb-4 md:mb-0 flex items-start md:items-center gap-3">
            {/* Drag handle */}
            <span
                {...listeners}
                {...attributes}
                className="cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 select-none"
            >
                ☰
            </span>

            {/* Task content */}
            <div className="min-w-0">
                <h3
                className={`text-xl font-semibold ${
                    task.done
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-100"
                } truncate`}
                title={task.title}
                >
                {task.title}
                </h3>
                <p
                className={`text-gray-600 dark:text-gray-300 ${task.done ? "line-through" : ""} line-clamp-2 overflow-hidden`}
                title={task.description}
                >
                {task.description}
                </p>
            </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
            <Button
                variant="contained"
                color={task.done ? "success" : "primary"}
                onClick={handleDone}
                disabled={show}
                className="px-4 py-1 rounded-xl shadow-md hover:shadow-lg"
            >
                {task.done ? t("Undo") : t("Done")}
            </Button>

            <Button
                variant="outlined"
                color="error"
                onClick={handleRemove}
                className="px-4 py-1 rounded-xl shadow-md hover:shadow-lg"
            >
                {t("Remove")}
            </Button>

            <Button
                variant="outlined"
                onClick={openEdit}
                className="px-4 py-1 rounded-xl shadow-md hover:shadow-lg"
            >
                {t("Edit")}
            </Button>
            </div>
        </div>
        </>
    );
    }

    export default memo(Task);
