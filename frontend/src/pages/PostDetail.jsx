import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getPostById } from '../api/posts';
import { toast } from 'sonner';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error("Xato", err)
        toast.error("Xatolik yuz berdi")
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Post topilmadi</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/" className="text-blue-600 hover:underline">← Orqaga</Link>
      <div className="max-w-2xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        {post.author && (
          <p className="text-gray-600 mt-2">Muallif: {post.author.ism}</p>
        )}
        <div className="mt-4 text-gray-800 whitespace-pre-wrap">{post.content}</div>
      </div>
    </div>
  );
}

export default PostDetail;