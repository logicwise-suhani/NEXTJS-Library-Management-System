import styles from "./dashboardCard.module.css";

export default function DashboardCard({ title, value }) {
    return (
        <div className={styles.dashboardCard}>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    )
}