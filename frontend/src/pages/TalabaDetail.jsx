import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getTalabaById } from '../api/talabalar';
import { toast } from 'sonner';

function TalabaDetail() {
  const { id } = useParams();
  const [talaba, setTalaba] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTalaba = async () => {
      try {
        const data = await getTalabaById(id);
        setTalaba(data);
      } catch (err) {
        console.error("Xato", err)
        toast.error("Xatolik yuz berdi")
      } finally {
        setLoading(false);
      }
    };
    loadTalaba();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!talaba) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Talaba topilmadi</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/" className="text-blue-600 hover:underline">← Orqaga</Link>
      <div className="max-w-2xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">{talaba.ism}</h1>
        <p className="text-gray-600 mt-2">{talaba.email}</p>
        {talaba.posts && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Postlari</h2>
            {talaba.posts.length === 0 ? (
              <p className="text-gray-500">Postlar yo'q</p>
            ) : (
              <div className="space-y-2">
                {talaba.posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="block border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TalabaDetail;