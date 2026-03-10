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
import type { Task } from '../../types/task.interface';
import { useRegisterNewTask } from '../../hooks/useRegisterNewTask';
import { useGetTaskList } from '../../hooks/useGetTaksList';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { serverTimestamp } from 'firebase/firestore';
import { usePreferences } from '../../hooks/usePreferences';

type ModalType = "new" | "details" | "finish" | "pause" | "completed" | null;

const SettingsList = () => {
  const { preferences } = usePreferences();
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
      const valueDragged = data.draggedNode.data.value as Task;
      handleDragCard(valueDragged);
    },
  });
  const [doingList, doing, setDoing] = useDragAndDrop<HTMLUListElement, Task>([], { 
    group: "tasks",
    onDragend(data) {
      const valueDragged = data.draggedNode.data.value as Task;
      handleDragCard(valueDragged);
    },
  });
  const [doneList, dones, setDones] = useDragAndDrop<HTMLUListElement, Task>([], { 
    group: "tasks",
    onDragend(data) {
      const valueDragged = data.draggedNode.data.value as Task;
      handleDragCard(valueDragged);
    },
  });

  const findRelatedTaskSelected = (taskId: any) => {
    const all = [...todos, ...doing, ...dones];
    return all.find(e => e.id === taskId) ?? null;
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
  
  const handleTaskStatusChange = async (taskId: string, newStatus: 'new' | 'doing' | 'done') => {
    const payLoad: any = {
      status: newStatus
    };

    if (newStatus === 'doing') {
      payLoad.startedAt = serverTimestamp();
      payLoad.finishedAt = null;
    }
    if (newStatus === 'done') {
      payLoad.finishedAt = serverTimestamp();
    }
    if (newStatus === 'new') {
      payLoad.startedAt = null;
      payLoad.finishedAt = null;
    }
    
    await update(taskId, payLoad);
  };

  const handleModalType = () => {
    switch (modalType) {
      case "details":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            taskId={cardSelected}
            preferences={preferences}
            />
        );
      case "new":
        return (
           <TaskDetails 
            isMobile={isMobile} 
            taskId={null}
            onSave={(value) => handleSaveTask(value)} 
            preferences={preferences}
            />
        );
      case "finish":
        return (
          <TaskFinish
            isMobile={isMobile}
            data={findRelatedTaskSelected(cardSelected)}
            onFinishTask={() => {
              handleTaskStatusChange(findRelatedTaskSelected(cardSelected)?.id, 'done')
              setModalType(null);
            }}
            preferences={preferences}
          />
        );
      case "pause":      
        return <TaskPause 
        data={cardSelected} 
        onRestart={() => {}} 
        onFinish={() => {
          handleTaskStatusChange(findRelatedTaskSelected(cardSelected)?.id, 'done')
          setModalType(null);
        }}
        onPause={() => {}}
        preferences={preferences} />;
      case "completed":
        return (
          <TaskDetails
            isMobile={isMobile}
            taskId={cardSelected}
            preferences={preferences}
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

  const handleDragCard = (value: Task) => {
    if (todos.includes(value)) {
      handleTaskStatusChange(value.id, 'new');
    } else if (doing.includes(value)) {
      handleTaskStatusChange(value.id, 'doing')
    } else if (dones.includes(value)) {
      handleTaskStatusChange(value.id, 'done');
    }
  }

  useEffect(() => {
    console.log(preferences)
  }, [preferences])

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
        {!isMobile ? (
          <div style={{display: 'flex', justifyContent: 'end', maxWidth: '1200px', margin: 'auto', paddingTop: '24px', paddingBottom: '24px'}}>
            <Button onClick={() => {setModalType('new'); setCardSelected(null)}} className={classes.actionButton} shape="default" type='primary' icon={<PlusOutlined />}>
              {preferences.complexityLevel != 1 && (<span className={classes.actionText}>Nova tarefa</span>)}
            </Button>
          </div>
        ): (
          <div style={{ marginTop: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'start'}}>
            <Button 
            onClick={() => {setModalType('new'); setCardSelected(null)}} 
            shape="default" 
            type='primary' icon={<PlusOutlined size={preferences.fontSize} />}>
              {preferences.complexityLevel != 1 && (<span style={{fontSize: preferences.fontSize}}>Nova tarefa</span>)}
            </Button>
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
          onStart={(taskId) => handleTaskStatusChange(taskId, 'doing')}
          preferences={preferences}
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
          preferences={preferences}
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
          preferences={preferences}
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
