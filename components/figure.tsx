import styles from './../styles/Figure.module.css'

type Props = {
  listOfStates: Array<string>
}

export default function Figure({ listOfStates }: Props) {
  const moveSpoonPixels = 10
  const initialPosition = 10
  const finalPosition = 100
  const marginBottomSpoonInitialPosition = -20

  function lenghtOfStates() {
    let lenght = 0
    listOfStates.forEach((value) => {
      lenght += value.length
    })

    return lenght
  }

  function moveSpoon() {
    const inputsLenght = lenghtOfStates()

    let move
    let spoonPosition = marginBottomSpoonInitialPosition

    const movimentOrientation = inputsLenght / 10
    const integerNumber = String(movimentOrientation).split('.')[0]
    const moveleft =  Number(integerNumber) % 2 === 1
    const moveright =  Number(integerNumber) % 2 === 0

    if (moveleft) {
      const numberInText = String(inputsLenght)
      const numberUnit = Number(numberInText[numberInText.length - 1])

      move = finalPosition - moveSpoonPixels * numberUnit
    } else if (moveright) {
      const numberInText = String(inputsLenght)
      const numberUnit = Number(numberInText[numberInText.length - 1])

      move = moveSpoonPixels * numberUnit
    }

    if (move > 20 && move <= 40) {
      spoonPosition -= 2
    } else if (move > 40 && move <= 60) {
      spoonPosition -= 4
    } else if (move > 60 && move <= 80) {
      spoonPosition -= 2
    } else {
      spoonPosition = marginBottomSpoonInitialPosition
    }

    return {
      marginLeft: move + initialPosition,
      marginBottom: spoonPosition
    }
  }

  function spoonCableHeight() {
    let spoonCableHeight = 60
    const inputsLenght = lenghtOfStates()

    const moveToLeft =  Number(String(inputsLenght / 10).split('.')[0]) % 2 === 1
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

    const moveToLeft =  Number(String(inputsLenght / 10).split('.')[0]) % 2 === 1
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

    const moveToLeft =  Number(String(inputsLenght / 10).split('.')[0]) % 2 === 1
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