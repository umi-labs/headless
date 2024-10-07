import { Pages, Settings, Navigation, Blog, Forms, Inbox } from "./structures";

export const Desk = (S) =>
    S.list()
        .title('Content')
        .items([
            Settings(S),
            Navigation(S),
            Inbox(S),
            Forms(S),
            S.divider(),
            Pages(S),
            Blog(S),
            S.divider(),
        ]);