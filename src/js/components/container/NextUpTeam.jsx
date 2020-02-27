import React, { Component } from 'react'

class NextUpTeam extends Component {
  render () {
    const tableName = this.props.table.tableName
    const team = this.props.team
    return <div className='column' style={{ width: `${100 / this.props.columns}%` }}>
      <div className='ui raised segment'>
        <div className='ui grid'>
          <div className='five wide column'>
            <div className='ui large header'>
              <div className='sub header'>{tableName}</div>
              <div>#{team.number}</div>
            </div>
          </div>
          <div className='eleven wide column'>
            <div className='ui large team-name header'>
              {team.name}
              <div className='sub header'>{team.affiliation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default NextUpTeam
