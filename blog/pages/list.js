import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {Row, Col, List, Breadcrumb, Spin } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const ArticleList = (props) =>{

    const [ mylist , setMylist ] = useState(props.data);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const goToDetail = (id) => {
        if (!id) return false
        setIsLoading(true)
        router.push({
            pathname: '/detailed',
            query: {
                id
            }
        })
    }
    useEffect(()=>{
        setMylist(props.data)
    })
    return (
        <>
        <Head>
            <title>张垒的博客 | 文章目录</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                <Spin spinning={isLoading}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                            <List.Item>
                                <div className="list-title">
                                    <a onClick={() => { goToDetail(item.id) }}>{item.title}</a>
                                </div>
                                <div className="list-icon">
                                    <span><CalendarOutlined />{item.addTime}</span>
                                    <span><FolderOutlined />{item.typeName}</span>
                                    <span><FireOutlined />{item.view_count}人</span>
                                </div>
                                <div className="list-context">{item.introduce}</div>  
                            </List.Item>
                            )}
                        />  
                    </div>
                </Spin>
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            </Col>
        </Row>
        <Footer/>
        </>
    )

} 

ArticleList.getInitialProps = async (context)=>{

    let id =context.query.id
    const promise = new Promise((resolve)=>{
      axios(servicePath.getListById+id).then(res => {
          resolve(res.data)
      })
    })
    return await promise
}

export default ArticleList
