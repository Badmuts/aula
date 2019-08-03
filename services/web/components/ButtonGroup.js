import styled from 'styled-components'
import Button from './Button'

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;

    & ${Button} {
        border-radius: 10px;
        margin-bottom: 10px;
    }
`

export default ButtonGroup
