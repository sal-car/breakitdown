import moment from 'moment';

export const formatDate = function (project, byHour) {
    const date = new Date(project.date)

    if (byHour) {
        return moment(date).format("HH:mm")

    } else {
        var todaysDate = new Date();

        if (date.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
            return "Today";
        } else {
            return moment(date).format("DD MMM");

        }
    }
}