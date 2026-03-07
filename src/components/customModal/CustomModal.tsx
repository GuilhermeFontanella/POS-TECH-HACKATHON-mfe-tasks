import { Modal } from 'antd';
import { useEffect } from 'react';

interface CustomModalProps {
    content: React.ReactNode;
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    isMobile: boolean;
    data: any; // TODO TIPAR DADOS DA TASK
}

const CustomModal = ({ 
    content,
    isModalOpen,  
    handleOk, 
    handleCancel, 
    isMobile,
    data 
}: CustomModalProps) => {

  useEffect(() => {
    console.log(data)
  }, [isModalOpen])

    return (
        <Modal
        width={isMobile ? '100%' : 600}
        centered={!isMobile}
        footer={null}
        style={isMobile ? { top: 0, padding: 0 } : undefined}
        title={data?.title }
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    );
}

export default CustomModal;