import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

import {useScrollY} from "../../hooks/useScrollY";

import styles from "./Up.module.css";

import {ButtonIcon} from "..";

export const Up = (): JSX.Element => {

    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({opacity: y / document.body.scrollHeight});
    }, [y, controls]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <motion.div
            className={styles.up}
            animate={controls}
            initial={{opacity: 0}}
        >
            <ButtonIcon appearance="primary" icon="up" arial-labelledby="Вверх" onClick={scrollToTop}/>
        </motion.div>
    );
};
