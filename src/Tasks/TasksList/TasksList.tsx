import * as classes from './TasksList.css';
import { useEffect, useMemo, useState } from 'react';
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
import type { Task } from '../../types/task.interface';
import { useRegisterNewTask } from '../../hooks/useRegisterNewTask';
import { useGetTaskList } from '../../hooks/useGetTaksList';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useTask } from '../../hooks/useTask';

// const todoItems: any[] = [
//   {
//     id: 1,
//     title: 'Titulo',
//     summary: 'Resumo da tarefa',
//     description: 'Descrição mais longa',
//     estimatedTime: 10,
//     tasks: [
//       { 
//         id: 1,
//         title: 'titulo da tarefa',
//         summary: 'resumo da tarefa secundaria',
//         estimatedTime: 5, // em milissegundos
//         deadline: '10/03/2026 - 23:59:59',
//         completed: true
//       },
//     ],
//     deadline: '10/03/2026 - 23:59:59',
//     completed: true,
//     dateCompletation: null,
//     dateCreation: '09/03/2026 - 23:00:00',
//     status: 'doing' // 'new' || 'doing' || 'done' e então preencher as listas.
//   }
// ];

type ModalType = "new" | "details" | "finish" | "pause" | "completed" | null;

const SettingsList = () => {
  //const { task, taskById } = useTask();
  const { data: tasks } = useGetTaskList();
  const { update } = useUpdateTask();
  const { mutateAsync } = useRegisterNewTask();
  const { isMobile } = useDevice();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [cardSelected, setCardSelected] = useState<any | null>(null);
  const [api, contextHolder] = message.useMessage();
  const [todoList, todos, setTodos] = useDragAndDrop<HTMLUListElement, Task>([], { 
    group: "tasks",
    onDragend(data) {
        console.log(todos)
    },
  });
  const [doingList, doing, setDoing] = useDragAndDrop<HTMLUListElement, Task>([], { 
    group: "tasks",
    onDragend(data) {
        console.log(doing)
    }
  });
  const [doneList, dones, setDones] = useDragAndDrop<HTMLUListElement, Task>([], { group: "tasks" });

  const findRelatedTaskSelected = (taskId: any) => {
    const all = [...todos, ...doing, ...dones];
    return all.find(e => e.id === taskId);
  };
  
  const openNotification = (type: 'error' | 'success', message: string) => {
    api.open({
      type: type,
      content: message
    })
  }

  useLockBodyScroll({
    isLocked: !!modalType,
    enabled: isMobile
  });

  useEffect(() => {
    if (!tasks) return;

    const todo = tasks.filter(t => t.status === "new");
    const doing = tasks.filter(t => t.status === "doing");
    const done = tasks.filter(t => t.status === "done");

    setTodos(todo);
    setDoing(doing);
    setDones(done);

  }, [tasks]);

  const handleTaskChange = async (taskId: string, data: Task) => {
    try {
      await update(taskId, data);
      openNotification('success', 'Alterações salvas');
    } catch (error) {
      openNotification('error', 'Ocorreu um erro ao salvar as informações.');
      console.error(error);
      throw error;
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: 'new' | 'doing' | 'done') => {
    await update(taskId, {
      status: newStatus
    });
  };


  const handleModalType = () => {
    switch (modalType) {
      case "details":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            data={findRelatedTaskSelected(cardSelected)}
            onFormChange={(value) => {
              handleTaskChange(cardSelected.id, value)
            }} 
            />
        );
      case "new":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            data={null}
            onSave={(value) => handleSaveTask(value)} 
            />
        );
      case "finish":
        return (
          <TaskFinish
            isMobile={isMobile}
            data={findRelatedTaskSelected(cardSelected)}
            onFinishTask={() => {
              handleTaskStatusChange(cardSelected?.id, 'done')
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

  const handleSaveTask = async (value: Task) => {
    try{
      await mutateAsync(value);
      openNotification('success', 'Tarefa cadastrada com sucesso');
      setModalType(null);
    } catch (error: any) {
      openNotification('error', 'Ocorreu um erro ao cadastrar a tarefa.');
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    console.log(cardSelected);
  }, [cardSelected])

  // useEffect(() => {
  //   if (!tasks) return;

  //   const todo: Task[] = [];
  //   const doing: Task[] = [];
  //   const done: Task[] = [];

  //   tasks.forEach((task) => {
  //     if (task.status === "new") todo.push(task);
  //     else if (task.status === "doing") doing.push(task);
  //     else if (task.status === "done") done.push(task);
  //   });

  //   setTodoItems(todo);
  //   setDoingItems(doing);
  //   setDoneItems(done);

  // }, [tasks]);

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
        style={{overflowX: isMobile ? 'auto' : 'visible', minHeight: '80vh'}}>
        <Col flex={isMobile ? '280px' : undefined} span={8}>
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
        <Col flex={isMobile ? '280px' : undefined} span={8}>
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
        <Col flex={isMobile ? '280px' : undefined} span={8}>
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
