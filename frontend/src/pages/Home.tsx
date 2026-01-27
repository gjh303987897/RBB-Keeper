import { useTranslation } from 'react-i18next'
import React from 'react';
import { Card, Space } from 'antd';
import './Home.css';
import CRTables from '../component/ComputationResultsTable';
import FolderPicker, { TaskCfg } from '../component/TaskSetting';

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>
  taskCfg: TaskCfg
  setTaskCfg: React.Dispatch<React.SetStateAction<TaskCfg>>
}
const slideVariants = {
  initial: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },     // 向左滑出
  enter: { x: 300, opacity: 0 },     // 从右进来
  animate: { x: 0, opacity: 1 }
}
    

const Home: React.FC<Props> = ({ darkMode, setDarkMode, taskCfg, setTaskCfg }) => {
    const { t } = useTranslation()

    const [step, setStep] = React.useState<'config'|'running'>('config')

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {step === 'config' && (
              <motion.div
                key="config"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/* <div
                  onClick={() => setStep('running')}
                >page 1</div> */}
                <FolderPicker taskCfg={taskCfg} setTaskCfg={setTaskCfg} setStep={setStep} />
              </motion.div>
            )}

            {step === 'running' && (
              <motion.div
                key="running"
                variants={slideVariants}
                initial="enter"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div>page 2</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    )
}

export default Home