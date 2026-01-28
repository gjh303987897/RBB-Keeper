import React, { useState } from 'react'
import { Button, List, Typography, message, Skeleton, Col, Row, Select, SelectProps, Switch } from 'antd'
import { FolderOpenOutlined, DeleteOutlined, CheckCircleFilled } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import './TaskSetting.css'
import { PickFold, TaskConfigToFrontInterface } from '../../wailsjs/go/main/App'
import { useTranslation } from 'react-i18next'
import { backend, model } from '../../wailsjs/go/models'

const { Title,Text } = Typography

const PAGE_SIZE = 5

export type FileComputationType =
  | 'disable'
  | 'hybr'
  | 'size'
  | 'blake3'
export type PicComputationType =
  | 'disable'
  | 'phash'
  | 'vit'
  | 'resnet'
export interface FileCfg {
  method: FileComputationType
}
export interface PicCfg {
  method: PicComputationType
}
export interface PathCfg {
  path: string
  recursion: boolean
}
export interface TaskCfg {
  fileCfg: FileCfg
  picCfg: PicCfg
  pathCfgs: PathCfg[]
}
interface Props {
  taskCfg: TaskCfg
  setTaskCfg: React.Dispatch<React.SetStateAction<TaskCfg>>
  setStep: React.Dispatch<React.SetStateAction<'config' | 'running'>>
}
const FolderPicker: React.FC<Props> = ({ taskCfg, setTaskCfg, setStep }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { t, i18n } = useTranslation()
  const handlePickFolder = async () => {
    try {
      const path = await PickFold()
      if (!path) return
      setTaskCfg((prev) => {
        const exists = prev.pathCfgs.some(
          (p) => p.path === path
        )
        if (exists) {
          message.warning(t('taskSetting.setTaskFolderWarningMessage'))
          return prev
        }

        return {
          ...prev,
          pathCfgs: [
            ...prev.pathCfgs,
            {
              path,
              recursion: true,
            },
          ],
        }
      })
    } catch (err) {
      message.error(t('taskSetting.setTaskFolderErrMessage'))
    }
  }

  const dataVaild = (): boolean => {
    if (taskCfg.pathCfgs.length === 0) {
      message.error(t('taskSetting.taskSubmitNoPathErrMessage'))
      return false
    }
    if (taskCfg.fileCfg.method === 'disable' && taskCfg.picCfg.method === 'disable') {
      message.error(t('taskSetting.taskSubmitNoMethodErrMessage'))
      return false
    }
    return true
  }

  async function dataSubmit(): Promise<boolean> {
    try {
      const newConfig = model.TaskCfgFrontInterface.createFrom({
        fileCfg: taskCfg.fileCfg,
        picCfg: taskCfg.picCfg,
        pathCfgs: taskCfg.pathCfgs,
      })
      await TaskConfigToFrontInterface(newConfig)
    }catch (error) {
      message.error(t('taskSetting.submitTaskErrMessage'))
      return false
    }
    return true
  }

  const loadMore = () => {
    setVisibleCount((prev) =>
      prev + PAGE_SIZE > taskCfg.pathCfgs.length
        ? taskCfg.pathCfgs.length
        : prev + PAGE_SIZE
    )
  }
  const fileComputationOptions: SelectProps<FileComputationType>['options'] = [
    { value: 'disable', label: t('taskSetting.taskMethodOptionDisable') },
    { value: 'hybr', label: 'Hybrid' },
    { value: 'size', label: 'File Size' },
    { value: 'blake3', label: 'Blake3' },
  ]
  const photoComputationOptions: SelectProps<PicComputationType>['options'] = [
    { value: 'disable', label: t('taskSetting.taskMethodOptionDisable') },
    { value: 'phash', label: 'pHash' },
    { value: 'vit', label: 'ViT' },
    { value: 'resnet', label: 'ResNet' },
  ]
  return (
    <div className='page'>
      <div className='header'>
        <Row>
          <Col span={8}>
            <Title level={3} style={{ margin: 0 }}>{t('taskSetting.pageTitle')}</Title>
            <Button onClick={() => {setStep('running')}}>DEV BUTTON</Button> {/*Dev Only Delete when release*/}
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Select
              style={{ width: '120px',marginRight: '10px' }}
              value={taskCfg.fileCfg.method}
              options={fileComputationOptions}
              placeholder="i18n"
              onChange={(newValue:FileComputationType) => {
                setTaskCfg((prev) => ({
                  ...prev,
                  fileCfg: {
                    method: newValue
                  }
                }))
              }}
            />
            <Select
              style={{ width: '120px',marginRight: '10px' }}
              value={taskCfg.picCfg.method}
              options={photoComputationOptions}
              placeholder="i18n"
              onChange={(newValue:PicComputationType) => {
                setTaskCfg((prev) => ({
                  ...prev,
                  picCfg: {
                    method: newValue
                  }
                }))
              }}
            />
            <Button
              icon={<FolderOpenOutlined />}
              onClick={handlePickFolder}
              variant="outlined"
              color='cyan'
              style={{ width: '120px', marginRight: '10px' }}
            >
              {t('taskSetting.pathAddButton')}
            </Button>
          
            <Button
              icon={<CheckCircleFilled />}
              type='primary'
              style={{ width: '120px' }}
              onClick={async ()=>{
                if(dataVaild()){
                  if (await dataSubmit()){
                    message.success(t('taskSetting.submitTaskSuccessMessage'))
                    setTaskCfg({
                      fileCfg: { method: 'disable' },
                      picCfg: { method: 'disable' },
                      pathCfgs: []
                    })
                    setStep('running')
                  }
                }
              }}
            >
              {t('taskSetting.submitTaskButton')}
            </Button>
          </Col>
        </Row>
        
      </div>
      
      <div className='content'>
      <div
        className='scroll'
        id="scrollableDiv"
        style={{
          overflow: 'auto',
          border: '1px solid #727272',
          borderRadius: 12,
        }}
      >
        <InfiniteScroll
          dataLength={Math.min(visibleCount, taskCfg.pathCfgs.length)}
          next={loadMore}
          hasMore={visibleCount < taskCfg.pathCfgs.length}
          loader={<Skeleton active paragraph={{ rows: 1 }} />}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={taskCfg.pathCfgs.slice(0, visibleCount)}
            locale={{ emptyText: t('taskSetting.pathListEmptyText') }}
            renderItem={(item:PathCfg) => (
              <List.Item
                actions={[
                  <span>
                    <Text style={{marginRight:'8px'}}>{t('taskSetting.pathTableColumnRecursion')}</Text>
                    <Switch defaultChecked size='small' value={item.recursion} onChange={(checked:boolean)=>{
                      setTaskCfg((prevCfg) => ({
                        ...prevCfg,
                        pathCfgs: prevCfg.pathCfgs.map((p) =>
                          p.path === item.path ? { ...p, recursion: checked } : p
                        ),
                      }))
                    }} 
                    />
                  </span>,
                  
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setTaskCfg((prev) =>({
                        ...prev,
                        pathCfgs: prev.pathCfgs.filter((p) => p.path !== item.path)
                      }))
                    }}
                  />,
                ]}
              >
                <Text ellipsis title={item.path}>
                  {item.path}
                </Text>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      </div>
    </div>
  )
}

export default FolderPicker
