import styles from "../pages/offersLayout.module.css";

export const ContentSeveralInfo = ({
  data = ["Aprender ingles"],
  onChangeEmails,
}) => {
  return (
    <div className={styles.content_requirement_selected}>
      {data.map((info) => (
        <p key={info} onClick={() => onChangeEmails(info)}>
          {info}
        </p>
      ))}
    </div>
  );
};
