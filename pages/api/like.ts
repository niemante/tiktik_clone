// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";

type Data = {
  name: string;
};

// again TS syntax - defining req as type NextApiRequest
// allows you to see instantly what can be used from that req
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;
    const data: any = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
