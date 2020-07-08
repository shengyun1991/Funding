import React from "react";
import {Card,Image,List,Progress} from "semantic-ui-react";

const src='/images/daniel.jpg'
const CardList =(props)=> {
    let details = props.details
    let onCardClick = props.onCardClick
    let cards = details.map(detail=>{
        return <CardFunding  key={detail.fundingAddress} detail1={detail} onCardClick={onCardClick}/>
    })
    return (
        <Card.Group itemsPerRow={4}>
            {cards}
        </Card.Group>

    )

}


const CardFunding = (props) => {

    let detail2 = props.detail1
    let onCardClick = props.onCardClick
    // console.log('detail2:', detail2)
    let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = detail2

    let percent = parseFloat(balance) / parseFloat(targetMoney) * 100


    return (
        <Card onClick={() => onCardClick && onCardClick(detail2)}>
            <Image src='/images/daniel.jpg'/>
            <Card.Content>
                <Card.Header>{projectName}</Card.Header>
                <Card.Meta>
                    <span className='date'>剩余时间:{leftTime}</span>
                    <Progress percent={percent} progress size='small'/>
                </Card.Meta>
                <Card.Description>用过的都说好!</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                    <List.Item>
                        <List.Content>
                            <List.Header>已筹</List.Header>
                            {balance} wei
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>已达</List.Header>
                            {percent}%
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>参与人数</List.Header>
                            {investorCount}
                        </List.Content>
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    )
}
export default CardList