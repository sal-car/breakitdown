export const sortByDate = function (projects) {
    return [...projects.sort((a,b) => new Date(a.date) - new Date(b.date))]
}