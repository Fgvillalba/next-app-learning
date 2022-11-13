import styles from "./styles.module.css"

export default function Avatar({ alt, src, text, resizeAvatar }) {
  return (
    <div className={styles.container}>
      <img
        className={resizeAvatar ? styles.avatarResized : styles.avatar}
        alt={alt}
        src={src}
        title={alt}
      />
      {text && <strong>{text || alt}</strong>}
    </div>
  )
}
