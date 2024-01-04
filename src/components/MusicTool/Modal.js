import {
    useState,
    useEffect,
    useCallback,
    useImperativeHandle,
    forwardRef,
} from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const modalElement = document.getElementById("modal-root");

function Modal({ children, fade = false, defaultOpened = false }, ref) {
    const [isOpen, setIsOpen] = useState(defaultOpened);
    const close = useCallback(() => setIsOpen(false), []);

    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }),
        // eslint-disable-next-line
        []
    );

    const handleEscape = useCallback(
        (event) => {
            if (event.keyCode === 27) close();
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) document.addEventListener("keydown", handleEscape, false);
        return () => {
            document.removeEventListener("keydown", handleEscape, false);
        };
    }, [handleEscape, isOpen]);

    return createPortal(
        isOpen ? (
            <div className={`modal ${fade ? "modal-fade" : ""}`}>
                <div className="modal-overlay" onClick={close} />
                <span
                    role="button"
                    className="modal-close"
                    aria-label="close"
                    onClick={close}
                >
                    x
                </span>
                <div className="modal-body">{children}</div>
            </div>
        ) : null,
        modalElement
    );
}

export default forwardRef(Modal);
