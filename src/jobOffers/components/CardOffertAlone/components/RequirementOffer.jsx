import styles from "../page/cardOffertAlone.module.css";

export const RequirementOffert = ({ Icon, title, data = [] }) => {
  return (
    <div className={styles.box_requirement_offert}>
      <h3>{title}</h3>

      {data.map((text) => (
        <p key={text}>
          <Icon /> {text}
        </p>
      ))}
    </div>
  );
};
