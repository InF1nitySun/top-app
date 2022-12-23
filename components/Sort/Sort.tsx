import cn from "classnames";

import {SortEnum, SortProps} from "./Sort.props";

import styles from "./Sort.module.css";

import SortIcon from './sort.svg';

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {

    return (
        <div className={cn(styles.sort, className)} {...props}>
            <div className={styles.sortName} id="sort">Сортировка</div>
            <button onClick={() => setSort(SortEnum.Rating)}
                    className={cn({
                        [styles.active]: sort === SortEnum.Rating
                    })}
                    id="rating"
                    aria-selected={sort === SortEnum.Rating}
                    aria-labelledby="sort rating"
            >
                <SortIcon className={styles.sortIcon}/>
                По рейтингу
            </button>
            <button onClick={() => setSort(SortEnum.Price)}
                    className={cn({
                        [styles.active]: sort === SortEnum.Price
                    })}
                    id="price"
                    aria-selected={sort === SortEnum.Price}
                    aria-labelledby="sort price"
            >
                <SortIcon className={styles.sortIcon}/>
                По цене
            </button>
            <button onClick={() => setSort(SortEnum.Title)}
                    className={cn({
                        [styles.active]: sort === SortEnum.Title
                    })}
                    id="title"
                    aria-selected={sort === SortEnum.Title}
                    aria-labelledby="sort title"
            >
                <SortIcon className={styles.sortIcon}/>
                По заголовку
            </button>
        </div>
    );
};
