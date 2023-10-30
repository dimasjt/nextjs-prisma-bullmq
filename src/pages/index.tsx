import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DateTime from 'react-datetime'

import "react-datetime/css/react-datetime.css";

export default function Home() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({
    publishedAt: new Date(),
  })

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const result = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          publishedAt: post.publishedAt.toISOString()
        })
      })
      const json = await result.json()
      await fetchPosts()

      console.log('json', json)
    } catch (error) {
      alert(error.message)
    }
  }

  function handleOnChange(name) {
    return function (event) {
      setPost({
        ...post,
        [name]: name === 'publishedAt' ? event : event.target.value
      })
    }
  }

  async function fetchPosts() {
    try {
      const result = await fetch('/api/posts', { method: 'GET' })
      const { data }= await result.json()

      setPosts(data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <section>
      <h1>New Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" placeholder="Title" name="title" onChange={handleOnChange('title')} />
        <br />
        <br />
        <label htmlFor="content">Content</label>
        <br />
        <textarea placeholder="Content" name="content" onChange={handleOnChange('content')} />
        <br />
        <br />
        <label htmlFor="publishedAt">Published At</label>
        <br />
        <DateTime
          onChange={handleOnChange('publishedAt')}
          value={post.publishedAt}
        />
        <br />
        <br />
        <button type="submit">
          save
        </button>
      </form>
      </section>

      <section>
        <h1>Posts</h1>

        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <small>Published at: {post.publishedAt}</small>
            <p>{post.content}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
