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
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!talaba) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Talaba topilmadi</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        ← Orqaga
      </Link>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-blue-500 to-purple-600 h-32"></div>
        <div className="px-6 pb-6 -mt-12">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-linear-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mx-auto">
            {talaba.ism.charAt(0).toUpperCase()}
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-900">{talaba.ism}</h1>
            <p className="text-gray-600">{talaba.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Postlari ({talaba.posts?.length || 0})</h2>
          {talaba.posts && talaba.posts.length > 0 ? (
            <div className="space-y-3">
              {talaba.posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
                >
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{post.content?.substring(0, 100)}...</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Hozircha postlar yo'q</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TalabaDetail;