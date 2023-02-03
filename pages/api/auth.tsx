// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

type Data = {
  name: string;
};

// again TS syntax - defining req as type NextApiRequest
// allows you to see instantly what can be used from that req
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const user = req.body;

    client.createIfNotExists(user).then(() => res.status(200));
  }
}
