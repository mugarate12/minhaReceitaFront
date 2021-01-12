import styles from './../styles/PreviousTextInformation.module.css'

type Props = {
  state: string,
  textDescription: string
}

export default function PreviousTextInformation({ state, textDescription }: Props) {
  return (
    <h5 
      style={{
        textDecoration: state.length > 0 ? 'line-through' : ''
      }}
      className={styles.previousInformationText}>{textDescription}</h5>
  )
}