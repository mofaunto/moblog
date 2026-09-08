import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTalabalar } from '../api/talabalar';
import { getPosts } from '../api/posts';
import { toast } from 'sonner';

function Home() {
  const [talabalar, setTalabalar] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [talabaData, postData] = await Promise.all([
          getTalabalar(),
          getPosts(),
        ]);
        setTalabalar(talabaData);
        setPosts(postData);
      } catch (err) {
        console.error("Xato", err)
        toast.error("Xatolik yuz berdi")
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bosh sahifa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Talabalar</h2>
          <div className="space-y-3">
            {talabalar.length === 0 ? (
              <p className="text-gray-500">Talabalar yo'q</p>
            ) : (
              talabalar.map((talaba) => (
                <Link
                  key={talaba.id}
                  to={`/talaba/${talaba.id}`}
                  className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="font-medium text-gray-900">{talaba.ism}</h3>
                  <p className="text-sm text-gray-500">{talaba.email}</p>
                </Link>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Postlar</h2>
          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-gray-500">Postlar yo'q</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  {post.author && (
                    <p className="text-sm text-gray-500">{post.author.ism}</p>
                  )}
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;