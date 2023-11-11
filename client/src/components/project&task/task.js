export const Task = function ({projects, task}) {

    const parseTime = function () {
        const date = new Date(task.date)
        const mins = String(date.getMinutes()).padStart(2, '0')
        const hours = date.getHours()
        return `${hours}:${mins}`
    }

    const getParentProject = function (id) {
        const project = projects.find((project) => project.id === task.parent);
        return project;
    }

    return (
        <div className="Task">
            <div className="task-left">
            <h3>{task.project}</h3>
            <p>{getParentProject(task.parent).project}</p>
            </div>
            <p>{parseTime(task.date)}</p>
        </div>
    )
}