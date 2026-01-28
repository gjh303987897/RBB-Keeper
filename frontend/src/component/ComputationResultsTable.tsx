import React, { useState } from 'react'
import { Badge, Button, Col, Flex, Row, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './ComputationResultsTable.css';
import { useTranslation } from 'react-i18next'
import "./TaskSetting.css"
import Title from 'antd/lib/typography/Title';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value) => <a>{value}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <Flex gap="small" align="center" wrap>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '9',
    name: '6',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

interface Props {
  setStep: React.Dispatch<React.SetStateAction<'config' | 'running'>>
}

const CRTables: React.FC<Props> = ({setStep}) => {
  const { t } = useTranslation()
  const [taskStatus,setTaskStatus] = useState<'default'|'processing'|'success'>('default')
  return(
    <div className='page'>
      <div className='header'>
        <Row>
          <Col span={8}>
            <Title level={3} style={{ margin: 0 }}>{t('ComputationResultTable.pageTitle')}</Title>
          </Col>
          <Col span={16} style={{textAlign:'right'}}>
            <Badge style={{width: '120px',marginRight:'10px'}} status={taskStatus} text={t(`ComputationResultTable.${taskStatus}`)}/>
            <Button
              type='primary'
              style={{ width: '120px', marginRight: '10px' }}
              onClick={()=>{setStep('config')}}
            >
              {t('ComputationResultTable.backToTaskConfig')}
            </Button>
          </Col>
        </Row>
      </div>
      <div className='content'>
        <div className='scroll'
          style={{
            overflow: 'auto',
            border: '1px solid #727272',
            borderRadius: 12,
          }}
        >
          <Table<DataType> 
            columns={columns} 
            dataSource={data}
            pagination={false}
            id='ResultTable'
          />
        </div>
      </div>
    </div>
        
    ) 
}
export default CRTables;