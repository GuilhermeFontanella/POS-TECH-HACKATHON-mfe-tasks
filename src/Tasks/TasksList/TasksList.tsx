import * as classes from './TasksList.css';
import { useEffect, useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Button, Col, Row, message  } from 'antd';
import { useDevice } from '../../hooks/useDevice';
import ColumnsContent from './columnsContent/ColumnsContent';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import CustomModal from '../../components/customModal/CustomModal';
import TaskDetails from './taskDetails/TaskDetails';
import TaskFinish from './taskFinish/TaskFinish';
import TaskPause from './taskPause/TaskPause';
import { PlusOutlined } from '@ant-design/icons';

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
        estimatedTime: 5, // em milissegundos
        deadline: '10/03/2026 - 23:59:59',
        completed: true
      },
    ],
    deadline: '10/03/2026 - 23:59:59',
    completed: true,
    dateCompletation: null,
    dateCreation: '09/03/2026 - 23:00:00',
    status: 'doing' // 'new' || 'doing' || 'done' e então preencher as listas.
  }
];

type ModalType = "new" | "details" | "finish" | "pause" | "completed" | null;

const SettingsList = () => {
  const { isMobile } = useDevice();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [cardSelected, setCardSelected] = useState<any | null>(null);
  const [api, contextHolder] = message.useMessage();
  const doneItems: any[] = [];
  const doingItems: any[] = [];
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, { group: "todoList" });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, { group: "todoList" });
  const [doingList, doing] = useDragAndDrop<HTMLUListElement, string>(doingItems, { group: "todoList" });

  const findRelatedTaskSelected = (taskId: number) => {
    const tasks = [...todoItems, ...doingItems, ... doingItems];
    const taksRelated = tasks.find(e => e.id === taskId);
    return taksRelated;
  }
  
  const openNotification = () => {
    api.open({
      type: 'success',
      content: 'Alterações salvas'
    })
  }

  useLockBodyScroll({
    isLocked: !!modalType,
    enabled: isMobile
  });

  useEffect(() => {
    if (cardSelected) {
      console.log(cardSelected);
      console.log(doneItems)
    }
  }, [cardSelected])

  const handleModalType = () => {
    switch (modalType) {
      case "details":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            data={findRelatedTaskSelected(cardSelected)}
            onFormChange={() => {
              //executa a chamada a api, dependendo do resultado exibe a notificação
              // mock
              openNotification();
            }} 
            />
        );
      case "new":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            data={null}
            onFormChange={() => {
              //executa a chamada a api, dependendo do resultado exibe a notificação
              // mock
              openNotification();
            }}
            onSave={() => setModalType(null)} 
            />
        );
      case "finish":
        return (
          <TaskFinish
            isMobile={isMobile}
            data={findRelatedTaskSelected(cardSelected)}
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
        return <TaskPause data={cardSelected} onRestart={() => {}} onFinish={() => {}} onPause={() => {}} />;
      case "completed":
        return (
          <TaskDetails
            isMobile={isMobile}
            data={findRelatedTaskSelected(cardSelected)}
            isFinished={findRelatedTaskSelected(cardSelected)?.completed}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
        {!isMobile ? (
          <div style={{display: 'flex', justifyContent: 'end', maxWidth: '1200px', margin: 'auto', paddingTop: '24px', paddingBottom: '24px'}}>
            <Button onClick={() => {setModalType('new'); setCardSelected(null)}} className={classes.actionButton} shape="default" type='primary' icon={<PlusOutlined />}>
              <span className={classes.actionText}>Nova tarefa</span>
            </Button>
          </div>
        ): (
          <div style={{ marginTop: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'start'}}>
            <Button onClick={() => {setModalType('new'); setCardSelected(null)}} shape="default" type='primary' icon={<PlusOutlined />}>Nova tarefa</Button>
          </div>
        )}
        </Col>
      </Row>
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
          onModalOpen={() => setModalType('details')}
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
          onModalOpen={() => setModalType('details')}
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
          onModalOpen={() => setModalType('completed')}
          columnIndex={2}
          onDetailsTask={() => setModalType('completed')}
          onSelectTask={setCardSelected}
          />
        </Col>
      </Row>
      <CustomModal 
      content={handleModalType()}
      isModalOpen={!!modalType}
      handleOk={() => setModalType(null)}
      handleCancel={() => setModalType(null)}
      isMobile={isMobile}
      data={cardSelected} />
    </>
  );
}

export default SettingsList;
