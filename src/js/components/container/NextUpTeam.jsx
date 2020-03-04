import React, { Component } from 'react'
import { Textfit } from 'react-textfit'

class NextUpTeam extends Component {
  render () {
    const tableName = this.props.table.tableName
    const team = this.props.team
    return <div className='column' style={{ width: `${100 / this.props.columns}%` }}>
      <div className='ui raised segment'>
        <div className='ui grid'>
          <div className='four wide column'>
            <Textfit className='ui header' mode='single' max='70' forceSingleModeWidth={false}>
              <div className='sub header'>{tableName}</div>
              #{team.number}
            </Textfit>
          </div>
          <div className='twelve wide column'>
            <Textfit className='ui header' mode='single' max='70' forceSingleModeWidth={false}>
              {team.name}
              <div className='sub header'>{team.affiliation}</div>
            </Textfit>
          </div>
        </div>
      </div>
    </div>
  }
}

export default NextUpTeam
