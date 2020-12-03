import styles from './../styles/HomeFigures.module.css'

export default function HomeFigures(){
  return (
    <>
      <img className={styles.chef} src="/img/chefs-hat-1588125.png" alt="Chapéu de chef de cozinha"/>
      <img className={styles.knife} src="/img/knife 2.png" alt="Faca de cozinha"/>
      <img className={styles.moedor} src="/img/moedor.png" alt="moedor de cozinha"/>
      
      
      <img className={styles.pan} src="/img/panela.png" alt="panela de cozinha"/>
      <img className={styles.forma} src="/img/forma.png" alt="forma de cozinha"/>
      <img className={styles.cutlery} src="/img/silverware-304129.png" alt="talheres de cozinha"/>
    </>
  );
}