import { useEffect, useState } from "react";
import { GetDashboardData } from "../../services/BookService";
import DashboardCard from "./DashboardCard";
import styles from "./dashboardCard.module.css";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function loadData() {
            const res = await GetDashboardData();
            setData(res.data);
        }
        loadData();
    }, []);

    if (!data) return <p style={{ color: "white" }}>Loading...</p>;

    return (
        <div className={styles.dashboard}>
            <DashboardCard
                title="Today's Issued"
                value={data.todaysIssued}
            />

            <DashboardCard
                title="Today's Due"
                value={data.todaysDue}
            />

            <DashboardCard
                title="Total Issued"
                value={data.totalIssued}
            />

            <DashboardCard
                title="Due Missed"
                value={data.dueMissed}
            />
        </div>
    );
}

export default Dashboard;