import { Customer, User } from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "customer",
        isActivated: true,
      });

      await customer.save();
    }

    const { accessToken, refreshToken } = generateToken(customer);

    return reply.send({
      message: "Login successful",
      customer,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "An eror occurred", error });
  }
};

export const refreshToken = async (req, reply) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return reply.code(403).send({ message: "Access denied" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    let user;
    if (decoded.role === "customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "deliveryPartner") {
      user = await User.findById(decoded.userId);
    } else {
      return reply.code(403).send({ message: "Access denied" });
    }

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);

    return reply.send({
      message: "Refresh token successful",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "An error occurred", error });
  }
};

export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;
    let user;

    if (role === "customer") {
      user = await Customer.findById(userId);
    } else if (role === "deliveryPartner") {
      user = await User.findById(userId);
    } else {
      return reply.code(403).send({ message: "Access denied" });
    }

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    return reply.send({
      message: "User details",
      user,
    });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "An error occurred", error });
  }
};
