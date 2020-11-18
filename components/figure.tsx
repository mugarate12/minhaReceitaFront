import styles from './../styles/Figure.module.css'

export default function Figure({ inputString }) {
  function moveSpoon() {
    const baseMarginLeft = 50
    const moveSpoonToRight = 5

    return {
      marginLeft: baseMarginLeft + (moveSpoonToRight * inputString.length)
    }
  }

  return (
    <div className={styles.figureContainer}>
      <div className={styles.spoon} style={moveSpoon()}>
        <div className={styles.spoonCable}></div>

        <div className={styles.spoonBase}>
          <div className={styles.spoonBaseContent}></div>
        </div>
      </div>

      <div className={styles.bowl}>
          <div className={styles.bowlContent}></div>
          <div className={styles.bowlFooter}></div>
      </div>
    </div>
  )
}