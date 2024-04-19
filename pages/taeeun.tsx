import { useState } from 'react';

import Button from '@/components/common/Button';
import styles from '@/components/common/Button.module.scss';
import Footer from '@/components/common/Footer/Footer';
import Toast from '@/components/common/Toast/Toast';

function TaeEun() {
  const [showToast, setShowToast] = useState<boolean>(false);

  return (
    <div>
      <div>
        <Footer />
      </div>
      <div>
        {showToast && <Toast onShow={() => setShowToast(false)}>토스트에유</Toast>}
        <Button className={styles.button} size="small" solid active onClick={() => setShowToast(true)}>
          버튼버튼
        </Button>
      </div>
    </div>
  );
}

export default TaeEun;
