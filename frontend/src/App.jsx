import { useState, useEffect } from 'react'
import { toast } from 'sonner';
import { getTalabalar } from './api/talabalar'
import { getPosts } from './api/posts';

function App() {
  const [talabalar, setTalabalar] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchTalabalar = async () => {
      try {
        const javob = await getTalabalar();
        console.log("javob", javob)
        setTalabalar(javob);
      } catch (error) {
        console.error("Nimadir o'xshamadi", error)
        toast.error("Nimadir o'xshamadi")
      }
    }
    fetchTalabalar();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res);
      } catch (error) {
        console.error("Nimadir o'xshamadi", error)
        toast.error("Nimadir o'xshamadi")
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Salom FN2</h1>

      {talabalar && (
        <div>
          <h3>Talabalar</h3>
          <ul>
            {talabalar.map((talaba, id) => {  return <li key={id}>{talaba.ism}</li> })}
          </ul>
        </div>
      )}

      {posts && (
        <div>
          <h3>Posts</h3>
          <ul>
            {posts.map((post, id) => {  return <li key={id}>{post.title}</li> })}
          </ul>
        </div>
      )}
    </>
  )
}

export default App
