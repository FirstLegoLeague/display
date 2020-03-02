import React, { Component } from 'react'
import { Textfit } from 'react-textfit'

// import Settings from '../../services/settings'

// const FONT_SIZES = {
//   Tiny: { SMALLER: '12xp', LARGER: '20px' },
//   Small: { SMALLER: '16px', LARGER: '24px' },
//   Medium: { SMALLER: '20px', LARGER: '28px' },
//   Large: { SMALLER: '24px', LARGER: '32px' },
//   Giant: { SMALLER: '28px', LARGER: '36px' },
//   Huge: { SMALLER: '32px', LARGER: '40px' }
// }

class NextUpTeam extends Component {
  render () {
    const tableName = this.props.table.tableName
    const team = this.props.team
    return <div className='column' style={{ width: `${100 / this.props.columns}%` }}>
      <div className='ui raised segment'>
        <div className='ui grid'>
          <div className='five wide column'>
            <Textfit className='ui header' mode='single' max='70' forceSingleModeWidth={false}>
              <div className='sub header'>{tableName}</div>
              #{team.number}
            </Textfit>
          </div>
          <div className='eleven wide column'>
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
