import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const useTask = () => {
  return useContext(TaskContext);
}   

export default useTask;