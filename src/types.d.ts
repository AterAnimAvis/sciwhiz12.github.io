
declare type Quotes = {
    users: UserRegistry
    roles: RoleRegistry
    quotes: Quote[]
}

declare type UserRegistry = {[p: string]: User}

declare type User = {
    id: string
    avatar: string
    discriminator: string
    nickname?: string
    roles?: string[]
    tag?: string
    username: string
}

declare type RoleRegistry = {[p: string]: Role}

declare type Role = {
    name: string
    color?: string
    css?: string // Generated via parseRoles
}

declare type Quote = {
    user: string
    text: string
    side_text?: string
}