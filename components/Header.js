import React from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'
import { Row, Col, Menu } from 'antd';
import {HomeOutlined, FileTextOutlined, SmileOutlined} from '@ant-design/icons';
import { debounce } from 'lodash';

const Header = () => {
    
//跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return(
        <div className="header">
        <Row type='flex' justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={10}>
                <span className="header-logo">张垒</span>
                <span className="header-txt">专注于前端开发。</span>
            </Col>

            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal" onClick={debounce(handleClick,300)}>
                    <Menu.Item key="0">
                    <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key="1">
                    <FileTextOutlined />
                        文章列表
                    </Menu.Item>
                    <Menu.Item key="2">
                    <SmileOutlined />
                        快乐生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
    )
}

export default Header