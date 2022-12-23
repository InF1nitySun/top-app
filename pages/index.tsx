import axios from "axios";
import {useState} from "react";
import {GetStaticProps} from "next";

import {Htag, Button, Tag, Rating, Input, Textarea} from "../components";
import {withLayout} from "../layout/Layout";
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";
import {Error404} from "./404";
import Error from "next/error";

function Home(): JSX.Element {

    const [rating, setRating] = useState<number>(4);

    // return <Error404/>
    // return <Error statusCode={404} withDarkMode={false}/>

    return (
        <>
            <Htag tag='h1'>{rating}</Htag>
            <Button appearance="primary" arrow="right">Текст</Button>
            <Button appearance="ghost" arrow="right">Текст</Button>
            <Button appearance="ghost" arrow="down">Текст</Button>
            <Tag size="s">Ghost</Tag>
            <Tag size="m" color="red">Red</Tag>
            <Tag size="m" color="gray">Green</Tag>
            <Tag size="s" color="green">Green</Tag>
            <Tag size="m" color="primary">Green</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder="input..."/>
            <Textarea placeholder="textarea..."/>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory});

    return {
        props: {
            menu, firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number
}