export const Project = function ({project, onProjectClick, handleDeleteClick}) {


    return (
        <button onClick={onProjectClick} className="Project">
            <div>
                <button onClick={(handleDeleteClick)}>Delete project</button>
            </div>
            <div className="project-info">
                <h1 className="project-name" >{project.project}</h1>
                {project.tasks.length ?
                <div className="next-card">
                    <p className="next">Next</p>
                    <p className="next-task">{project.tasks[0].project}</p>
                </div>
                :
                <div></div>
            }
            </div>

        </button>
    )
}