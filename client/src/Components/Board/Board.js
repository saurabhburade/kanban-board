import React from 'react'
import "./board.css"
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from './../../Redux/board/board.actionCreators';
function Board(props) {
    useEffect(() => {
        
        console.log("props",props)
        const {id}=props.match.params
        props.fetchBoard(id)
    }, [])
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}
const mapStateToProps = state => ({
});

const mapDispatchToProps =dispatch=> {
  return { fetchBoard: data => dispatch(fetchBoard(data))}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
