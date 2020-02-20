import React, { Component } from 'react'

class NextUpTeam extends Component {
  render () {
    const tableName = this.props.table.tableName
    const team = this.props.team
    return <div className='column' style={{ width: `${100 / this.props.columns}%` }}>
      <div className='ui raised segment'>
        <div className='ui grid'>
          <div className='ui three wide column table-name'>
            <div className='ui header'>{tableName}</div>
          </div>
          <div className='ui five wide column team-number'>
            <div className='ui statistic'>
              <div className='value'>
                #{team.number}
              </div>
            </div>
          </div>
          <div className='eight wide column'>
            <div className='ui grid'>
              <div className='row team-name'>
                <div className='ui header'>{team.name}</div>
              </div>
              <div className='row team-affiliation'>
                <div className='ui header'>{team.affiliation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default NextUpTeam
