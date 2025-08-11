// src/components/Alert.jsx
import React, { useEffect } from 'react';

function Alert({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

const colors = {
    success: {
        background: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
    },
    error: {
        background: '#673ab7', // deep purple
        color: 'white',
        border: '1px solid #f5c6cb',
    },
    info: {
        background: '#d1ecf1',
        color: '#0c5460',
        border: '1px solid #bee5eb',
    }
};

  const style = {
    marginTop: '5px',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    width: 'fit-content',
    ...colors[type],
  };

  return <div style={style}>{message}</div>;
}

export default Alert;
