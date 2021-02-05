import { useState } from 'react'

import styles from './../styles/Image.module.css'

type Props = {
  src: string,
  alt: string,
  width?: number,
  height?: number
}

export default function ImageComponent({ src, alt, width, height }: Props) {
  return (
    <img
      className={styles.img}
      src={src}
      alt={alt}
      style={{
        width: !!width ? `${width}px` : '',
        height: !!height ? `${height}px` : '' 
      }}
    />
  )
}