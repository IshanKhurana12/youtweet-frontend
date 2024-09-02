import React from 'react';
import styles from '../Styles/logo.module.css'; // Import the CSS module

export default function Logo() {
  return (
    <button className={styles.button} data-text="Awesome">
      <span className={styles.hoverText}>&nbsp;youTweet&nbsp;</span>
      <span className={styles.actualText}>&nbsp;youTweet&nbsp;</span>
    </button>
  );
}
