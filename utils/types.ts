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
  avatar?: string | undefined;
  bio?: string | undefined;
  highlight?: string | undefined;
  collections: Array<UserCollection> | [];
}

export type PublicUser = {
    username: string;
    avatar?: string | undefined;
    bio?: string | undefined;
    highlight?: string | undefined;
}

export type Collection = {
    uid: string;
    name: string;
    about?: string | undefined;
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
    about?: string | undefined;
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
    author: Array<string>;
    chapters: string;
    fandom: Array<string>;
    rating: string;
    warnings: Array<string>;
    ship: Array<string> | void;
    characters: Array<string> | [];
    tags: Array<string> | [];
    summary: string | void;
    notes: string | void;
    link: string;
}

export type Bookmark = {
    bookmarks: string[] | [];
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
    uid: string;
    maker: string;
    matching_recs: number;
}