import { NextPage } from "next";
import Head from "next/head";
import Header from "./Header"

export interface LayoutProps{
    title: string | undefined,
    description: string | undefined,
    children: any
}

export default function Layout(props:LayoutProps):JSX.Element{
    return(
        <div>       
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description}></meta>
            </Head>

            <Header/>            

            <div>
                {props.children}
            </div>
        </div>        
    )
}