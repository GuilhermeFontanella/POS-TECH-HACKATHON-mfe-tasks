import * as classes from './TasksList.css';
import { useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Col, Row, message  } from 'antd';
import { useDevice } from '../../hooks/useDevice';
import ColumnsContent from './columnsContent/ColumnsContent';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import CustomModal from '../../components/customModal/CustomModal';
import TaskDetails from './taskDetails/TaskDetails';
import TaskFinish from './taskFinish/TaskFinish';
import TaskPause from './taskPause/TaskPause';

const todoItems: any[] = [
  {
    id: 1,
    title: 'Titulo',
    summary: 'Resumo da tarefa',
    description: 'Descrição mais longa',
    estimatedTime: 10,
    tasks: [
      { 
        id: 1,
        title: 'titulo da tarefa',
        summary: 'resumo da tarefa secundaria',
        estimatedTime: 5,
        deadline: '10/03/2026 - 23:59:59',
        completed: true
      },
    ],
    deadline: '10/03/2026 - 23:59:59',
    completed: false,
    dateCompletation: null,
    dateCreation: '09/03/2026 - 23:00:00'
  }
];

type ModalType = "details" | "finish" | "pause" | "completed" | null;

const SettingsList = () => {
  const { isMobile } = useDevice();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState<any | null>(null);
  const [api, contextHolder] = message.useMessage();
  const doneItems: any[] = [];
  const doingItems: any[] = [];
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, { group: "todoList" });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, { group: "todoList" });
  const [doingList, doing] = useDragAndDrop<HTMLUListElement, string>(doingItems, { group: "todoList" });

  const openNotification = () => {
    api.open({
      type: 'success',
      content: 'Alterações salvas'
    })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useLockBodyScroll({
    isLocked: !!modalType,
    enabled: isMobile
  });

  const handleModalType = () => {
    switch (modalType) {
      case "details":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            data={todoItems.find(e => e.id === cardSelected)}
            onFormChange={() => {
              //executa a chamada a api, dependendo do resultado exibe a notificação
              // mock
              openNotification();
            }} 
            />
        );

      case "finish":
        return (
          <TaskFinish
            isMobile={isMobile}
            data={doingItems.find(e => e.id === cardSelected)}
            onFinishTask={() => {
              // chama a função para encerrar a task, atualizar a lista de tasks e fechar o modal.

              setModalType(null);

            }}
          />
        );

      case "pause":
        /**
         * MOVENDO O CARD PARA EM PROGRESSO
         * Ao mover o card para a coluna de progresso o contador começará a correr e chamar a api para atualizar o campo da data de inicio
         * e gravar na variavel de timer do redux para começar o contador.
         * 
         * CLICANDO EM FINISH 
         * quando o usuario clicar em finish devo chamar a api para gravar a data de finalização, e mover o card para a coluna de finalizado e fechar o modal.
         * 
         * CLICANDO EM RESTART
         * quando o usuario clicar em restart devo chamar a api para atualizar o tempo restante da tarefa, com isso a variavel gravada com o redux será atualizada. 
         * obs* O timer consome o valor da variavel armazenada no redux.
         * obs* Quando o timer chegar a zero, devo disparar uma notificação pro usuario avisando do termino da tarefa dando a opção de finalizar a 
         * tarefa ou reinicar o contador. A lógica segue a mesma.
         */        
        return <TaskPause isMobile={isMobile} onRestart={() => {}} onFinish={() => {}} onPause={() => {}} />;

      case "completed":
        return (
          <>modal finished</>
          // <TaskCompleted
          //   isMobile={isMobile}
          //   data={doneItems.find(e => e.id === cardSelected)}
          // />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {contextHolder}
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
          onModalOpen={setIsModalOpen}
          columnIndex={0}
          onDetailsTask={() => setModalType('details')}
          onSelectTask={setCardSelected}
          
          />
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <ColumnsContent
          columnTitle='Em progresso'
          isMobile={isMobile}
          ref={doingList}
          list={doing}
          onModalOpen={showModal}
          columnIndex={1}
          onFinishTask={() => setModalType('finish')}
          onPauseTask={() => setModalType('pause')}
          onDetailsTask={() => setModalType('details')}
          onSelectTask={setCardSelected}
          />
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <ColumnsContent
          columnTitle='Feito'
          isMobile={isMobile}
          ref={doneList}
          list={dones}
          onModalOpen={setIsModalOpen}
          columnIndex={2}
          onDetailsTask={() => setModalType('completed')}
          onSelectTask={setCardSelected}
          />
        </Col>
      </Row>
      <CustomModal 
      content={handleModalType()}
      isModalOpen={!!modalType}
      handleOk={handleOk}
      handleCancel={() => setModalType(null)}
      isMobile={isMobile}
      data={cardSelected} />
    </>
  );
}

export default SettingsList;
