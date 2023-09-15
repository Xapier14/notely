import NavBar from "./nav-bar";
import styles from "./page.module.scss";
import "./styles/boxed-section.scss";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className={styles["section-container"]}>
        <section className={styles["landing-section"]}>
          <div className={styles["landing-items"]}>
            <h1>
              Keep track of your ideas with <strong>Notely</strong>.
            </h1>
            <span>Get started today by logging in or signing up.</span>
          </div>
        </section>
        <section className="boxed-section">
          <h2>Features</h2>
          <ul>
            <li>Keep track of your notes.</li>
            <li>Organize notes into categories.</li>
            <li>Collaborate with others with groups.</li>
            <li>Get notified when task list notes are completed.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
