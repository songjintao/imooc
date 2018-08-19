import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect} from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
// const socket = io('ws://localhost:9093')


@connect(
    state=> state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({ text: '' })
    }

    componentDidMount() {
        if(! this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [this.state.msg, data.text]
        //     })
        // })
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}))
                                        
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if(!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=> v.chatid === chatid)
        return (
            // <h2>chat with user:{this.props.match.params.user}</h2>
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={()=> {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(v => {
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from == userid? (
                            <List key={v._id}>
                                <List.Item
                                    thumb={avatar}
                                >
                                    对方：{v.content}
                                </List.Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <List.Item 
                                    className='chat-me'
                                    extra={<img src={avatar} alt='' />}
                                >
                                    我：{v.content}
                                </List.Item>
                            </List>
                        )
                        // return <p key={v._id}>{v.content}</p>
                    })
                }
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                    <Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                    />
                </div>
            </div>
        )
    }

}

export default Chat