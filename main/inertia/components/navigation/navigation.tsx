import { Link, useRouter } from "@adonisjs/inertia/react"
import { Menu } from "@ark-ui/react/menu"
import { CaretDownIcon } from "@phosphor-icons/react"
import { Avatar } from "~/components"
import { InertiaProps } from "~/types"

type ComponentProps = Pick<InertiaProps, "client">

export const Navigation = ({ client }: ComponentProps) => {
    const router = useRouter()
    const handleSignout = () => {
        router.visit({
            route: "auth.session.destroy",
        })
    }

    return (
        <nav className="flex h-20 items-center justify-between [&_a]:hover:underline">
            <Link
                route="link.static.home"
                className="flex h-full items-center focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
            >
                home
            </Link>
            <div className="flex h-full items-stretch gap-4 [&>a]:inline-flex [&>a]:items-center [&>a]:focus-within:underline [&>a]:focus-visible:font-bold [&>a]:focus-visible:outline-none">
                <Menu.Root
                    positioning={{
                        offset: { mainAxis: -18 },
                        placement: "bottom-end",
                    }}
                >
                    <Menu.Trigger>
                        commission
                        <Menu.Indicator>
                            <CaretDownIcon />
                        </Menu.Indicator>
                    </Menu.Trigger>

                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Arrow>
                                <Menu.ArrowTip />
                            </Menu.Arrow>
                            <Menu.Item asChild value="prices">
                                <Link route="link.static.price">prices</Link>
                            </Menu.Item>
                            <Menu.Item asChild value="tos">
                                <Link route="link.static.tos">
                                    terms of service
                                </Link>
                            </Menu.Item>
                            <Menu.Item asChild value="form">
                                <Link route="link.commissions.create">
                                    commission form
                                </Link>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Menu.Root>
                <Link route="link.static.gallery">gallery</Link>
                <Link route="link.static.contact">contact</Link>

                {client ? (
                    <Menu.Root
                        positioning={{
                            offset: { mainAxis: -3 },
                            placement: "bottom-end",
                        }}
                    >
                        <Menu.Trigger>
                            <Avatar.Root>
                                <Avatar.Fallback
                                    src="https://cdn.bsky.app/img/avatar/plain/did:plc:zwvrinmsejg2lw6yfkk5dgxm/bafkreifxtxkn6xkkwb3mcbxyphnysvo5y3lj5foz5a7d2mian3sku6ccjm"
                                    alt="fallback avatar"
                                    width={590}
                                    height={590}
                                />
                                <Avatar.Image
                                    alt="avatar"
                                    src={client.username}
                                />
                            </Avatar.Root>
                        </Menu.Trigger>

                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Arrow>
                                    <Menu.ArrowTip />
                                </Menu.Arrow>
                                <Menu.Item value="profile" asChild>
                                    <Link route="link.clients.profile">
                                        my profile
                                    </Link>
                                </Menu.Item>
                                <Menu.Item value="commissions" asChild>
                                    <Link route="link.commissions.auth.index">
                                        my commissions
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    value="sign-out"
                                    onClick={handleSignout}
                                >
                                    sign out
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Menu.Root>
                ) : (
                    <Link route="link.registration.signin">sign in</Link>
                )}
            </div>
        </nav>
    )
}
