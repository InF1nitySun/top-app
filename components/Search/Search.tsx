import cn from "classnames";
import React, {useState} from "react";
import {SearchProps} from "./Search.props";
import {Input, Button} from "..";
import styles from "./Search.module.css";
import GlassIcon from "./glass.svg";
import {useRouter} from "next/router";

export const Search = ({className, ...props}: SearchProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();
    const goToSearch = () => {
        router.push({
            pathname: "/search",
            query: {
                q: search
            }
        });
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            goToSearch();
        }
    };

    return (
        <form className={cn(className, styles.search)} {...props} role="search">
            <Input
                className={styles.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                className={styles.button}
                appearance="primary"
                onClick={goToSearch}
                aria-label="Искать по сайту"
            >
                <GlassIcon/>
            </Button>
        </form>
    );
};
