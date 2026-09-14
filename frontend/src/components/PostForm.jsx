import { useState } from 'react';
import { toast } from 'sonner';
import { createPost } from '../api/posts';

function PostForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    published: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      const payload = {
        title: form.title,
        content: form.content,
        published: form.published,
      };
      await createPost(payload);
      toast.success('Post muvaffaqiyatli qo‘shildi');
      onSuccess();
    } catch (err) {
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
          <span className="label-text font-medium">Sarlavha</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={`input input-bordered w-full ${fieldErrors.title ? 'input-error' : ''}`}
          placeholder="Post sarlavhasi"
        />
        {fieldErrors.title && (
          <label className="label">
            <span className="label-text-alt text-error">{fieldErrors.title}</span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Matn</span>
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows="5"
          className={`textarea textarea-bordered w-full ${fieldErrors.content ? 'textarea-error' : ''}`}
          placeholder="Post matni..."
        />
        {fieldErrors.content && (
          <label className="label">
            <span className="label-text-alt text-error">{fieldErrors.content}</span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            className="checkbox"
          />
          <span className="label-text">Darhol chop etilsin</span>
        </label>
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

export default PostForm;