import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { registerUser } from '../api/auth';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ism: '', email: '', password: '' });
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
      await registerUser(form);
      toast.success('Ro‘yxatdan o‘tdingiz! Endi tizimga kiring.');
      navigate('/login');
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ro‘yxatdan o‘tish</h1>
        <p className="text-gray-500 mb-6">Yangi hisob yarating</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Ism</span>
            </label>
            <input
              type="text"
              name="ism"
              value={form.ism}
              onChange={handleChange}
              className={`input input-bordered w-full ${fieldErrors.ism ? 'input-error' : ''}`}
              placeholder="Ali Valiyev"
            />
            {fieldErrors.ism && (
              <label className="label">
                <span className="label-text-alt text-error">{fieldErrors.ism}</span>
              </label>
            )}
          </div>

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
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;