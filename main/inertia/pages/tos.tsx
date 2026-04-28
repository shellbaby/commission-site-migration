import { Head } from "@inertiajs/react"
import {
    CaretDownIcon,
    CheckCircleIcon,
    IconContext,
    XCircleIcon,
} from "@phosphor-icons/react"
import { Accordion } from "~/components"

export default function Page() {
    return (
        <>
            <Head title="ToS" />

            <h2 className="mb-12 text-center">Terms of Service</h2>
            <Accordion.Root defaultValue={["general"]}>
                <Accordion.Item value="general">
                    <Accordion.ItemTrigger>
                        General TOS
                        <Accordion.ItemIndicator>
                            <CaretDownIcon />
                        </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <ul>
                            <li>
                                You can use the commissioned arts for personal
                                purposes, including posting on social media
                                platforms or galleries; as long as you do{" "}
                                <b>NOT</b> claim them as your own or make any
                                profit from them. Proper credits <b>MUST</b> be
                                included.
                            </li>

                            <li>
                                Two versions of the drawing will be provided to
                                you: one is for posting online, the other is the
                                full resolution. You <b>MUST</b> use the one
                                marked for posting online for such purpose.
                            </li>

                            <li>
                                I maintain the right to deny any commissions for
                                any reason.
                            </li>

                            <li>
                                I maintain the right to cancel the commission at
                                any time. A full refund will be issued to the
                                commissioner.
                            </li>

                            <li>
                                All the rights regarding the artworks belong to
                                me, including posting them, streaming, or using
                                them for promotional purposes. Please ask
                                beforehand if you wish to keep it private, I
                                will try to alter the colors of your character
                                before posting the piece.
                            </li>

                            <li>
                                <b>NO</b> party other than myself is allowed to
                                alter, trace, copy, or remove the watermark from
                                the completed artworks.
                            </li>

                            <li>
                                <b>NO</b> modifications to the finished artworks
                                should be made without my approval.
                            </li>

                            <li>
                                You can ask for a full refund before I start
                                working on your commission. After that, a refund
                                is <b>NOT</b> viable under any circumstances.
                            </li>

                            <li>
                                <b>NO</b> refund is possible once the artwork is
                                completed.
                            </li>

                            <li>
                                For YCHs, requests to change to a different pose
                                are <b>NOT</b> allowed.
                            </li>

                            <li>
                                I am NOT consent to let my artworks be used in,
                                but not restricted to: AI training, AI
                                modifying, NFT, or hateful purposes.
                            </li>
                        </ul>

                        <h6 className="mt-6 text-center">
                            Failure to follow the ToS will result in a total
                            termination of any service, and a slot in the
                            blacklist
                        </h6>
                    </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item value="acceptable">
                    <Accordion.ItemTrigger>
                        I will/will not draw
                        <Accordion.ItemIndicator>
                            <CaretDownIcon />
                        </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <IconContext value={{ size: 20, weight: "bold" }}>
                            <h6 className="text-success flex items-end gap-3">
                                I will draw <CheckCircleIcon />
                            </h6>
                            <ul className="mt-2">
                                <li>SFW</li>
                                <li>Furry or Anthropomorphic Characters</li>
                            </ul>
                            <h6 className="text-error mt-6 flex items-end gap-3">
                                I will NOT draw <XCircleIcon />
                            </h6>
                            <ul className="mt-2">
                                <li>NSFW (not here)</li>
                                <li>Human</li>
                                <li>Overly Complexed Characters</li>
                                <li>Detailed Background</li>
                                <li>Gore</li>
                                <li>Mechs</li>
                                <li>Muscles</li>
                                <li>Religions</li>
                                <li>Licensed Characters</li>
                                <li>Self-harm</li>
                                <li>Hateful Content</li>
                            </ul>
                        </IconContext>
                    </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item value="extras">
                    <Accordion.ItemTrigger>
                        Extra Info
                        <Accordion.ItemIndicator>
                            <CaretDownIcon />
                        </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <ul>
                            <li>
                                I only accept payment via <b>Paypal invoices</b>
                                .
                            </li>
                            <li>
                                Payment is in <b>USD (US Dollar)</b>.
                            </li>
                            <li>
                                A proper <b>reference sheet</b> or{" "}
                                <b>visual representation</b> of your character
                                must be provided. I will not draw based solely
                                on text description, nor design your character
                                from scratch.
                            </li>
                            <li>
                                I only accept references in either <b>PNG</b> or{" "}
                                <b>JPEG</b> format.
                            </li>
                            <li>
                                Colors of your character might be altered to
                                some lighter shades to match my pastel
                                aesthetic.
                            </li>
                            <li>
                                I will draw your character in 3-digit footpaws
                                and 3 or 4-digit handpaws.
                            </li>
                        </ul>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </>
    )
}
