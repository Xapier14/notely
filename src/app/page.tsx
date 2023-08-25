import NavBar from "./nav-bar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className={styles["section-container"]}>
        <section className={styles["landing-section"]}>
          <p>
            Keep track of your tasks with <strong>Todo</strong>.
          </p>
          <span>Get started today by logging in or signing up.</span>
        </section>
        <section className={styles["boxed-section"]}>
          <h2>Features</h2>
          <ul>
            <li>Create a project containing tasks</li>
            <li>Keep track of your tasks</li>
            <li>Share your tasks with others</li>
            <li>Get notified when tasks are completed</li>
          </ul>
        </section>
        {/*
        <section className={styles["boxed-section"]}>
          <h2>Get started</h2>
          <ul>
            <li>Log in</li>
            <li>Sign up</li>
          </ul>
        </section> */}
      </main>
    </>
  );
}
