import s from "../HomeVeiw/HomeView.module.css";

export default function Home() {
  return (
    <>
      <h1 className={s.header}>Welcome to Phonebook</h1>
      <p className={s.text}>You need to log in to use the application.</p>
    </>
  );
}
