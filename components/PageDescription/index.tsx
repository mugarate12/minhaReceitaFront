import styles from './PageDescription.module.css'

type Props = {
  title: string
}

export default function PageDescription({ title }: Props) {
  return (
    <h3 className={styles.description} >{title}</h3>
  )
}
