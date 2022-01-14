import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout title='Next Page' description='Fetching dummy data and display it'>
      <p> Index Page </p>
    </Layout>
  )
}

export default Home