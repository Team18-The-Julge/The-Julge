import { ReactElement, useState } from 'react';

import Modal from '@/components/feature/Modal/Modal';
import ModalGroup from '@/components/feature/Modal/ModalGroup';
import EmptyLayout from '@/layouts/EmptyLayout';

function Naeun() {
  const handleClick = () => {
    console.log(`모달내부에 신청취소 혹은 승인 취소 버튼 클릭함!!!`);
  };
  const a = true;
  // 조건에 따라 다른 모달이 떠야할 때
  const [openModal, setOpenModal] = useState<ReactElement | null>(null);

  const modalList = {
    modal1: <Modal.Error>에러가 뜹니다!</Modal.Error>,
    modal2: <Modal.Check>2</Modal.Check>,
    modal3: <Modal.Select buttonClick={handleClick}>3</Modal.Select>,
    modal4: <Modal.Select buttonClick={handleClick}>4</Modal.Select>
  };

  const onClick1 = () => {
    if (a) {
      setOpenModal(modalList.modal1);
    }
    if (!a) {
      setOpenModal(modalList.modal2);
    }
  };

  // 서로 다른 위치의 버튼 모두 모달이 필요할 때 root를 선언해야함!!
  return (
    <div>
      {/* 모달선언 */}
      <ModalGroup.Trigger>
        <button type="button" onClick={onClick1}>
          버튼1
        </button>
      </ModalGroup.Trigger>
      <ModalGroup.Content>{openModal}</ModalGroup.Content>

      <ModalGroup.Root>
        <ModalGroup.Trigger>
          <button type="button" onClick={onClick1}>
            버튼2
          </button>
        </ModalGroup.Trigger>
        <ModalGroup.Content>
          <Modal.Select buttonClick={handleClick}>3</Modal.Select>
        </ModalGroup.Content>
      </ModalGroup.Root>
    </div>
  );
}

export default Naeun;

Naeun.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
