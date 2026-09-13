import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { loginUser } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { loginUser: setAuth } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (generalError) setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');

    try {
      const data = await loginUser(form);
      setAuth(data.user, data.token);
      toast.success(`Xush kelibsiz, ${data.user.ism}!`);
      navigate('/');
    } catch (err) {
      if (err.details && err.details.length > 0) {
        const errors = {};
        err.details.forEach((d) => {
          errors[d.field] = d.message;
        });
        setFieldErrors(errors);
      } else {
        setGeneralError(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tizimga kirish</h1>
        <p className="text-gray-500 mb-6">Email va parolingizni kiriting</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`input input-bordered w-full ${fieldErrors.email ? 'input-error' : ''}`}
              placeholder="ali@example.com"
            />
            {fieldErrors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{fieldErrors.email}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Parol</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`input input-bordered w-full ${fieldErrors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <label className="label">
                <span className="label-text-alt text-error">{fieldErrors.password}</span>
              </label>
            )}
          </div>

          {generalError && (
            <div className="alert alert-error text-sm py-2">
              <span>{generalError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Kirish
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Hisobingiz yo‘qmi?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
