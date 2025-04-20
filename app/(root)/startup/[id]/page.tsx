import Views from "@/components/Views"
import React, { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import markdownit from "markdown-it"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { formatDate } from "@/lib/utils";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"

const md = markdownit();

const Page = async ({ params } : { params : Promise<{id : string}>}) => {
    const id = (await params).id;
    const Post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
    if (!Post) return notFound();    
    const parsedContent = md.render(Post?.pitch || "")
    return (
        <>
        <section className="pink_container !min-h-[230px]"> 
            <p className="tag">{formatDate(Post._createdAt)}</p>
            <h1 className="heading">{Post.title}</h1>
            <p className="sub-heading !max-w-5xl">{Post.description}</p>
        </section>
        <section className="section_container">
            <Image 
            src={Post.image} 
            alt={Post.title} 
            width={0} 
            height={0} 
            sizes="100vw" 
            style={{ width: "100%", height: "auto" }} 
            className="rounded-xl" 
            />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
                <Link 
                href={`/user/${Post.author._id}`}
                className="flex gap-2 items-center mb-3">
                    <Image src={Post.author.image} width={64} height={64} className="rounded-full drop-shadow-lg" alt={`${Post.author.name} avatar`}></Image>
                    <div className="flex flex-col">
                        <p className="text-20-medium">{Post.author.name}</p>
                        <p className="text-16-medium text-black-300">@{Post.author.username}</p>
                    </div>
                </Link>
                <p className="category-tag">{Post.category}</p>
            </div>
            <h3 className="text-30-bold">Pitch Startup Details</h3>
            { parsedContent ? (
                <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html : parsedContent }}/>
            ) : (
                <p className="no-result">
                    No details provided
                </p>
            )}
        </div>
        <hr className="devider" />
        {/* TODO: Editor selected Startup */}
        </section>
            <Suspense fallback={<Skeleton className="view-skeleton"/>}>
            <Views id={Post._id}></Views>
            </Suspense>
        </>

    )
}
export default Page;