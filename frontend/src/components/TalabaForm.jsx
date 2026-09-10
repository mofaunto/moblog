import { useState } from 'react';
import { toast } from 'sonner';
import { createTalaba } from '../api/talabalar';

function TalabaForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    ism: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      const res = await createTalaba(form);
      console.log("res", res);
      toast.success('Talaba muvaffaqiyatli qo‘shildi');
      onSuccess();
    } catch (err) {
      console.log("err", err);
      if (err.details && err.details.length > 0) {
        const errors = {};
        err.details.forEach((d) => {
          errors[d.field] = d.message;
        });
        setFieldErrors(errors);
      }
    }
  };

  return (
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

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn" onClick={onCancel}>
          Bekor qilish
        </button>
        <button type="submit" className="btn btn-primary">
          Saqlash
        </button>
      </div>
    </form>
  );
}

export default TalabaForm;