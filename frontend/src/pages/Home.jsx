import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTalabalar } from '../api/talabalar';
import { getPosts } from '../api/posts';
import Modal from '../components/Modal';
import TalabaForm from '../components/TalabaForm';
import PostForm from '../components/PostForm';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  const [talabalar, setTalabalar] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [talabaModalOpen, setTalabaModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const [talabaData, postData] = await Promise.all([
        getTalabalar(),
        getPosts(),
      ]);
      setTalabalar(talabaData);
      setPosts(postData);
    } catch (err) {
      console.error("Xatolik loadData bilan", err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          MoBlogga Xush Kelibsiz
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Blog platformasiga kirib, talabalar va ularning postlari bilan tanishing.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/login" className="btn btn-primary btn-lg">
            Kirish
          </Link>
          <Link to="/register" className="btn btn-secondary btn-lg">
            Ro‘yxatdan o‘tish
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleTalabaCreated = () => {
    setTalabaModalOpen(false);
    loadData();
  };

  const handlePostCreated = () => {
    setPostModalOpen(false);
    loadData();
  };

  return (
    <div>
      <section className="text-center py-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Bilimlar platformasi
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Talabalar va ularning postlari bilan tanishing
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">👥</span> Talabalar
              </h2>
              {
                user && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setTalabaModalOpen(true)}
                    >
                      + Talaba
                    </button>
                )
              }
            </div>

            <div className="space-y-4">
              {talabalar.length === 0 ? (
                <p className="text-gray-500">Talabalar yo'q</p>
              ) : (
                talabalar.map((talaba) => (
                  <Link
                    key={talaba.id}
                    to={`/talaba/${talaba.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition group"
                  >
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {talaba.ism.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition truncate">
                        {talaba.ism}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{talaba.email}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">📄</span> So'nggi postlar
            </h2>
            
            {user && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setPostModalOpen(true)}
              >
                + Post
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length === 0 ? (
              <p className="text-gray-500">Postlar yo'q</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="h-40 bg-linear-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                    📰
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                        {post.author?.ism?.charAt(0).toUpperCase() || '?'}
                      </span>
                      <span>{post.author?.ism || 'Noma’lum'}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>

      <Modal
        isOpen={talabaModalOpen}
        onClose={() => setTalabaModalOpen(false)}
        title="Yangi talaba qo‘shish"
      >
        <TalabaForm
          onSuccess={handleTalabaCreated}
          onCancel={() => setTalabaModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        title="Yangi post yaratish"
      >
        <PostForm
          onSuccess={handlePostCreated}
          onCancel={() => setPostModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Home;