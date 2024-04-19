import Modal from '@/components/Modal/Modal';
import Modals from '@/components/Modal/ModalGroup';

function Naeun() {
  const handleClick = () => {
    console.log(`버튼 클릭함!!!`);
  };
  return (
    <div>
      {/* 모달선언 */}
      <Modals.Root>
        {/* 모달이 실행되는 버튼 | childen으로 되어있기에 태그를 사용할 수 있음 */}
        {/* ex) <Modals.Trigger><Button>에러버튼</Button></Modals.Trigger>  */}
        <Modals.Trigger>에러버튼</Modals.Trigger>
        {/* 조건부를 달 수 있음 | content는 꼭 실행되지 않아도 가능 */}
        <Modals.Content>
          <Modal types="error">내 프로필을 먼저 등록해주세요.</Modal>
        </Modals.Content>
      </Modals.Root>

      <Modals.Root>
        <Modals.Trigger>체크버튼</Modals.Trigger>
        <Modals.Content>
          <Modal types="check">비밀번호가 일치하지 않습니다.</Modal>
        </Modals.Content>
      </Modals.Root>

      <Modals.Root>
        <Modals.Trigger>선택버튼1</Modals.Trigger>
        <Modals.Content>
          <Modal types="select" buttonType="user" buttonClick={handleClick}>
            신청을 취소하시겠어요?
          </Modal>
        </Modals.Content>
      </Modals.Root>

      <Modals.Root>
        <Modals.Trigger>선택버튼2</Modals.Trigger>
        <Modals.Content>
          <Modal types="select" buttonType="ceo" buttonClick={handleClick}>
            신청을 승인하시겠어요?
          </Modal>
        </Modals.Content>
      </Modals.Root>
    </div>
  );
}

export default Naeun;
