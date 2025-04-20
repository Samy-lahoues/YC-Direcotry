"use server";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";
import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();
  console.log(session, "from actions.ts");
  if (!session) {
    return parseServerActionResponse({ error: "Not sign in", status: "ERROR" });
  }
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );
  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
      views: 0,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    const createdSlug = result?.slug?.current || slug;

    return parseServerActionResponse({
      ...result,
      slug: createdSlug, // Make sure slug is included in the response
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
