import styles from "./page.module.css";
import UserList from "./components/UserList";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>User Management System</h1>

      <UserList />
    </main>
  );
}
