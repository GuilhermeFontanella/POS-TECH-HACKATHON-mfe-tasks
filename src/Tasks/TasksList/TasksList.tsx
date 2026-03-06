import * as classes from './TasksList.css';
import { useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Col, Row } from 'antd';
import { useDevice } from '../../hooks/useDevice';
import ColumnsContent from './columnsContent/ColumnsContent';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import CustomModal from '../../components/customModal/CustomModal';
import TaskDetails from './taskDetails/TaskDetails';

const SettingsList = () => {
  const { isMobile } = useDevice()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const todoItems = [
    "Schedule perm",
    "Rewind VHS tapes",
    "Make change for the arcade",
    "Get disposable camera developed",
    "Learn C++",
    "Return Nintendo Power Glove",
  ];

  const doingItems: any[] = [];

  const doneItems = ["Pickup new mix-tape from Beth"];
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, { group: "todoList" });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, { group: "todoList" });
  const [doingList, doing] = useDragAndDrop<HTMLUListElement, string>(doingItems, { group: "todoList" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setIsFinishModalOpen(false);
    setIsPauseModalOpen(false);
  };

  useLockBodyScroll({
    isLocked: isModalOpen,
    enabled: isMobile
  });

  const handleModalType = () => {
    if (isDetailsModalOpen) {
      return (
        <TaskDetails isMobile={isMobile} />
      );
    }
    else if (isFinishModalOpen) {
      return (
        <>MODAL FINISH</>
      );
    }
    else if (isPauseModalOpen) {
      return (
        <>MODAL PAUSE</>
      );
      
    }
  }

  return (
    <>
      <Row
        wrap={!isMobile}
        className={classes.kanbanBoard}
        style={{overflowX: isMobile ? 'auto' : 'visible'}}>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <ColumnsContent
          columnTitle='Pendente'
          isMobile={isMobile}
          ref={todoList}
          list={todos}
          onModalOpen={showModal}
          columnIndex={0}
          onDetailsTask={setIsDetailsModalOpen}
          />
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <ColumnsContent
          columnTitle='Em progresso'
          isMobile={isMobile}
          ref={doingList}
          list={doing}
          onModalOpen={setIsModalOpen}
          columnIndex={1}
          onFinishTask={setIsFinishModalOpen}
          onPauseTask={setIsPauseModalOpen}
          onDetailsTask={setIsDetailsModalOpen}
          
          />
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <ColumnsContent
          columnTitle='Feito'
          isMobile={isMobile}
          ref={doneList}
          list={dones}
          onModalOpen={showModal}
          columnIndex={2}
          onDetailsTask={setIsDetailsModalOpen}
          />
        </Col>
      </Row>
      <CustomModal 
      content={handleModalType()}
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      isMobile={isMobile} />
    </>
  );
}

export default SettingsList;
