import { Button } from "./ui/button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image";
import { EyeIcon } from "lucide-react"
export type StartupCardTypes = {
    _id: string;
    _createdAt: string;
    views?: number;
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    author?: {
        name?: string;
        image?: string;
        _id: string;
        bio?: string;
    };
};
const StartupCard = ({views, _createdAt, title, description, image, category, author, _id} : StartupCardTypes) => {
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p>{formatDate(_createdAt)}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary-pink" />
                    <p>{views}</p>
                </div>
            </div>
            <div className="flex-between gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image className="rounded-full " src="https://placehold.jp/48x48.png" alt={`user ${author?.name} avatar`}
                    width={48} height={48}></Image>
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card-desc">{description}</p>
                <Image className="startup-card_img" src={image || "https://placehold.jp/600x400.png"} alt="Startup image"  width={600} height={400}/>
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard;
