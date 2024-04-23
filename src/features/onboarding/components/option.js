import styles from './styles/option.module.css';

function Option({desctiption}) {
  return (
    <div className={styles.option}>
      <label className={styles.optionCheckBox}>
        <input type="checkbox" name={desctiption}/>
        <span className={styles.boxLabel}>{desctiption}</span>
        <span className={styles.checkboxIcon}></span>
      </label>
    </div>
  );
}

export default Option;