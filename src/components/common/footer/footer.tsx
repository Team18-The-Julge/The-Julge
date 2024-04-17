import Image from 'next/image';
import Link from 'next/link';

import styles from '@/components/common/Footer/Footer.module.scss';
import emailImage from '@/public/svgs/envelope-square.svg';
import facebookImage from '@/public/svgs/facebook-square.svg';
import instagramImage from '@/public/svgs/instagram.svg';

function Footer() {
  return (
    <footer className={styles.footerBox}>
      <div className={styles.footerWrapper}>
        <p className={styles.copyright}>©codeit - 2023</p>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            <span>Privacy Policy</span>
          </Link>
          <Link href="/" className={styles.link}>
            <span>FAQ</span>
          </Link>
        </div>
        <div className={styles.snsIcons}>
          <Link href="/" className={styles.snsBox} target="_blank" rel="noopener noreferrer">
            <Image src={emailImage} alt="email" width={25} height={25} />
          </Link>
          <Link href="https://www.facebook.com/" className={styles.snsBox} target="_blank" rel="noopener noreferrer">
            <Image src={facebookImage} alt="facebook" width={25} height={25} />
          </Link>
          <Link href="https://www.instagram.com/" className={styles.snsBox} target="_blank" rel="noopener noreferrer">
            <Image src={instagramImage} alt="instagram" width={25} height={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
