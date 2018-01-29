const React = require('react');

const CompletedTasks = require('./components/CompletedTasks.react').default;
const UpcomingTasks = require('./components/UpcomingTasks.react').default;
const UpcomingTaskList = require('./components/UpcomingTaskList.react').default;
const OverdueTasks = require('./components/OverdueTasks.react').default;

const { dashboardLayout } = require('sass/styles.scss');

class DashboardView extends React.PureComponent {
    render() {
        return (
            <div className={dashboardLayout}>
                <OverdueTasks />
                <CompletedTasks />
                <UpcomingTasks />
                <UpcomingTaskList />
            </div>
        );
    }
}

export default DashboardView;