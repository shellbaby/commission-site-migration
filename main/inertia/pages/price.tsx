import { Link } from "@adonisjs/inertia/react"
import { Head } from "@inertiajs/react"
import { urlFor } from "~/client"
import { Button, Carousel, CarouselImage } from "~/components"
import "~/css/price.css"

export default function Page() {
    const IMAGE_SIZE = 256

    const emotes: CarouselImage[] = [
        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/f40bfded-cfc4-4e09-8925-1cb29d1b2653_cheesed.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/966af088-7cfc-4854-8c70-f008ee601bdf_cry.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/884b1f93-20db-4b5e-bc54-a16d5ddc65b2_ded.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/9f39290e-e3ca-4834-916d-cccdbf4ab875_eepy.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/33fe1175-ed0c-4049-8198-37093b86312a_fu.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/2d41d462-4588-432d-bb4e-bd9f6a01fda1_hell.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/98d28c06-0be4-4e82-9608-4591030324be_hngh.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },

        {
            src: "https://storage.ko-fi.com/cdn/useruploads/post/22923a40-6de5-4f91-82a4-a078a683b378_looker.png",
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
        },
    ]

    const half_body: CarouselImage[] = []

    const full_body: CarouselImage[] = []

    const ref_sheet: CarouselImage[] = []

    return (
        <>
            <Head title="Price" />

            <div className="mb-12 text-center">
                <h2>Commission Price</h2>
                <p className="text-h6 mt-6 font-bold">
                    * Please carefully read the ToS first before commissioning *
                </p>
                <div className="mt-9 grid grid-cols-2 gap-6">
                    <Link route="link.tos">
                        <Button width="full">Terms of Service</Button>
                    </Link>
                    <Link route="link.form">
                        <Button width="full">Commission Form</Button>
                    </Link>
                </div>
            </div>

            <hr />

            <div id="commission-item">
                <div>
                    <h3>Emote</h3>
                    <p id="commission-price">$15</p>
                    <ul id="commission-description">
                        <li>Colored with Simple Shading</li>
                        <li>Free Light-mode Version</li>
                    </ul>
                </div>
                <div id="section-carousel">
                    <Carousel.Default images={emotes} autoSize spacing="2rem" />
                </div>
                <div id="commission-request">
                    <Link
                        href={urlFor(
                            "link.form",
                            {},
                            { qs: { type: "emote" } }
                        )}
                    >
                        <Button width="full">I want this!</Button>
                    </Link>
                </div>
            </div>

            <hr />

            <div id="commission-item">
                <div>
                    <h3>Half Body</h3>
                    <p id="commission-price">$25</p>
                    <ul id="commission-description">
                        <li>Colored with Simple Shading</li>
                        <li>Simple Background</li>
                    </ul>
                </div>
                <div>Image</div>
                <div id="commission-request">
                    <Link
                        href={urlFor(
                            "link.form",
                            {},
                            { qs: { type: "half-body" } }
                        )}
                    >
                        <Button width="full">I want this!</Button>
                    </Link>
                </div>
            </div>

            <hr />

            <div id="commission-item">
                <div>
                    <h3>Full Body</h3>
                    <p id="commission-price">$35</p>
                    <ul id="commission-description">
                        <li>Colored with Simple Shading</li>
                        <li>Simple Background</li>
                        <li>Simple Pose</li>
                    </ul>
                </div>
                <div>Image</div>
                <div id="commission-request">
                    <Link
                        href={urlFor(
                            "link.form",
                            {},
                            { qs: { type: "full-body" } }
                        )}
                    >
                        <Button width="full">I want this!</Button>
                    </Link>
                </div>
            </div>

            <hr />

            <div id="commission-item">
                <div>
                    <h3>Reference Sheet</h3>
                    <p id="commission-price">$75</p>
                    <ul id="commission-description">
                        <li>Flat Color</li>
                        <li>Include Front and Back View</li>
                        <li>Include Props and Texts</li>
                        <li>Include Tail Design</li>
                        <li>Side Profile +$20</li>
                    </ul>
                </div>
                <div>Image</div>
                <div id="commission-request">
                    <Link
                        href={urlFor(
                            "link.form",
                            {},
                            { qs: { type: "ref-sheet" } }
                        )}
                    >
                        <Button width="full">I want this!</Button>
                    </Link>
                </div>
            </div>

            <hr />

            <div className="mt-12 text-center">
                <p className="text-h6">
                    Got something that you like? Commission me right away!
                </p>

                <Link href={"/form"}>
                    <Button width="full" className="mt-9">
                        Commission Form
                    </Button>
                </Link>
            </div>
        </>
    )
}
