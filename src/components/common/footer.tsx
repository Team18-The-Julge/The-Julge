import Image from 'next/image';
import Link from 'next/link';

import emailImage from '@/public/images/envelope-square.png';
import facebookImage from '@/public/images/facebook-square.png';
import instagramImage from '@/public/images/instagram.png';

function Footer() {
  return (
    <footer>
      <div>
        <p>©codeit - 2023</p>
        <div>
          <Link href="/">
            <span>Privacy Policy</span>
          </Link>
          <Link href="/">
            <span>FAQ</span>
          </Link>
        </div>
        <div>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src={instagramImage} alt="instagram" width={32} height={32} />
          </Link>
          <Link href="/">
            <Image src={emailImage} alt="email" width={25} height={25} />
          </Link>
          <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Image src={facebookImage} alt="facebook" width={25} height={25} />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src={instagramImage} alt="instagram" width={25} height={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
