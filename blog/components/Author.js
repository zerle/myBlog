
import {Avatar,Divider, Tooltip} from 'antd'
import '../static/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://www.jslei.cn/zhanglei.jpg" /></div>
            <div className="author-introduction">
                <div className="author-name">张垒</div>
                专注于WEB前端开发。
                <Divider>社交账号</Divider>
                <a href="https://github.com/zerle" target="_blank">
                    <Tooltip title="https://github.com/zerle" placement="top">
                        <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                    </Tooltip>
                </a>
                <Tooltip title="QQ:1163494244" placement="top">
                    <Avatar size={28} icon={<QqOutlined />}  className="account" />
                </Tooltip>
                <Tooltip title="wechat:zl1179994812" placement="top">
                    <Avatar size={28} icon={<WechatOutlined />}  className="account"  />
                </Tooltip>
            </div>
        </div>
    )

}

export default Author