import Link from 'next/link';
import React, { FunctionComponent, SVGProps } from 'react';

import styles from '@/components/common/Footer/Footer.module.scss';
import { ReactComponent as EmailIcon } from '@/public/svgs/envelope-square.svg';
import { ReactComponent as FacebookIcon } from '@/public/svgs/facebook-square.svg';
import { ReactComponent as InstagramIcon } from '@/public/svgs/instagram.svg';

function Footer() {
  const svgLinks: {
    id: number;
    svg: FunctionComponent<SVGProps<SVGSVGElement>>;
    link: string;
  }[] = [
    { id: 1, svg: EmailIcon, link: '/' },
    { id: 2, svg: FacebookIcon, link: 'https://www.facebook.com/' },
    { id: 3, svg: InstagramIcon, link: 'https://www.instagram.com/' },
  ];

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
          {svgLinks.map((item) => (
            <Link key={item.id} href={item.link} className={styles.snsBox} target="_blank" rel="noopener noreferrer">
              <item.svg />
            </Link>
          ))}
        </section>
      </div>
    </footer>
  );
}

export default Footer;
