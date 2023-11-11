export const Project = function ({project, handleProjectCardClick}) {
    return (
        <button onClick={() => handleProjectCardClick(project)} className="Project">
            <div className="project-info">
                <h1 className="project-name" >{project.project}</h1>
                {project.tasks.length ?
                <div className="next-card">
                    <p className="next">Next</p>
                    <p className="next-task">{project.tasks[0].project}</p>
                </div>
                :
                <div className="div"></div>
            }
            </div>

        </button>
    )
}