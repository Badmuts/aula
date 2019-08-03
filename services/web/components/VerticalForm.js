import styled from 'styled-components'
import { lighten } from 'polished'
import Input from './Input'
import Title from './Title';

const VerticalForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;

    ${Input}, input { margin-bottom: 10px; }
    ${Title} { margin-bottom: 0; }
    p { color: ${lighten(0.4, '#000')}; }
`

export default VerticalForm
