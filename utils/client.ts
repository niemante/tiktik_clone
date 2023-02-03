import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "a61s868l",
  dataset: "mydataset",
  apiVersion: "2023-01-28",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
