declare module "nodemailer" {
  import type { Transporter } from "nodemailer";

  const nodemailer: {
    createTransport: (options: any) => {
      sendMail: (mailOptions: any) => Promise<any>;
    };
  };

  export default nodemailer;
}

