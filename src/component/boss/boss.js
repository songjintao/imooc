import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
 
class Boss extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/useer/list?type=genius')
        .then(res=> {
            if(res.data.code === 200) {
                this.setState({data: res.data.data})
            }
        })
        .catch(err=> {
            throw err
        })
    }
    
    render() {
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.state.data.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(v=> (
                                <div key={v}>{v}</div>
                            ))}
                        </Card.Body>
                    </Card>) : null
                ))}
            </WingBlank>
        )
    }
}

export default Boss