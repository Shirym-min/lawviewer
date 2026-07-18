import styles from "./Loading.module.css"


type LoadingProps = {
  visible: boolean;
};

export default function Loading({ visible }: LoadingProps) {
  return (
    <div className={styles.loading + (visible ? " " + styles.show : "")}>
      <div className={styles.spinner} />
      <span>読み込み中...</span>
    </div>
  );
}