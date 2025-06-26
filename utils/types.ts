export type SignUpInput = {
    username: string;
    password: string;
    password_check: string;
}

export type LogInInput = {
    username: string;
    password: string;
    password_check: string;
}

export type Token = {
    token: string;
}

export type UserCollection = {
    uid: string;
    name: string;
    recs: number;
    private: boolean;
}

export type User = {
  uid: string;
  username: string;
  avatar: string | undefined;
  bio: string | undefined;
  highlight: string;
  collections: UserCollection[];
}

export type PublicUserCollection = UserCollection & {
    about: string;
}

export type PublicUser = {
    username: string;
    avatar: string | undefined;
    bio: string | undefined;
    highlight: string;
    collections: PublicUserCollection[];
}

export type Collection = {
    uid: string;
    username?: string;
    name: string;
    about: string | undefined;
    private: boolean;
    fandom: boolean;
    ship: boolean;
    warnings: boolean;
    tags: boolean;
    summary: boolean;
    characters: boolean;
}

export type PublicCollection = {
    uid: string;
    reader: PublicUser;
    name: string;
    about: string | undefined;
    fandom: boolean;
    ship: boolean;
    warnings: boolean;
    tags: boolean;
    summary: boolean;
    characters: boolean;
}

export type Rec = {
    uid: string;
    title: string;
    words: number;
    author: string[];
    chapters: string;
    fandom: string[];
    rating: string;
    warnings: string[];
    ship: string[];
    characters: string[];
    tags: string[];
    summary: string | undefined;
    notes: string | undefined;
    link: string;
}

export type Bookmark = {
    bookmarks: string[];
}

type SavedCollection = {
    name: string;
    uid: string;
}

export type Saved = {
    collection: SavedCollection;
    rec: Rec;
    maker: string;
    uid: string;
    read: boolean;
}

export type FindQuery = {
    name: string;
    about: string;
    uid: string;
    maker: string;
    matching_recs: number;
}