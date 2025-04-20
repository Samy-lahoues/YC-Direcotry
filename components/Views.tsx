import { after } from "next/server"
import Ping from "@/components/Ping";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
const Page = async ({ id } : { id : string}) => {
    const { views : totalViews } = await client.withConfig({ useCdn: false}).fetch(STARTUP_VIEWS_QUERY, { id }) 
    after(async () => {
        await writeClient.patch(id).set({views : totalViews + 1}).commit();
    })
    
    return (
        <div className="view-container">
            <div className="absolute -right-2 -top-2">
                <Ping></Ping>
            </div>
            <p className="views-text">
                <span className="font-black">{totalViews === 1 ? `${totalViews } view` : `${totalViews } views`}</span>
            </p>
        </div>
    )
}
export default Page;