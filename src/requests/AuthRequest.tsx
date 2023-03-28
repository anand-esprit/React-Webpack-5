import { RequestProps } from "../config/InterfacesAndTypes";
import Message from "../config/Message";

export const LoginRequest: RequestProps = {
  email: [
    { required: true, message: Message().required.text("Email ID") },
    { type: "email", message: Message().email("Email ID") },
  ],
  password: [{ required: true, message: Message().required.text("Password") }],
};
