import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";

import styles from "./Modal.module.sass";
import Icon from "../../layout/Icon";

export interface ModalProps {
  isDetail: boolean,
  visible: boolean,
  onClose: () => void
  children: any
}

const Modal = ( props: ModalProps ) => {

  const { visible, onClose } = props;
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const scrollRef: any = useRef(null);

  useEffect(() => {
    visible ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
  }, [visible]);

  return createPortal(
    visible && (
      <div className={styles.modal} ref={scrollRef}>
        <div className={cn(styles.outer, props.isDetail ? styles.detail : "")}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container)}>
              { props.children }
              <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="14" />
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    document.body
  );
};

export default Modal;
