import cn from "classnames";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {ReviewProps} from "./Review.props";
import {Rating} from "..";
import styles from "./Review.module.css";
import UserIcon from './user_default_logo.svg';

export const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
    const {name, title, description, createdAt, rating} = review;

    return (
        <div className={cn(styles.review, className)}
             {...props}
        >
            <UserIcon className={styles.userLogo}/>
            <div className={styles.title}>
                <span className={styles.userName}>{name}:</span>&nbsp;&nbsp;
                <span>{title}</span>
            </div>
            <div className={styles.date}>
                {format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}
            </div>
            <div className={styles.rating}>
                <Rating rating={rating}/>
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    );
};
