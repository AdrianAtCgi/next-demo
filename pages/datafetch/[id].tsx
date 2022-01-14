import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout'
import fs from "fs";

export interface JsonFace extends ParsedUrlQuery {
  id : string
}


const Pages : NextPage<IPage> = (pageContent: IPage) => {
    return (
      <Layout title={pageContent.title} description={pageContent.description}>
        Children Content of {pageContent.title}:
        <p> {pageContent.content} </p>         
        
      </Layout>
    )
}



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

interface IPage {
  id: string,
  title: string | undefined,
  description : string | undefined,
  content: string | undefined
}

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