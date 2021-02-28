import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Row, Col, List, Spin } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/index.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'

const Home = (props) => {
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    const [mylist, setMylist] = useState(props.data)
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
    return (
        <>
            <Head>
                <title>张垒的博客 | 首页 </title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <Spin spinning={isLoading}>
                        <div>
                            <List
                                header={<div>最新日志</div>}
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="list-title">
                                            <a onClick={() => { goToDetail(item.id) }}>{item.title}</a>
                                        </div>
                                        <div className="list-icon">
                                            <span><CalendarOutlined /> {item.addTime}</span>
                                            <span><FolderOutlined />{item.typeName}</span>
                                            <span><FireOutlined />{item.view_count}</span>
                                        </div>
                                        <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
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
            <Footer />
        </>
    )
}

Home.getInitialProps = async () => {
    const promise = new Promise((resolve, reject) => {
        axios(servicePath.getArticleList).then(res => {
            resolve(res.data)
        })
    })
    return await promise
}

export default Home