import styled from "styled-components";
import RModal from "react-modal";
import { fadeOutDown, fadeInUp } from "../../styles/animations";

RModal.setAppElement('#__next')

function ReactModalAdapter({ className, ...props }) {
    const contentClassName = `${className}__content`;
    const overlayClassName = `${className}__overlay`;
    return (
        <RModal
            portalClassName={className}
            className={contentClassName}
            overlayClassName={overlayClassName}
            closeTimeoutMS={300}
            {...props}
        />
    );
}

const Modal = styled(ReactModalAdapter)`
    &__overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
    }

    &__content {
        position: absolute;
        left: 0;
        right: 0;
        border: none;
        background: #fff;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 0;
        outline: none;
        padding: 20px;
        background-color: ${props => props.theme.colors.background};
        text-align: center;

        button {
            float: left;
            font-size: 17px;
            padding: 0;
            -webkit-appearance: none;
            margin: 0;
            background-color: transparent;
            border: none;
        }

        p {
            color: rgba(0, 0, 0, 0.7);
            line-height: 22px;
        }
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        &__content {
            margin: auto auto;
            width: 420px;
            border-radius: 24px;
            height: auto;
        }
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        &__content {
            top: 0;
            bottom: 0;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        .ReactModal__Overlay--after-open {
            animation: 300ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
        }

        .ReactModal__Overlay--before-close {
            animation: 300ms ${fadeOutDown} cubic-bezier(0.19, 1, 0.22, 1);
        }
    }
`;

export default Modal;
