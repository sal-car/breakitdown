export const Task = function ({task}) {

    const parseTime = function () {
        const date = new Date(task.date)
        const mins = date.getMinutes()
        const hours = date.getHours()
        return `${hours}:${mins}`
    }

    parseTime()
    // console.log(task)
    return (
        <div className="Task">
            <div className="task-left">
            <h3>{task.project}</h3>
            <p></p>
            </div>
            {/* <p>{parseTime(task.date)}</p> */}
        </div>
    )
}