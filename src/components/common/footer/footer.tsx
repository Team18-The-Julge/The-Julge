import Link from 'next/link';

import styles from '@/components/common/Footer/Footer.module.scss';
import { ReactComponent as EmailIcon } from '@/public/svgs/envelope-square.svg';
import { ReactComponent as FacebookIcon } from '@/public/svgs/facebook-square.svg';
import { ReactComponent as InstagramIcon } from '@/public/svgs/instagram.svg';

function Footer() {
  const Icons = [<EmailIcon />, <FacebookIcon />, <InstagramIcon />];

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
        <section className={styles.snsIcons}>
          {Icons.map((Icon, index) => (
            <Link
              href={index === 0 ? '/' : index === 1 ? 'https://www.facebook.com/' : 'https://www.instagram.com/'}
              className={styles.snsBox}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icon}
            </Link>
          ))}
        </section>
      </div>
    </footer>
  );
}

export default Footer;
