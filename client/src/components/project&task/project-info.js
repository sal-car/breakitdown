export const ProjectInfo = function ({project}) {
    console.log("projetModal")
    console.log(project)
    return (
        <div className="ProjectInfo">
            <h1>{project.project}</h1>
            {
                project.description ? 
                <div className="project-info-description">
                    <p>Description</p>
                    <p>{project.description}</p>
                </div>
                :
                <div></div>
            }
            {
                project.tasks.map((task) => {
                    <div className="project-info-task"></div>
                })
            }
        </div>
    )

}