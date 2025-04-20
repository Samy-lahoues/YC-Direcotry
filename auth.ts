import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id,
          });

        if (!existingUser) {
          // Create a new user in the database
          await writeClient.create({
            _type: "author",
            id,
            username: login,
            image,
            email,
            name,
            bio: bio || "",
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Deny sign-in
      }
    },
    async jwt({ token, account, profile }) {
      // Add custom claims
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });
        if (user) {
          token.id = user?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token.id) {
          session.id = token.id;
        }
      } catch (error) {
        console.error("Session problem", error);
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);

export default authOptions;
