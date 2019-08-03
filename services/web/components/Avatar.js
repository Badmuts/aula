import styled from 'styled-components'
import AvatarStack from './AvatarStack'

const Avatar = styled.img`
    border-radius: 26px;
    height: 26px;
    width: 26px;
    border: 2px solid white;

    ${AvatarStack} & {
        float: right;
        margin-right: -10px;
    }
`

export default Avatar
