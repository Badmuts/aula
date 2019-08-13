import styled from 'styled-components'
import AvatarStack from './AvatarStack'
import Gravatar from 'react-gravatar'

const Avatar = styled(Gravatar)`
    border-radius: 50%;
    height: ${({ size = 26 }) => `${size}px`};
    width:  ${({ size = 26 }) => `${size}px`};
    border: 2px solid white;
    box-sizing: border-box;

    ${AvatarStack} & {
        float: right;
        margin-right: -10px;
    }
`

export default Avatar
