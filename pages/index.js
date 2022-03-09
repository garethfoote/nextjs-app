import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({posts}) {
  return (<>
    <h1>Titles</h1>
    <div>
    {posts && posts.map((post)=> (
        <div key={post.id}>
          <h2>{post.attributes.Title}</h2>
        </div>
    ))}
    </div>
    </>)
}

export async function getStaticProps(){
  // get posts
  const res = await fetch("http://localhost:1337/api/Posts");
  const posts = await res.json();
  // console.log(posts.data)
  return {
    props: { posts: posts.data }
  }
}