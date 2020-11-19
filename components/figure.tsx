import styles from './../styles/Figure.module.css'

type Props = {
  listOfStates: Array<string>
}

export default function Figure({ listOfStates }: Props) {
  const moveSpoonPixels = 10
  const initialPosition = 10
  const finalPosition = 100

  function lenghtOfStates() {
    let lenght = 0
    listOfStates.forEach((value) => {
      lenght += value.length
    })

    return lenght
  }

  function moveSpoon() {
    const inputsLenght = lenghtOfStates()

    let move = initialPosition + (moveSpoonPixels * inputsLenght)
    
    const initialMove = initialPosition + (moveSpoonPixels * inputsLenght) <= finalPosition
    const moveToLeft = initialPosition + (moveSpoonPixels * inputsLenght) > finalPosition && Number(String(initialPosition + (moveSpoonPixels * inputsLenght))[0]) % 2 === 1
    const moveToRight = initialPosition + (moveSpoonPixels * inputsLenght) > finalPosition && Number(String(initialPosition + (moveSpoonPixels * inputsLenght))[0]) % 2 === 0

    if (initialMove) {
      move = initialPosition + (moveSpoonPixels * inputsLenght)
    } else if (moveToLeft) {
      const countZero = String(move).length - 1
      let count = String(move)[0]
      for (let index = 0; index < countZero; index++) {
        count += '0'
      }

      move = finalPosition - (move - Number(count))
    } else if (moveToRight) {
      const countZero = String(move).length - 1
      let count = String(move)[0]
      for (let index = 0; index < countZero; index++) {
        count += '0'
      }

      move = move - Number(count)
    }

    return {
      marginLeft: move
    }
  }

  function spoonCableHeight() {
    let spoonCableHeight = 60
    const inputsLenght = lenghtOfStates()

    const moveToLeft = initialPosition + (moveSpoonPixels * inputsLenght) > finalPosition && Number(String(initialPosition + (moveSpoonPixels * inputsLenght))[0]) % 2 === 1
    if (moveToLeft) {
      spoonCableHeight -= 5
    } 

    return {
      height: spoonCableHeight
    }
  }

  function spoonBaseHeight() {
    let spoonBaseHeight = 40
    const inputsLenght = lenghtOfStates()

    const moveToLeft = initialPosition + (moveSpoonPixels * inputsLenght) > finalPosition && Number(String(initialPosition + (moveSpoonPixels * inputsLenght))[0]) % 2 === 1
    if (moveToLeft) {
      spoonBaseHeight -= 5
    }

    return {
      height: spoonBaseHeight
    }
  }

  function spoonBaseContentHeight() {
    let spoonBaseContentHeight = 30
    const inputsLenght = lenghtOfStates()

    const moveToLeft = initialPosition + (moveSpoonPixels * inputsLenght) > finalPosition && Number(String(initialPosition + (moveSpoonPixels * inputsLenght))[0]) % 2 === 1
    if (moveToLeft) {
      spoonBaseContentHeight -= 5
    }

    return {
      height: spoonBaseContentHeight
    }
  }

  return (
    <div className={styles.figureContainer}>
      <div className={styles.spoon} style={moveSpoon()}>
        <div className={styles.spoonCable} style={spoonCableHeight()}></div>

        <div className={styles.spoonBase} style={spoonBaseHeight()}>
          <div className={styles.spoonBaseContent} style={spoonBaseContentHeight()}></div>
        </div>
      </div>

      <div className={styles.bowl}>
          <div className={styles.bowlContent}></div>
          <div className={styles.bowlFooter}></div>
      </div>
    </div>
  )
}