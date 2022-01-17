import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout'
import fs from "fs";
import { callbackify } from 'util';
import { Server } from 'http';

export interface JsonFace extends ParsedUrlQuery {
  id : string
}

interface IPage {
  id: string,
  title: string | undefined,
  description : string | undefined,
  content: string | undefined
}

//Page: Funktionsargument soll vom Typ IPage sein. IPage ist eine Abbildung von pages.json
//somit weiß der entwickler durch den compiler, welche eigenschaften er von "pageContent" nutzen kann
const Pages : NextPage<IPage> = (pageContent: IPage) => {
    return (
      <Layout title={pageContent.title} description={pageContent.description}>
        Children Content of {pageContent.title}:
        <p> {pageContent.content} </p>         
        
      </Layout>
    )
}

/*
 JsonFace definiert eine id property of type string:
 getStaticPaths erzeugt return Type nach folgendem Schema:
 {
   paths: 
   [
     params: {id: string},
     params: {id: string},
     params: {id: string}
   ]
   fallback:
 }
 es wird geschaut, dass Elemente of Type Jsonface in die Struktur genested sind 
 die erzeugten Pfade werden also aus der ID Property gemapt
 z.B. localhost:3000/datafetch/1
*/
export const getStaticPaths: GetStaticPaths<JsonFace> = async(context:any) => {  
    const rawData = fs.readFileSync("./pages.json","utf-8")
    const pages : IPage[] = JSON.parse(rawData)
    
    return{
      paths: pages.map((page) => { return { params: {
        id: page.id
      }}}),
      fallback: false
    }    
} 



/*
  hier wird durch die Parametrisierung von GetStaticProps auf den Typ IPage geschaut, ob der returned Type
  die Voraussetzungen des Interfaces IPage erfüllt. Der in props genestete return Type entspricht dem Interface IPage
  und deshalb erhalten wir keinen compile error. TypeScript is zufrieden. 
*/
export const getStaticProps: GetStaticProps<IPage> = async (context:any) => {
    const {id} = context.params as IPage
    
    const rawData = fs.readFileSync("./pages.json","utf-8")
    const pages : IPage[] = JSON.parse(rawData)
    const pageToRender :IPage | undefined =  pages.find(page => page.id === id)
    
    return{
      props :{
          id: id,
          title: pageToRender?.title,
          description: pageToRender?.title,
          content: pageToRender?.content
      }
    }
}

export default Pages


// export async function getServerSideProps({params:{id}}){

//     let todoItem = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     todoItem = await todoItem.json()
//     console.log(todoItem)
//     return{
//       props : {
//         data : todoItem,
//       }
//     }
// }