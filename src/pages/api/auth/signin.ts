import { handleOnSingIn } from "@/utils/api/auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;
  const query = req.query.api ?? "";
  const action = req.query.action ?? "";

  switch (query) {
    case "authentication":
      try {
        if (requestMethod === "POST" && action === "signin") {
          const { isError, response } = await handleOnSingIn({
            body: body,
          });

          if (!isError) {
            return res.status(200).json({ isError: false, response: response });
          }
          return res.status(500).json({ isError: true, response: response });
        }
      } catch (err) {
        console.error(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err }),
        };
      }
      break;

    default:
      return res.status(400).json({ isError: true });
  }
};

export default handler;
