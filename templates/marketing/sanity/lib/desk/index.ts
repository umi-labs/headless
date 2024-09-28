import { Pages, Settings, Navigation, Blog, Forms, Media } from "./structures";

export const Desk = (S) =>
    S.list()
        .title('Content')
        .items([
            Settings(S),
            Navigation(S),
            Forms(S),
            S.divider(),
            Pages(S),
            Blog(S),
            S.divider(),
            /* Media(S), */
        ]);