import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { getMe, updateTalaba } from '../api/talabalar';
import client from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { getImageUrl } from '../utils/imageUrl';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({ ism: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMe();
        setForm({ ism: data.ism, email: data.email, password: '' });
      } catch (err) {
        console.error("Xatolik", err)
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

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
    setSaving(true);

    try {
      const payload = { ism: form.ism, email: form.email };
      if (form.password.trim()) {
        payload.password = form.password;
      }

      const updated = await updateTalaba(user.id, payload);
      updateUser({ ...user, ...updated });
      toast.success('Profil muvaffaqiyatli yangilandi');
      setForm((prev) => ({ ...prev, password: '' }));
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
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Faqat JPEG, PNG yoki WEBP rasmlarni yuklash mumkin');
      e.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Rasm hajmi 2 MB dan oshmasligi kerak');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setUploadingAvatar(true);
    try {
      const res = await client.post('/talabalar/me/avatar', formData);
      const updatedUser = res.data.data.user;
      updateUser(updatedUser);
      toast.success('Avatar muvaffaqiyatli yangilandi');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const avatarUrl = getImageUrl(user?.avatar);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-blue-500 to-purple-600 h-32"></div>

        <div className="px-6 -mt-12 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.ism}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.ism?.charAt(0).toUpperCase() || '?'
                )}
              </div>

              {uploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm text-white"></span>
                </div>
              )}

              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm border-2 border-white"
                title="Avatar yuklash"
              >
                +
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarUpload}
              className="hidden"
            />

            <div className="text-center mt-4">
              <h1 className="text-2xl font-bold text-gray-900">{user?.ism}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Rasm: max 2 MB, JPEG / PNG / WEBP
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profilni tahrirlash</h2>

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
                <span className="label-text font-medium">Yangi parol (ixtiyoriy)</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`input input-bordered w-full ${fieldErrors.password ? 'input-error' : ''}`}
                placeholder="Bo'sh qoldirsangiz, parol o'zgarmaydi"
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

            <div className="flex justify-end gap-2 pt-2">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saqlanmoqda...
                  </>
                ) : (
                  'Saqlash'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;