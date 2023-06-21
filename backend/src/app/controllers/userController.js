const { Sequelize } = require("sequelize");
const config = require("../config/config");
const sequelize = new Sequelize(config.development);
const User = require("../models/user")(sequelize, Sequelize);
const Store = require("../models/store")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config");
require("dotenv/config");

class UserController {
  async Register(req, res, next) {
    try {
      //lấy dữ liệu từ body request
      const { full_name, email, password, phone_number, role } = req.body;

      // Kiểm tra định dạng email
      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      // Kiểm tra định dạng số điện thoại
      const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
      };

      // Hàm tạo unique identifier
      const generateUniqueIdentifier = () => {
        return uuidv4();
      };

      // Hàm gửi email xác nhận kích hoạt tài khoản
      const sendConfirmationEmail = async (userEmail) => {
        try {
          const transporter = nodemailer.createTransport({
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false,
            auth: {
              user: mailConfig.USERNAME,
              pass: mailConfig.PASSWORD,
            },
          });

          const mailOptions = {
            from: mailConfig.FROM_ADDRESS,
            to: userEmail,
            subject: "Xác nhận kích hoạt tài khoản",
            html: `<a href="${process.env.APP_URL}/confirm-account?email=${userEmail}">Nhấp vào đây để xác nhận kích hoạt tài khoản của bạn</a>`,
          };

          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Gửi email không thành công", error);
          throw new Error("Gửi email không thành công");
        }
      };

      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Email không hợp lệ" });
      }

      if (!validatePhoneNumber(phone_number)) {
        return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
      }

      //kiểm tra email đã tồn tại hay chưa
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      //mã hoá mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      //tạo user mới
      let unique_identifier = null;
      if (role === "owner") {
        // Tạo unique_identifier cho role "owner"
        unique_identifier = generateUniqueIdentifier();
      }
      const newUser = await User.create({
        full_name,
        email,
        password: hashedPassword,
        phone_number,
        role,
        unique_identifier,
      });

      // Gửi email xác nhận kích hoạt tài khoản
      await sendConfirmationEmail(email);

      //trả về thông tin user đã đăng ký
      return res.status(201).json({ user: newUser });
    } catch (error) {
      console.error("Đăng ký không thành công", error);
      return res.status(500).json({ message: "Đăng ký thất bại" });
    }
  }

  async confirmAccount(req, res, next) {
    try {
      // Lấy email từ query parameter của request
      const { email } = req.query;

      // Tìm kiếm user dựa trên email
      const user = await User.findOne({ where: { email: email } });

      // Kiểm tra xem user có tồn tại và chưa được kích hoạt tài khoản
      if (!user || user.is_verify) {
        return res
          .status(400)
          .json({ message: "Liên kết xác nhận không hợp lệ" });
      }

      // Cập nhật trường is_verify của user thành true
      user.is_verify = true;
      await user.save();

      return res
        .status(200)
        .json({ message: "Kích hoạt tài khoản thành công" });
    } catch (error) {
      console.error("Xác nhận kích hoạt tài khoản không thành công", error);
      return res
        .status(500)
        .json({ message: "Xác nhận kích hoạt tài khoản không thành công" });
    }
  }

  async showStores(req, res, next) {
    try {
      const { unique_identifier } = req.params;

      // Tìm user có unique_identifier
      const user = await User.findOne({ where: { unique_identifier } });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy chủ cửa hàng có mã định danh này" });
      }

      // Lấy danh sách các cửa hàng của owner
      const stores = await Store.findAll({
        where: { owner_id: user.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!stores) {
        return res
          .status(404)
          .json({
            message: `Không tìm thấy các cửa hàng của chủ cửa hàng ${user.full_name}`,
          });
      }

      return res.json({ stores });
    } catch (error) {
      console.error("Lỗi tìm kiếm cửa hàng", error);
      return res.status(500).json({ message: "Lỗi tìm kiếm cửa hàng" });
    }
  }
}

module.exports = new UserController();
