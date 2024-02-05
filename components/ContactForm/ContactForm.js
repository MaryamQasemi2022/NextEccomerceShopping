import axios from "axios";
import { handleError } from "lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dataUser.name.trim() ||
      !dataUser.email.trim() ||
      !dataUser.subject.trim() ||
      !dataUser.text.trim()
    ) {
      toast.error("تمام موارد فرم الزامی ست");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_CONTACT_US}`,
        dataUser,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if ((response.data.status = "success")) {
        toast.success("پیام شما با موفقیت ثبت شد");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeDataUser = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="text"
          name="name"
          value={dataUser.name}
          className="form-control"
          placeholder="نام و نام خانوادگی"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <input
          required
          type="email"
          name="email"
          value={dataUser.email}
          className="form-control"
          placeholder="ایمیل"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <input
          required
          type="text"
          value={dataUser.subject}
          name="subject"
          className="form-control"
          placeholder="موضوع پیام"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <textarea
          required
          name="text"
          value={dataUser.text}
          rows="10"
          style={{ height: 100 }}
          className="form-control"
          placeholder="متن پیام"
          onChange={handleChangeDataUser}
        ></textarea>
      </div>
      <div className="btn_box">
        <button type="submit">
          ارسال پیام
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
